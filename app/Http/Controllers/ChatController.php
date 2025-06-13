<?php
// app/Http/Controllers/ChatController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class ChatController extends Controller
{
    /**
     *  Handles the incoming prompt from the user, sends it to Gemini,
     *  and returns the response.
     */
    public function ask(Request $request)
    {
        // 1. Validate the incoming request to make sure we have a prompt.
        $request->validate([
            'prompt' => 'required|string|max:4000',
        ]);

        $apiKey = env('GEMINI_API_KEY');
        $prompt = $request->input('prompt');

        // 2. Make the API call to Google Gemini.
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={$apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => $prompt
                        ]
                    ]
                ]
            ]
        ]);

        // 3. Handle potential errors from the API call.
        if ($response->failed()) {
            // This sends back a generic error. Don't expose API-specific errors to the user.
            throw ValidationException::withMessages([
                'prompt' => 'Failed to get a response from the AI. Please try again later.',
            ]);
        }

        // 4. Extract the useful text from Gemini's complex response structure.
        $reply = $response->json('candidates.0.content.parts.0.text');

        // 5. Send the clean response back to the frontend as JSON.
        return response()->json([
            'reply' => $reply,
        ]);
    }
}
