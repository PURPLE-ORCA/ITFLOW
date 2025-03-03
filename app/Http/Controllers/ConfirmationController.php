<?php

namespace App\Http\Controllers;

use App\Models\Confirmation;
use App\Models\Task;
use App\Http\Requests\StoreConfirmationRequest;
use App\Http\Requests\UpdateConfirmationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ConfirmationController extends Controller
{
    public function create(Task $task)
    {
        // Verify user is assigned to the task
        if ($task->assigned_to !== auth::id()) {
            abort(403);
        }

        return inertia('Confirmations/Create', [
            'task' => $task->load('project'),
        ]);
    }

    public function store(Request $request, Task $task)
    {
        // Authorization check
        if ($task->assigned_to !== auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'description' => 'required|string|min:10',
            'file' => 'required|file|max:10240',
        ]);

        // Store file if present
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('confirmations', 'public');
        }

        // Create confirmation
        Confirmation::create([
            'task_id' => $task->id,
            'description' => $validated['description'],
            'file_path' => $filePath,
            'created_by' => auth::id(),
        ]);

        // Update task status
        $task->update(['status' => 'completed']);

        return redirect()->route('projects.phases', [
            'project' => $task->project_id,
            'phase' => $task->phase
        ])->with('success', 'Task completed successfully!');
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