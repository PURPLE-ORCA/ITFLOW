<?php

use App\Http\Controllers\ConfirmationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/projects/{project}/file', [ProjectController::class, 'showFile'])->name('project.file');

    // Projects
    Route::resource('projects', ProjectController::class);
    Route::post('/projects/{project}/users', [ProjectController::class, 'addUser'])->name('projects.addUser');
    Route::delete('/projects/{project}/users/{user}', [ProjectController::class, 'removeUser'])->name('projects.removeUser');
   
    Route::get('/projects/{project}', [ProjectController::class, 'show'])
    ->name('projects.show');
    // Tasks (nested under projects)
    Route::get('/projects/{project}/tasks', [TaskController::class, 'index'])->name('projects.tasks.index');
    Route::post('/projects/{project}/tasks', [TaskController::class, 'store'])->name('projects.tasks.store');
    Route::get('/projects/{project}/tasks/create', [TaskController::class, 'create'])->name('projects.tasks.create');
    Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])
    ->name('tasks.edit');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])
    ->name('tasks.destroy');

    // Confirmations
    Route::post('/confirmations', [ConfirmationController::class, 'store'])->name('confirmations.store');
    Route::put('/confirmations/{confirmation}', [ConfirmationController::class, 'update'])->name('confirmations.update');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/projects/{project}/users/add', [ProjectController::class, 'addUserForm'])
        ->name('projects.addUserForm');

    // Handle adding a team member
    Route::post('/projects/{project}/users', [ProjectController::class, 'addUser'])
        ->name('projects.addUser');
        
        Route::delete('/projects/{project}/users/{user}', [ProjectController::class, 'removeUser'])
    ->name('projects.removeUser');

    Route::prefix('projects/{project}')->group(function () {
        Route::get('/{phase}', [ProjectController::class, 'showPhase'])
            ->where('phase', 'analysis|design|development|testing|wrapping') // Limit to valid phases
            ->name('projects.phases');
    });
});

require __DIR__.'/auth.php'; 