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
                ->sum('amount'),
        ];

        $recentClients = Client::with('internetPackage')
            ->latest()
            ->take(5)
            ->get();

        $openTickets = Ticket::with('client')
            ->where('status', 'open')
            ->latest()
            ->take(5)
            ->get();

        $recentNotifications = Notification::with('client')
            ->where('is_read', false)
            ->latest()
            ->take(5)
            ->get();

        $monthlyRevenue = Payment::selectRaw('strftime("%Y-%m", period_month) as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->take(12)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentClients' => $recentClients,
            'openTickets' => $openTickets,
            'recentNotifications' => $recentNotifications,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }
}