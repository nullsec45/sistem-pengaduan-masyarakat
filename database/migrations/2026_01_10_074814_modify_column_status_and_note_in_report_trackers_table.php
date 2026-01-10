<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('report_trackers', function (Blueprint $table) {
            $table->enum("status", ['Pending', 'Proses Administratif', 'Proses Penanganan', 'Selesai Ditangani', 'Laporan Ditolak'])->change();
            $table->text("note")->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('report_trackers', function (Blueprint $table) {
            $table->string("status", 255)->change();
            $table->text("note", 255)->change();
        });
    }
};