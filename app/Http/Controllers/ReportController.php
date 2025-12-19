<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Report;

class ReportController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function index()
    {
        $reports = Report::with(['reporter', 'category'])->paginate(10);


        return Inertia::render('Dashboard/Reports/Index', ['reports' => $reports]);
    }
}
