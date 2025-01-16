<?php

namespace App\Http\Controllers;

use App\Models\Confirmation;
use App\Models\Task;
use App\Http\Requests\StoreConfirmationRequest;
use App\Http\Requests\UpdateConfirmationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ConfirmationController extends Controller
{
    public function store(StoreConfirmationRequest $request)
    {
        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('confirmations');
        }

        $validated['created_by'] = Auth::id();

        $confirmation = Confirmation::create($validated);

        // Optionally, update the task status to completed
        $task = Task::find($validated['task_id']);
        $task->update(['status' => 'completed']);

        return redirect()->back()->with('success', 'Task confirmed successfully!');
    }

    public function update(UpdateConfirmationRequest $request, Confirmation $confirmation)
    {
        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($confirmation->file_path) {
                Storage::delete($confirmation->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('confirmations');
        }

        $confirmation->update($validated);

        return redirect()->back()->with('success', 'Confirmation updated successfully!');
    }
}