<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Reporter, Report, ReportTracker};

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reporters = Reporter::all();

        foreach ($reporters as $reporter) {
            $report = Report::factory()->create([
                'reporter_id' => $reporter->id,
            ]);

            ReportTracker::factory()->create([
                'report_id' => $report->id,
                'status'    => $report->status
            ]);
        }
    }
}
