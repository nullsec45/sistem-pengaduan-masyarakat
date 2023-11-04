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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("reporter_id")->unsigned();
            $table->bigInteger("category_id")->unsigned();
            $table->string("ticket_id", 255);
            $table->longText("description", 255);
            $table->string("status", 255);
            $table->timestamps();

            $table->foreign("reporter_id")->references("id")->on("reporters")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("category_id")->references("id")->on("categories")->onDelete("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
