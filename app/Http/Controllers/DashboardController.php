<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Fetch active projects where the user is associated (via the project_user pivot table)
        $currentProjects = Project::whereHas('users', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->where('status', 'Active')
        ->with(['tasks' => function ($query) {
            $query->latest()->limit(4);
        }])
        ->limit(5)
        ->get();

        // Fetch tasks assigned to the user
        $tasksByStatus = Task::where('assigned_to', $user->id)
            ->selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get();

        // Fetch upcoming deadlines for tasks assigned to the user
        $upcomingDeadlines = Task::where('assigned_to', $user->id)
            ->where('due_date', '>', now())
            ->where('due_date', '<', now()->addDays(7))
            ->with('project')
            ->get();

        return Inertia::render('Dashboard', [
            'currentProjects' => $currentProjects,
            'tasksByStatus' => $tasksByStatus,
            'upcomingDeadlines' => $upcomingDeadlines,
        ]);
    }
}