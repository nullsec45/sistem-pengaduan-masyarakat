<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Reporter;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reporter_id' => Reporter::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'ticket_id' => 'TICKET-' . strtoupper(Str::random(8)),
            'description' => fake()->paragraph(3),
            'status' => fake()->randomElement(['Pending', 'Proses Administratif', 'Proses Penanganan', 'Selesai Ditangani', 'Laporan Ditolak']),
        ];
    }
}
