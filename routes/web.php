<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ConfirmationController;
use App\Http\Controllers\DrawingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\ChatMessage; // Add this
use Illuminate\Support\Facades\Auth;
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
    Route::resource('projects.drawings', DrawingController::class)->shallow();
// Add this new route for auto-saving
Route::patch('/drawings/{drawing}/autosave', [DrawingController::class, 'autoSave'])->name('drawings.autosave');
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

    // Add this to your web.php routes file
Route::get('/confirmations/create/{task}', [ConfirmationController::class, 'create'])
->name('confirmations.create');
Route::post('/confirmations/{task}', [ConfirmationController::class, 'store'])
    ->name('confirmations.store');

    Route::post('/chat', [ChatController::class, 'ask'])
        ->middleware(['auth', 'verified'])
        ->name('chat.ask');

    Route::get('/chat', function () {
    $chatHistory = Auth::user()->chatMessages()->orderBy('created_at')->get();

    // Use flatMap to transform each DB row into one or two message objects
    $messages = $chatHistory->flatMap(function ($message) {
        $userMessage = null;
        $botMessage = null;

        // Create the user's message object
        if ($message->prompt || $message->file_path) {
            $userMessage = [
                'id' => 'user-' . $message->id,
                'sender' => 'user',
                'text' => $message->prompt,
                'file_path' => $message->file_path,
                'file_name' => $message->file_name,
                'mime_type' => $message->mime_type,
            ];
        }

        // Create the bot's reply object
        if ($message->reply) {
            $botMessage = [
                'id' => 'bot-' . $message->id,
                'sender' => 'bot',
                'text' => $message->reply,
                'file_path' => null, // Bots don't send files back in this setup
            ];
        }

        return array_filter([$userMessage, $botMessage]); // Return both, filtering out any nulls
    });

    return Inertia::render('Chat/Index', [
        'messages' => $messages,
    ]);
})->middleware(['auth', 'verified'])->name('chat.index');
});

require __DIR__.'/auth.php';
