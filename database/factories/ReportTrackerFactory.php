<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\{Report, User};

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReportTracker>
 */
class ReportTrackerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'note' => fake()->paragraph(5),
        ];
    }
}
