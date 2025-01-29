<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

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

    // app/Http/Controllers/ProjectController.php
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
        $project->load(['owner', 'users', 'tasks']);

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
    
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'sometimes|in:Active,Completed',
            'file_path' => 'nullable|file|max:10240', // Allow file uploads (max 10MB)
        ]);
    
        // Update the project
        $project->update($validated);
    
        // Handle file upload
        if ($request->hasFile('file')) {
            $project->update([
                'file_path' => $request->file('file')->store('project_files'), // Store the file
            ]);
        }
    
        return redirect()->back()
            ->with('success', 'Project updated successfully!');
    }
}