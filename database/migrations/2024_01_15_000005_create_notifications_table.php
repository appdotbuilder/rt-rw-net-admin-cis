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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('title')->comment('Notification title');
            $table->text('message')->comment('Notification message');
            $table->enum('type', ['payment_due', 'payment_overdue', 'installation_reminder', 'general'])->comment('Notification type');
            $table->boolean('is_read')->default(false)->comment('Whether notification is read');
            $table->date('due_date')->nullable()->comment('Related due date for payment notifications');
            $table->timestamps();
            
            $table->index(['client_id', 'is_read']);
            $table->index('type');
            $table->index('is_read');
            $table->index('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};