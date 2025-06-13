<?php

namespace Database\Seeders;

use App\Models\Confirmation;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin mohammed',
            'email' => 'mohammed@itflow.com',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'name' => 'Admin kaoutar',
            'email' => 'kaoutar@itflow.com',
            'password' => Hash::make('password'),
        ]);

//         // Create demo users with various tech roles
//         $roles = [
//             'Full Stack Ninja', 'Bug Hunter', 'Code Wizard', 'DevOps Guru', 'UI Unicorn',
//             'Security Specialist', 'Data Whisperer', 'Cloud Architect', 'Product Owner', 'Scrum Master'
//         ];
    
//         foreach ($roles as $role) {
//             User::create([
//                 'name' => $role,
//                 'email' => strtolower(str_replace(' ', '', $role)) . '@itflow.com',
//                 'password' => Hash::make('password'),
//             ]);
//         }

//         // Create additional random users
//         User::factory(20)->create();

//         $users = User::all();

//         // Create various types of projects
//         $projectTypes = ['Web Development', 'Mobile App', 'Data Analysis', 'Machine Learning', 'Infrastructure'];
//         $projectNames = [
//             'Project X-Force: AI Integration',
//             'Quantum Code Refactor',
//             'Cloud Migration Odyssey',
//             'Mobile App Revolution',
//             'Security Fortress 2.0',
//             'DevOps Pipeline Overhaul',
//             'Legacy System Phoenix',
//             'API Gateway Universe',
//             'Data Lake Explorer',
//             'Microservices Maze'
//         ];

//         foreach ($projectNames as $name) {
//             $project = Project::create([
//                 'title' => $name,
//                 'description' => "Epic journey to transform {$name} into reality!",
//                 'owner_id' => $users->random()->id,
//                 'type' => $projectTypes[array_rand($projectTypes)],
//                 'deadline' => now()->addMonths(rand(1, 6)),
//                 'file_path' => 'public/storage/project_files/itflowspecs.pdf',
//                 'status' => rand(0, 1) ? 'Active' : 'Completed'
//             ]);

//             // Attach random team members with roles
//             $teamMembers = $users->random(rand(3, 6));
//             foreach ($teamMembers as $member) {
//                 $project->users()->attach($member->id, [
//                     'role' => ['manager', 'developer', 'designer', 'tester', 'analyst'][rand(0, 4)]
//                 ]);
//             }
//         }

// // Create additional random projects - split between user 1 and 2
// $totalAdditionalProjects = 20;
// $half = $totalAdditionalProjects / 2;

// Project::factory($half)->create(['owner_id' => 1])->each(function ($project) use ($users) {
//     $project->users()->attach(
//         $users->random(rand(3, 8))->pluck('id'),
//         ['role' => ['manager', 'developer', 'designer', 'tester', 'analyst'][rand(0, 4)]]
//     );
// });

// Project::factory($half)->create(['owner_id' => 2])->each(function ($project) use ($users) {
//     $project->users()->attach(
//         $users->random(rand(3, 8))->pluck('id'),
//         ['role' => ['manager', 'developer', 'designer', 'tester', 'analyst'][rand(0, 4)]]
//     );
// });

//         // Create tasks with various levels of complexity
//         $projects = Project::all();
//         $taskTemplates = [
//             'Setup' => ['Initialize repo', 'Configure CI/CD', 'Setup dev environment'],
//             'Frontend' => ['Design UI mockups', 'Implement responsive layout', 'Add accessibility features'],
//             'Backend' => ['Create API endpoints', 'Implement authentication', 'Setup database schema'],
//             'Testing' => ['Write unit tests', 'Perform integration tests', 'Security audit'],
//             'Deployment' => ['Deploy to staging', 'Optimize performance', 'Release to production']
//         ];

//         foreach ($projects as $project) {
//             foreach ($taskTemplates as $category => $tasks) {
//                 foreach ($tasks as $task) {
//                     Task::create([
//                         'project_id' => $project->id,
//                         'title' => "{$category}: {$task}",
//                         'description' => "Time to make magic happen with {$task}!",
//                         'status' => ['pending', 'completed'][rand(0, 1)],
//                         'phase' => ['design', 'analysis', 'development', 'testing', 'wrapping'][rand(0, 4)], 
//                         'assigned_to' => $users->random()->id,
//                         'created_by' => $project->owner_id,
//                         'due_date' => now()->addDays(rand(5, 30))
//                     ]);
//                 }
//             }
//         }

//         // Create confirmations with randomized messages
//         $completedTasks = Task::where('status', 'completed')->get();
//         $confirmationMessages = [
//             "🎯 Nailed it! Task completed with flying colors!",
//             "✨ Done and dusted - ready for review!",
//             "🚀 Mission accomplished - check it out!",
//             "💪 Another one bites the dust - task completed!",
//             "🎉 Finished with extra sparkle!",
//             "🔥 Crushed it! Onto the next one!",
//             "🚧 Task done - keep the momentum going!"
//         ];

//         foreach ($completedTasks as $task) {
//             Confirmation::create([
//                 'task_id' => $task->id,
//                 'description' => $confirmationMessages[rand(0, count($confirmationMessages) - 1)],
//                 'file_path' => 'confirmations/completion-' . rand(1000, 9999) . '.pdf',
//                 'created_by' => $task->assigned_to
//             ]);
//         }
    }
}