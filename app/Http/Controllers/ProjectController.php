<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::whereHas('users', function ($query) {
            $query->where('user_id', Auth::id());
        });
    
        // Search by title
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
    
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
    
        $projects = $query->with('owner')->paginate(10);
    
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    // ProjectController.php
    public function showPhase(Project $project, $phase)
    {    
        // Validate the phase
        $validPhases = ['analysis', 'design', 'development', 'testing', 'wrapping'];
        if (!in_array($phase, $validPhases)) {
            abort(404, 'Phase not found');
        }
    
        // Convert phase to PascalCase for Inertia page resolution
        $pageName = Str::studly($phase); // Converts 'analysis' to 'Analysis'
    
        // Fetch tasks for the given phase
        $tasks = $project->tasks()
        ->where('phase', $phase)
        ->with(['assignedUser' , 'confirmation', 'confirmation.createdByUser'])
        ->get();

        // Separate pending and finished tasks
        $pendingTasks = $tasks->where('status', 'pending')->values()->all(); // Convert to array
        $finishedTasks = $tasks->where('status', 'completed')->values()->all(); // Convert to array
            
        return Inertia::render("Phases/{$pageName}", [
            'project' => $project->load('users'),
            'pendingTasks' => $pendingTasks,
            'finishedTasks' => $finishedTasks,
        ]);
    }
    
    public function addUserForm(Project $project)
    {
        Gate::authorize('update', $project); // Ensure only the Project Manager can access

        return Inertia::render('Projects/AddUserForm', [
            'project' => $project,
        ]);
    }

    public function addUser(Request $request, Project $project)
    {
        Gate::authorize('update', $project);
    
        $validated = $request->validate([
            'email' => 'required|exists:users,email', // Validate that the email exists in the users table
            'role' => 'required|in:manager,developer,designer,tester,analyst',
        ]);
    
        // Find the user by email
        $user = User::where('email', $validated['email'])->first();
    
        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'User not found.']);
        }
    
        $project->users()->attach($user->id, ['role' => $validated['role']]);
    
        return redirect()->route('projects.show', $project)
            ->with('success', 'User added to project successfully!');
    }

    public function removeUser(Project $project, User $user)
    {
        Gate::authorize('update', $project);

        // Detach the user from the project
        $project->users()->detach($user->id);

        return redirect()->route('projects.show', $project)
            ->with('success', 'User removed from project successfully!');
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string',
            'deadline' => 'nullable|date',
            'file' => 'nullable|file|max:10240', // Allow file uploads (max 10MB)
        ]);
    
        // Create the project
        $project = Project::create([
            ...$validated,
            'owner_id' => Auth::id(),
            'status' => 'Active',
        ]);
    
        // Handle file upload
        if ($request->hasFile('file')) {
            $project->update([
                'file_path' => $request->file('file')->store('project_files', 'public'), // Store the file
            ]);
        }
    
        // Attach the authenticated user as a manager
        $project->users()->attach(Auth::id(), ['role' => 'manager']);
    
        return redirect()->route('projects.show', $project)
            ->with('success', 'Project created successfully!');
    }

    public function show(Project $project)
    {
        // Authorize the user to view the project
        Gate::authorize('view', $project);

        // Load the project with its owner, users, and tasks
        $project->load(['owner', 'users', 'tasks.assignedUser']);

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'phases' => [
                'analysis',
                'design',
                'development',
                'testing',
                'wrapping',
            ],
        ]);
    }

    public function showFile(Project $project)
    {
        // Ensure the user is authorized to view the file
        Gate::authorize('view', $project);

        // Get the file path
        $filePath = storage_path('app/public/' . $project->file_path);

        // Check if the file exists
        if (!file_exists($filePath)) {
            abort(404);
        }

        // Return the file as a response
        return response()->file($filePath);
    }
    
    public function edit(Project $project)
    {
        // Authorize the user to update the project
        Gate::authorize('update', $project);

        // Load the project with its owner and users
        $project->load(['owner', 'users']);

        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        Gate::authorize('update', $project);
    
        // Validate the incoming request
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'sometimes|in:Active,Completed',
            'file' => 'nullable|file|max:10240', // Allow file uploads (max 10MB)
        ]);
    
        // Update the project attributes
        $project->update($validated);
    
        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete the old file if it exists
            if ($project->file_path) {
                $oldFilePath = storage_path('app/public/' . $project->file_path);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath); // Delete the old file
                }
            }
    
            // Store the new file and update the file_path
            $newFilePath = $request->file('file')->store('project_files', 'public');
            $project->update(['file_path' => $newFilePath]);
        }
    
        return redirect()->route('projects.show', $project)
            ->with('success', 'Project updated successfully!');
    }
    public function destroy(Project $project)
    {
        Gate::authorize('update', $project); // Only the project manager can delete

        // Delete the associated file if it exists
        if ($project->file_path) {
            $filePath = storage_path('app/public/' . $project->file_path);
            if (file_exists($filePath)) {
                unlink($filePath); // Delete the file from storage
            }
        }

        // Delete the project
        $project->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Project deleted successfully!');
    }
}