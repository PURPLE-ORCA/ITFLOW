<?php

namespace App\Http\Controllers;

use App\Models\Drawing;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateDrawingRequest;

class DrawingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        $this->authorize('view', $project); // Authorize based on project access

        $drawings = $project->drawings()->latest()->get();

        return Inertia::render('Drawings/Index', [
            'project' => $project,
            'drawings' => $drawings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDrawingRequest $request, Drawing $drawing)
    {
        $this->authorize('update', $drawing->project);

        $validated = $request->validated();

        $drawing->update($validated);

        return redirect()->route('projects.drawings.show', [$drawing->project, $drawing])
            ->with('success', 'Drawing updated successfully.');
    }

    /**
     *  A dedicated method for auto-saving Excalidraw data.
     */
    public function autoSave(Request $request, Drawing $drawing)
    {
        // Authorize that the user can update the project this drawing belongs to
        $this->authorize('update', $drawing->project);

        // Only validate the data field. Nothing else matters here.
        $validated = $request->validate([
            'data' => 'required|array', // We expect the raw array/object from the frontend
        ]);

        // Update only the data column.
        $drawing->update(['data' => $validated['data']]);

        // Return a simple success response. No need to redirect.
        return response()->json(['message' => 'Drawing auto-saved successfully.']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Project $project)
    {
        $this->authorize('update', $project); // Assuming only project members can create drawings

        return Inertia::render('Drawings/Create', [ // You'll need to create this page
            'project' => $project,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'data' => 'nullable|json',
        ]);

        $drawing = $project->drawings()->create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'data' => $validated['data'] ?? null,
        ]);

        return redirect()->route('drawings.show', $drawing->id)
                         ->with('success', 'Drawing created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Drawing $drawing)
    {
        $this->authorize('view', $drawing->project); // Authorize based on project access

        return Inertia::render('Drawings/Show', [
            'project' => $drawing->project,
            'drawing' => $drawing,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Drawing $drawing)
    {
        $this->authorize('update', $drawing->project);

        return Inertia::render('Drawings/Edit', [ // You'll need to create this page
            'project' => $drawing->project,
            'drawing' => $drawing,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Drawing $drawing)
    {
        $this->authorize('delete', $drawing->project);

        $drawing->delete();

        return redirect()->route('projects.drawings.index', $drawing->project_id)
                         ->with('success', 'Drawing deleted successfully.');
    }
}
