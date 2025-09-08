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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Client full name');
            $table->text('address')->comment('Client address');
            $table->string('phone')->comment('Client phone number');
            $table->foreignId('internet_package_id')->constrained();
            $table->date('installation_date')->comment('Date of internet installation');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Client status');
            $table->text('notes')->nullable()->comment('Additional notes about client');
            $table->timestamps();
            
            $table->index('name');
            $table->index('status');
            $table->index('installation_date');
            $table->index(['status', 'installation_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};