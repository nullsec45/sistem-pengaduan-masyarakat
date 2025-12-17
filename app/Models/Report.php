<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    use HasFactory;


    public function reporter(): BelongsTo
    {
        return $this->belongsTo(Reporter::class, 'reporter_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function tracker(): BelongsTo
    {
        return $this->belongsTo(ReportTracker::class, 'category_id', 'id');
    }
}
