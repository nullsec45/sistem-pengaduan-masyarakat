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
        Schema::create('activity_log', function (Blueprint $table) {
            $table->id();
            $table->string("log_name", 255);
            $table->text("description");
            $table->string("subject_type", 255);
            $table->bigInteger("subject_id")->unsigned();
            $table->string("causer_type", 255);
            $table->bigInteger("causer_id")->unsigned();
            $table->longText("properties");
            $table->timestamps();

            $table->foreign("subject_id")->references("id")->on("reports")->reports("cascade")->onUpdate("cascade");
            $table->foreign("causer_id")->references("id")->on("users")->users("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_log_');
    }
};
