<?php
namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Project $project)
    {
        Gate::authorize('view', $project);
        
        return Inertia::render('Tasks/Index', [
            'project' => $project->load('owner'),
            'tasks' => $project->tasks()
                ->with(['assignedUser', 'creator'])
                ->get()
                ->groupBy('status')
        ]);
    }

    public function store(Request $request, Project $project)
    {
        Gate::authorize('update', $project);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'required|exists:users,id',
            'due_date' => 'nullable|date'
        ]);

        $project->tasks()->create([
            ...$validated,
            'status' => 'pending',
            'created_by' => Auth::id()
        ]);

        return redirect()->back()
            ->with('success', 'Task created successfully!');
    }

    public function update(Request $request, Task $task)
    {
        Gate::authorize('update', $task->project);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:pending,in_progress,completed',
            'assigned_to' => 'sometimes|exists:users,id',
            'due_date' => 'nullable|date'
        ]);

        $task->update($validated);

        return redirect()->back()
            ->with('success', 'Task updated successfully!');
    }
}