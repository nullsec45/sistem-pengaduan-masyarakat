<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ReportRequest;

class ReportController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function index()
    {
        $user = Auth::user();


        $reports = Report::with(['reporter', 'category']);

        if ($user->role == 'USER') {
            $reports->whereHas('reporter', function ($q) use ($user) {
                $q->where('email', $user->email);
            });
        }

        $reports = $reports->paginate(10);


        return Inertia::render('Dashboard/Reports/Index', ['reports' => $reports]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Dashboard/Reports/CreateReport', ['categories' => $categories]);
    }

    public function show(String $id)
    {
        $report = Report::find($id);

        $report->load('tracker');

        return Inertia::render('Dashboard/Reports/Show', ['report' => $report]);
    }

    public function store(ReportRequest $request)
    {
        dd($request->all());
        $categories = Category::all();

        return Inertia::render('Dashboard/Reports/CreateReport', ['categories' => $categories]);
    }
}
