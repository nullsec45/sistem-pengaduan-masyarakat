<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Report extends Model
{
    use HasFactory;



    protected $fillable = [
        'reporter_id',
        'title',
        'description',
        'category_id',
        'ticket_id',
    ];

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(Reporter::class, 'reporter_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function tracker(): HasOne
    {
        return $this->hasOne(ReportTracker::class);
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'model');
    }

    public static function boot()
    {
        parent::boot();

        static::saved(function ($model) {
            // $model->status = 'Pending';
            ReportTracker::firstOrCreate(
                [
                    'report_id' => $model->id,
                    'user_id' => Auth::user()->id,
                ],
                ['status' => 'Pending']
            );
        });

        static::deleting(function ($report) {
            DB::transaction(function () use ($report) {
                // Hapus media terkait (morphMany)
                $report->media()->delete();

                // Hapus tracker terkait (hasOne)
                $report->tracker()->delete();
            });
        });
    }
}
