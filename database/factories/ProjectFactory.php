<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $projectTypes = ['Web Development', 'Mobile App', 'Data Analysis', 'Machine Learning', 'Infrastructure'];

        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'owner_id' => User::factory(),  // Generates a new user for each project
            'type' => $projectTypes[array_rand($projectTypes)],
            'deadline' => now()->addMonths(rand(1, 6)),
            'file_path' => fake()->paragraph(),
            'status' => fake()->randomElement(['Active', 'Completed']),
        ];
    }
}