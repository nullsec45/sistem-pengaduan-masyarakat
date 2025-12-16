<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reporter>
 */
class ReporterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone_number' => fake()->phoneNumber(),
            'identity_type' => fake()->randomElement(['KTP', 'SIM', 'Passport']),
            'pob' => fake()->city(), // Place of Birth
            'dob' => fake()->date('Y-m-d', '2005-01-01'), // Date of Birth (max tahun 2005 agar dewasa)
            'address' => fake()->address(),
        ];
    }
}
