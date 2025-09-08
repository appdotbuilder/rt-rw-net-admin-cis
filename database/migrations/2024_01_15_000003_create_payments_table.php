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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 10, 2)->comment('Payment amount');
            $table->date('payment_date')->comment('Date of payment');
            $table->date('period_month')->comment('Month period for payment (YYYY-MM-01)');
            $table->enum('payment_method', ['cash', 'transfer', 'other'])->default('cash')->comment('Payment method');
            $table->text('notes')->nullable()->comment('Payment notes');
            $table->timestamps();
            
            $table->index(['client_id', 'period_month']);
            $table->index('payment_date');
            $table->index('period_month');
            $table->unique(['client_id', 'period_month']); // One payment per client per month
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};