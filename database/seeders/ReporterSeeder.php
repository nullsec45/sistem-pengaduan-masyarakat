<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reporter;

class ReporterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reporters = Reporter::all();

        if ($reporters->isEmpty()) {
            Reporter::factory(20)->create();
        }
    }
}
