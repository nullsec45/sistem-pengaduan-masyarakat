<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;

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
}
