<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\InternetPackage;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Ticket;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with system statistics.
     */
    public function index()
    {
        // Check if database is empty and seed if needed
        $this->ensureDataExists();

        try {
            $stats = [
                'total_clients' => Client::count(),
                'active_clients' => Client::where('status', 'active')->count(),
                'inactive_clients' => Client::where('status', 'inactive')->count(),
                'total_packages' => InternetPackage::count(),
                'active_packages' => InternetPackage::where('is_active', true)->count(),
                'open_tickets' => Ticket::where('status', 'open')->count(),
                'unread_notifications' => Notification::where('is_read', false)->count(),
                'monthly_revenue' => Payment::whereYear('period_month', now()->year)
                    ->whereMonth('period_month', now()->month)
                    ->sum('amount') ?: 0,
            ];

            // Use try-catch for each query to prevent cascading failures
            $recentClients = collect();
            try {
                $recentClients = Client::with('internetPackage')
                    ->latest()
                    ->take(5)
                    ->get();
            } catch (\Exception $e) {
                // Handle potential foreign key or relationship issues
                $recentClients = Client::latest()->take(5)->get();
            }

            $openTickets = collect();
            try {
                $openTickets = Ticket::with('client')
                    ->where('status', 'open')
                    ->latest()
                    ->take(5)
                    ->get();
            } catch (\Exception $e) {
                // Fallback to tickets without client relationship
                $openTickets = Ticket::where('status', 'open')
                    ->latest()
                    ->take(5)
                    ->get();
            }

            $recentNotifications = collect();
            try {
                $recentNotifications = Notification::with('client')
                    ->where('is_read', false)
                    ->latest()
                    ->take(5)
                    ->get();
            } catch (\Exception $e) {
                // Fallback to notifications without client relationship
                $recentNotifications = Notification::where('is_read', false)
                    ->latest()
                    ->take(5)
                    ->get();
            }

            // Get monthly revenue data (cross-database compatible)
            $monthlyRevenue = collect();
            try {
                $monthlyRevenue = Payment::where('period_month', '>=', now()->subMonths(12))
                    ->get()
                    ->groupBy(function ($payment) {
                        $date = $payment->period_month;
                        // Convert date to string format consistently
                        return date('Y-m', strtotime((string) $date));
                    })
                    ->map(function ($payments, $month) {
                        return [
                            'month' => $month,
                            'total' => $payments->sum('amount'),
                        ];
                    })
                    ->sortBy('month')
                    ->values();
            } catch (\Exception $e) {
                $monthlyRevenue = collect();
            }
        } catch (\Exception $e) {
            // If there's any database error, return empty data to prevent crashes
            $stats = [
                'total_clients' => 0,
                'active_clients' => 0,
                'inactive_clients' => 0,
                'total_packages' => 0,
                'active_packages' => 0,
                'open_tickets' => 0,
                'unread_notifications' => 0,
                'monthly_revenue' => 0,
            ];

            $recentClients = collect();
            $openTickets = collect();
            $recentNotifications = collect();
            $monthlyRevenue = collect();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentClients' => $recentClients,
            'openTickets' => $openTickets,
            'recentNotifications' => $recentNotifications,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }

    /**
     * Ensure that basic data exists in the database.
     */
    protected function ensureDataExists(): void
    {
        // Check if we have any internet packages
        if (InternetPackage::count() === 0) {
            // Create basic packages
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
            ];

            foreach ($packages as $package) {
                InternetPackage::create($package);
            }
        }

        // Create some sample clients if none exist
        if (Client::count() === 0 && InternetPackage::count() > 0) {
            $basicPackage = InternetPackage::first();
            
            $sampleClients = [
                [
                    'name' => 'Ahmad Budiman',
                    'address' => 'Jl. Merdeka No. 12, RT 001/RW 005',
                    'phone' => '0812-3456-7890',
                    'internet_package_id' => $basicPackage->id,
                    'installation_date' => now()->subDays(30),
                    'status' => 'active',
                    'notes' => 'Klien aktif sejak bulan lalu',
                ],
                [
                    'name' => 'Siti Aminah',
                    'address' => 'Jl. Pahlawan No. 45, RT 002/RW 005',
                    'phone' => '0813-9876-5432',
                    'internet_package_id' => $basicPackage->id,
                    'installation_date' => now()->subDays(15),
                    'status' => 'active',
                    'notes' => 'Klien baru, instalasi 2 minggu lalu',
                ],
            ];

            foreach ($sampleClients as $client) {
                Client::create($client);
            }
        }
    }
}