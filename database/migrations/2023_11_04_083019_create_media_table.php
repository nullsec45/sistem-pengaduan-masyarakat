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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string("model_type", 255);
            $table->bigInteger("model_id")->unsigned();
            $table->uuid("uuid");
            $table->string("collection_name", 255);
            $table->string("file_name", 255);
            $table->string("mime_type", 255);
            $table->string("disk", 255);
            $table->string("conversions_disk", 255);
            $table->bigInteger("size");
            $table->longText("manupilations");
            $table->longText("custom_properties");
            $table->longText("generated_conversions");
            $table->longText("responsive_images");
            $table->integer("order_column");
            $table->timestamps();

            $table->foreign("model_id")->references("id")->on("reports")->onDelete("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
