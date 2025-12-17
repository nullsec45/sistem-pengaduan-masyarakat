<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reporter;
use App\Models\Report;


class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reporters = Reporter::all();

        foreach ($reporters as $reporter) {
            Report::factory(rand(1, 3))->create([
                'reporter_id' => $reporter->id,
            ]);
        }
    }
}
