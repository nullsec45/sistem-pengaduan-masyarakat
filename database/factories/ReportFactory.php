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
        $category = Category::inRandomOrder()->first();
        $prefix = $category ? strtoupper(substr($category->name, 0, 3)) : 'GEN';

        return [
            'category_id' => Category::inRandomOrder()->first()->id,
            'ticket_id' =>   $prefix . '-' . strtoupper(Str::random(8)),
            'title'       => fake()->sentence(),
            'description' => fake()->paragraph(3),
            'status' => fake()->randomElement(['Pending', 'Proses Administratif', 'Proses Penanganan', 'Selesai Ditangani', 'Laporan Ditolak']),
        ];
    }
}
