<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Report;


class HomeController extends Controller
{
    public function index()
    {

        $reports = Report::with(['reporter', 'category', 'tracker'])->paginate(10);


        return Inertia::render('Home/Index', ['reports' => $reports, 'home' => true]);
    }

    public function tracker(string $id)
    {
        $report = Report::with('tracker')->findOrFail($id);

        return Inertia::render('Home/StatusReportTracker', ['report' => $report]);
    }
}
