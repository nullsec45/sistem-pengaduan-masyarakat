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
        Schema::create('report_trackers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("user_id")->unsigned();
            $table->bigInteger("report_id")->unsigned();
            $table->string("status", 255);
            $table->text("note", 255);
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")->users("cascade")->onUpdate("cascade");
            $table->foreign("report_id")->references("id")->on("reports")->reports("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_trackers');
    }
};
