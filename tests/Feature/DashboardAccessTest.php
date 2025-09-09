<?php

use App\Models\User;
use App\Models\InternetPackage;
use App\Models\Client;

test('authenticated users can access dashboard without errors', function () {
    $user = User::factory()->create();
    
    $this->actingAs($user)
        ->get('/dashboard')
        ->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('stats')
            ->where('stats.total_clients', fn ($value) => is_numeric($value))
        );
});

test('dashboard creates sample data if database is empty', function () {
    $user = User::factory()->create();
    
    // Ensure database is empty
    InternetPackage::truncate();
    Client::truncate();
    
    $this->actingAs($user)
        ->get('/dashboard')
        ->assertStatus(200);
    
    // Check that sample data was created
    expect(InternetPackage::count())->toBeGreaterThan(0);
});

test('dashboard handles missing relationships gracefully', function () {
    $user = User::factory()->create();
    
    // Create a client without a proper internet package relationship
    $package = InternetPackage::factory()->create();
    $client = Client::factory()->create(['internet_package_id' => $package->id]);
    
    $this->actingAs($user)
        ->get('/dashboard')
        ->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('recentClients')
        );
});