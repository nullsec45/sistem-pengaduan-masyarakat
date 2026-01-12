<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Reporter;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ReportRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class ReportController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function index()
    {
        $user = Auth::user();


        $reports = Report::with(['reporter', 'category', 'tracker']);

        if ($user->role == 'USER') {
            $reports->whereHas('reporter', function ($q) use ($user) {
                $q->where('email', $user->email);
            });
        }

        $reports = $reports->paginate(10);


        return Inertia::render('Dashboard/Reports/Index', ['reports' => $reports, 'home' => false]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Dashboard/Reports/CreateReport', ['categories' => $categories]);
    }

    public function show(String $id)
    {
        $report = Report::find($id);

        $report->load(['tracker', 'category', 'reporter', 'media']);

        return Inertia::render('Dashboard/Reports/Show', ['report' => $report]);
    }

    public function store(ReportRequest $request)
    {
        DB::beginTransaction();
        $path = 'uploads/reports';
        $fileName = null;

        try {
            // dd($request->all());
            $reporter = Reporter::updateOrCreate(
                [
                    'email' => Auth::user()->email,
                ],
                [
                    'name' =>  Auth::user()->name,
                    'email' => Auth::user()->email,
                    'phone_number' => Auth::user()->phone_number,
                    'identity_type' => $request->identity_type,
                    'identity_number' => $request->identity_number,
                    'pob' => $request->pob,
                    'dob' => $request->dob,
                    'address' => $request->address,
                ]
            );

            $category = Category::findOrFail($request->category_id);
            $prefix = strtoupper(substr($category->name, 0, 3));

            $dateCode = now()->format('Ymd');
            $todaysCount = Report::where('category_id', $category->id)
                ->whereDate('created_at', now())
                ->lockForUpdate()
                ->count();

            $sequence = str_pad($todaysCount + 1, 4, '0', STR_PAD_LEFT);

            $ticketId = "{$prefix}-{$dateCode}-{$sequence}";

            $data = $request->validated();
            $data['reporter_id'] = $reporter->id;
            $data['ticket_id'] = $ticketId;
            $report = Report::create($data);

            if ($request->hasFile('evidence')) {
                $file = $request->file('evidence');

                $fileName = $this->helper->fileUploadHandling($file, 'RPT', $path, 'create');


                Media::create([
                    'model_type' => Report::class,
                    'model_id' => $report->id,
                    'uuid' => Str::uuid(),
                    'collection_name' => 'report_evidence',
                    'path' => $path,
                    'file_name' => $fileName,
                    'mime_type' => $file->getClientMimeType(),
                    'disk' => 'public',
                    'size' => $file->getSize(),
                    'manipulations' => '',
                    'custom_properties' => '',
                    'generated_conversions' => '',
                    'responsive_images' => '',
                    'order_column' => 1,
                    'conversions_disk' => 'public',
                ]);
            }

            DB::commit();
        } catch (\Throwable $err) {
            DB::rollBack();

            $this->helper->fileDeleteHandling($path, $fileName);
            return back()
                ->withInput()
                ->withErrors([
                    'error' =>   $err->getMessage()
                ]);
        }



        return redirect()->route('dashboard.reports.index')->with('success', 'Laporan berhasil dibuat.');
    }

    public function edit(String $id)
    {
        $report = Report::find($id);

        $categories = Category::all();

        $report->load(['tracker', 'category', 'reporter', 'media']);

        return Inertia::render('Dashboard/Reports/EditReport', ['categories' => $categories, 'report' => $report]);
    }

    public function update(ReportRequest $request, String $id)
    {
        DB::beginTransaction();
        $path = 'uploads/reports';
        $fileName = null;

        try {
            $reporter = Reporter::updateOrCreate(
                [
                    'email' => Auth::user()->email,
                ],
                [
                    'name' =>  Auth::user()->name,
                    'email' => Auth::user()->email,
                    'phone_number' => Auth::user()->phone_number,
                    'identity_type' => $request->identity_type,
                    'identity_number' => $request->identity_number,
                    'pob' => $request->pob,
                    'dob' => $request->dob,
                    'address' => $request->address,
                ]
            );

            $category = Category::findOrFail($request->category_id);
            $prefix = strtoupper(substr($category->name, 0, 3));

            $dateCode = now()->format('Ymd');
            $todaysCount = Report::where('category_id', $category->id)
                ->whereDate('created_at', now())
                ->lockForUpdate()
                ->count();

            $sequence = str_pad($todaysCount + 1, 4, '0', STR_PAD_LEFT);

            $ticketId = "{$prefix}-{$dateCode}-{$sequence}";

            $data = $request->validated();
            $data['reporter_id'] = $reporter->id;
            $data['ticket_id'] = $ticketId;
            // Report::where('id', $id)->update($data);
            $report = Report::find($id);
            $report->update($data);

            if ($request->hasFile('evidence')) {
                $file = $request->file('evidence');

                $fileName = $this->helper->fileUploadHandling($file, 'RPT', $path, 'update', $report->media->first()?->file_name);


                Media::updateOrCreate(
                    [
                        'model_type' => Report::class,
                        'model_id' => $report->id,
                    ],
                    [
                        'model_type' => Report::class,
                        'model_id' => $report->id,
                        'uuid' => Str::uuid(),
                        'collection_name' => 'report_evidence',
                        'path' => $path,
                        'file_name' => $fileName,
                        'mime_type' => $file->getClientMimeType(),
                        'disk' => 'public',
                        'size' => $file->getSize(),
                        'manipulations' => '',
                        'custom_properties' => '',
                        'generated_conversions' => '',
                        'responsive_images' => '',
                        'order_column' => 1,
                        'conversions_disk' => 'public',
                    ]
                );
            }

            DB::commit();
        } catch (\Throwable $err) {
            DB::rollBack();

            $this->helper->fileDeleteHandling($path, $fileName);
            return back()
                ->withInput()
                ->withErrors([
                    'error' =>   $err->getMessage()
                ]);
        }



        return redirect()->route('dashboard.reports.index')->with('success', 'Laporan berhasil diubah.');
    }

    public function updateStatus(ReportRequest $request, String $id)
    {
        try {
            $report = Report::findOrFail($id);
            $report->tracker->status = $request->status;
            $report->tracker->note = $request->note;
            $report->tracker->save();

            return redirect()->route('dashboard.reports.index')->with('success', 'Laporan berhasil diverifikasi.');
        } catch (\Throwable $err) {

            return back()
                ->withInput()
                ->withErrors([
                    'error' =>   $err->getMessage()
                ]);
        }


        return redirect()->route('dashboard.reports.index')->with('success', 'Status laporan berhasil diperbarui.');
    }
}
