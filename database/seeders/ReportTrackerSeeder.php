<?php

namespace Database\Seeders;

use App\Models\ReportTracker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportTrackerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReportTracker::factory(20)->create();
    }
}
