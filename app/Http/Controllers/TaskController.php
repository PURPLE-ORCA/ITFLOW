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
        
        // Load tasks with their confirmations, assigned user, and creator
        $tasks = $project->tasks()
            ->with(['assignedUser', 'creator', 'confirmations.creator']) // Load confirmations and their creators
            ->get()
            ->groupBy('status'); // Group tasks by status

        return Inertia::render('Tasks/Index', [
            'project' => $project->load('owner'),
            'tasks' => $tasks,
        ]);
    }

    public function create(Project $project)
    {
        Gate::authorize('update', $project);
    
        // Load the project with its users
        $project->load('users');
    
        return Inertia::render('Tasks/Create', [
            'project' => $project,
            'users' => $project->users, 
        ]);
    }
    public function store(Request $request, Project $project)
    {
        Gate::authorize('update', $project);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assigned_to' => 'required|exists:users,id',
            'phase' => 'required|in:analysis,design,development,testing,wrapping', 
            'due_date' => 'nullable|date'
        ]);

        $project->tasks()->create([
            ...$validated,
            'status' => 'pending',
            'created_by' => Auth::id()
        ]);

        return redirect()->route('projects.show', $project)
            ->with('success', 'Task created successfully!');
    }
    public function edit(Task $task)
    {
        Gate::authorize('update', $task->project);

        // Load the task with its assigned user and project users
        $task->load('assignedUser');
        $task->project->load('users');

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'users' => $task->project->users, // Pass the list of users to the frontend
        ]);
    }

    public function update(Request $request, Task $task)
    {
        Gate::authorize('update', $task->project);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:pending,in_progress,completed',
            'phase' => 'sometimes|in:analysis,design,development,testing,wrapping',
            'assigned_to' => 'sometimes|exists:users,id',
            'due_date' => 'nullable|date'
        ]);

        $task->update($validated);

        return redirect()->route('projects.show', $task->project)
            ->with('success', 'Task updated successfully!');
    }
    public function destroy(Task $task)
    {
        Gate::authorize('update', $task->project);

        // Delete the task
        $task->delete();

        return redirect()->route('projects.show', $task->project)
            ->with('success', 'Task deleted successfully!');
    }
}