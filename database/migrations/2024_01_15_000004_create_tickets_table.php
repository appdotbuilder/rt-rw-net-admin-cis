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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('title')->comment('Ticket title/subject');
            $table->text('description')->comment('Ticket description');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium')->comment('Ticket priority');
            $table->enum('status', ['open', 'in_progress', 'resolved', 'closed'])->default('open')->comment('Ticket status');
            $table->text('resolution')->nullable()->comment('Ticket resolution details');
            $table->timestamp('resolved_at')->nullable()->comment('When ticket was resolved');
            $table->timestamps();
            
            $table->index(['client_id', 'status']);
            $table->index('status');
            $table->index('priority');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};