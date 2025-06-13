<?php
// app/Http/Controllers/ChatController.php

namespace App\Http\Controllers;

use App\Models\ChatMessage; // <-- Add this
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // For debugging
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth; // Add this line

class ChatController extends Controller
{
public function ask(Request $request)
{
    $request->validate([
        'prompt' => 'nullable|string|max:4000',
        'attachment' => 'nullable|file|max:10240', // 10MB max
    ]);

    $promptText = $request->input('prompt', '');
    $filePath = null;
    $fileName = null;
    $mimeType = null;
    $finalPromptForAI = $promptText; // Start with the user's prompt

    if ($request->hasFile('attachment')) {
        $file = $request->file('attachment');
        $filePath = $file->store('chat_attachments', 'public');
        $fileName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType();

        // Check if it's a PDF and try to extract text
        if ($mimeType === 'application/pdf') {
            try {
                $parser = new \Smalot\PdfParser\Parser();
                $pdf = $parser->parseFile($file->getRealPath());
                $extractedText = $pdf->getText();

                // Prepend the extracted text to the user's prompt for context
                $finalPromptForAI = "Analyze the following document content and then answer the user's question.\n\n--- DOCUMENT CONTENT ---\n" . $extractedText . "\n\n--- USER'S QUESTION ---\n" . $promptText;

            } catch (\Exception $e) {
                Log::error('PDF Parsing Error: ' . $e->getMessage());
                // If parsing fails, just let the AI know.
                $finalPromptForAI = "The user tried to upload a PDF named '{$fileName}', but I could not read it. Please inform the user about the failure and ask for the text to be pasted manually. The user's original question was: '{$promptText}'";
            }
        }
        // You could add more `elseif` blocks here for .docx, .txt etc.
    }

    $textPart = ['text' => $finalPromptForAI];
    $geminiPayloadContents = [['parts' => [$textPart]]];
    
    // This part is now ONLY for sending IMAGES, not other files
    if ($request->hasFile('attachment') && str_starts_with($mimeType, 'image/')) {
        $imagePart = [
            'inline_data' => [
                'mime_type' => $mimeType,
                'data' => base64_encode(file_get_contents($file->path()))
            ]
        ];
        // Combine text prompt and image data
        $geminiPayloadContents = [['parts' => [$textPart, $imagePart]]];
    }

    $apiKey = env('GEMINI_API_KEY');
    $model = 'gemini-1.5-flash-latest';
    
    $response = Http::withHeaders(['Content-Type' => 'application/json'])
        ->post("https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}", [
            'contents' => $geminiPayloadContents
        ]);

    if ($response->failed() || empty($response->json('candidates.0.content.parts.0.text'))) {
        Log::error('Gemini API Error or Empty Response: ' . $response->body());
        $replyText = 'I could not process that request. The API might be down or the content was blocked.';
    } else {
        $replyText = $response->json('candidates.0.content.parts.0.text');
    }

    ChatMessage::create([
        'user_id' => Auth::id(), // Save the ORIGINAL user prompt
        'prompt' => $promptText,
        'reply' => $replyText,
        'file_path' => $filePath,
        'file_name' => $fileName,
        'mime_type' => $mimeType,
    ]);

    return redirect()->back();
}

    // You'll also need a method to fetch conversation history in your page controller
}
