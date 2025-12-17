<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Report;


class HomeController extends Controller
{
    public function index()
    {
        $reports = Report::with(['reporter', 'category'])->paginate(10);


        return Inertia::render('Home/Home', ['reports' => $reports]);
    }

    public function tracker(string $id)
    {
        $report = Report::find($id)->with('tracker');

        return Inertia::render('Home/Tracker', ['report' => $report]);
    }
}
