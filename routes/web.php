<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InternetPackageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Redirect dashboard to main dashboard route for consistency
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Client Management
    Route::resource('clients', ClientController::class);
    
    // Internet Package Management
    Route::resource('internet-packages', InternetPackageController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
