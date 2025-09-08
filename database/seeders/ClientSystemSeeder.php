<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\InternetPackage;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Ticket;
use Illuminate\Database\Seeder;

class ClientSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Internet Packages
        $packages = [
            [
                'name' => 'Basic',
                'price' => 150000,
                'speed' => '10 Mbps',
                'description' => 'Basic internet package for light browsing and social media',
                'is_active' => true,
            ],
            [
                'name' => 'Standard',
                'price' => 250000,
                'speed' => '25 Mbps',
                'description' => 'Standard package for streaming and work from home',
                'is_active' => true,
            ],
            [
                'name' => 'Premium',
                'price' => 400000,
                'speed' => '50 Mbps',
                'description' => 'Premium package for heavy streaming and gaming',
                'is_active' => true,
            ],
            [
                'name' => 'Ultimate',
                'price' => 600000,
                'speed' => '100 Mbps',
                'description' => 'Ultimate package for businesses and heavy users',
                'is_active' => true,
            ],
            [
                'name' => 'Legacy Basic',
                'price' => 100000,
                'speed' => '5 Mbps',
                'description' => 'Legacy package - no longer available',
                'is_active' => false,
            ],
        ];

        foreach ($packages as $package) {
            InternetPackage::create($package);
        }

        // Create clients with relationships
        $activePackages = InternetPackage::active()->get();
        
        Client::factory(50)->create()->each(function ($client) use ($activePackages) {
            // Assign a random active package
            $client->internet_package_id = $activePackages->random()->id;
            $client->save();

            // Create payments for the last 6 months (some clients may be missing payments)
            $shouldHavePayments = fake()->boolean(80); // 80% of clients have payments
            
            if ($shouldHavePayments) {
                for ($i = 5; $i >= 0; $i--) {
                    $periodMonth = now()->subMonths($i)->startOfMonth();
                    $shouldPay = fake()->boolean(85); // 85% chance of payment each month
                    
                    if ($shouldPay) {
                        Payment::create([
                            'client_id' => $client->id,
                            'amount' => $client->internetPackage->price,
                            'payment_date' => $periodMonth->addDays(random_int(1, 28)),
                            'period_month' => $periodMonth->format('Y-m-d'),
                            'payment_method' => fake()->randomElement(['cash', 'transfer', 'other']),
                            'notes' => fake()->optional(0.3)->sentence(),
                        ]);
                    }
                }
            }

            // Create tickets (some clients have support tickets)
            if (fake()->boolean(40)) { // 40% chance of having tickets
                Ticket::factory(random_int(1, 3))->create([
                    'client_id' => $client->id,
                ]);
            }

            // Create notifications for payment reminders
            if (fake()->boolean(60)) { // 60% chance of having notifications
                Notification::factory(random_int(1, 2))->create([
                    'client_id' => $client->id,
                ]);
            }
        });

        // Create specific overdue payment notifications
        $clientsWithoutRecentPayments = Client::whereDoesntHave('payments', function ($query) {
            $query->where('period_month', '>=', now()->subMonth()->startOfMonth());
        })->take(10)->get();

        foreach ($clientsWithoutRecentPayments as $client) {
            Notification::create([
                'client_id' => $client->id,
                'title' => 'Payment Overdue',
                'message' => "Your monthly payment of Rp " . number_format((float)$client->internetPackage->price) . " is overdue. Please pay immediately to avoid service disconnection.",
                'type' => 'payment_overdue',
                'is_read' => false,
                'due_date' => now()->subDays(5),
            ]);
        }
    }
}