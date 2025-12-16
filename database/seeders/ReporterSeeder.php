<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Report;
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
            $reporters = Reporter::factory(10)->create();
        }

        foreach ($reporters as $reporter) {
            Report::factory(rand(1, 3))->create([
                'reporter_id' => $reporter->id,
            ]);
        }
    }
}
