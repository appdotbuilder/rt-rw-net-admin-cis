import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        total_clients: number;
        active_clients: number;
        inactive_clients: number;
        total_packages: number;
        active_packages: number;
        open_tickets: number;
        unread_notifications: number;
        monthly_revenue: number;
    };
    recentClients: Array<{
        id: number;
        name: string;
        phone: string;
        status: string;
        created_at: string;
        internet_package?: {
            name: string;
            price: number;
        } | null;
    }>;
    openTickets: Array<{
        id: number;
        title: string;
        priority: string;
        created_at: string;
        client?: {
            name: string;
        } | null;
    }>;
    recentNotifications: Array<{
        id: number;
        title: string;
        type: string;
        created_at: string;
        client?: {
            name: string;
        } | null;
    }>;
    monthlyRevenue: Array<{
        month: string;
        total: number;
    }>;
    [key: string]: unknown;
}

export default function Dashboard({
    stats,
    recentClients,
    openTickets,
    recentNotifications,
}: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'inactive':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'destructive';
            case 'high':
                return 'default';
            case 'medium':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - RT RW Net Client System" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">🌐 RT RW Net Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome to your client information system
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={route('clients.create')}>
                            <Button>
                                <span className="mr-2">👤</span>
                                Add Client
                            </Button>
                        </Link>
                        <Link href={route('internet-packages.create')}>
                            <Button variant="outline">
                                <span className="mr-2">📦</span>
                                Add Package
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                            <span className="text-2xl">👥</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_clients}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_clients} active, {stats.inactive_clients} inactive
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Internet Packages</CardTitle>
                            <span className="text-2xl">📦</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_packages}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_packages} active packages
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                            <span className="text-2xl">🎫</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.open_tickets}</div>
                            <p className="text-xs text-muted-foreground">
                                Support tickets pending
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                            <span className="text-2xl">💰</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.monthly_revenue)}</div>
                            <p className="text-xs text-muted-foreground">
                                Current month earnings
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚡ Quick Actions</CardTitle>
                        <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Link href={route('clients.index')} className="block">
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">👥</span>
                                        <div>
                                            <h3 className="font-medium">Manage Clients</h3>
                                            <p className="text-sm text-muted-foreground">View and manage all clients</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link href={route('internet-packages.index')} className="block">
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">📦</span>
                                        <div>
                                            <h3 className="font-medium">Internet Packages</h3>
                                            <p className="text-sm text-muted-foreground">Manage service packages</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">📊</span>
                                    <div>
                                        <h3 className="font-medium">Generate Reports</h3>
                                        <p className="text-sm text-muted-foreground">View analytics and reports</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recent Clients */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🆕 Recent Clients</CardTitle>
                            <CardDescription>Latest client registrations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentClients.map((client) => (
                                    <div key={client.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{client.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {client.internet_package?.name || 'No Package'} - {client.phone}
                                            </p>
                                        </div>
                                        <Badge variant={getStatusBadgeVariant(client.status)}>
                                            {client.status}
                                        </Badge>
                                    </div>
                                ))}
                                {recentClients.length === 0 && (
                                    <p className="text-muted-foreground text-center py-4">
                                        No recent clients
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Open Tickets */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🎫 Open Support Tickets</CardTitle>
                            <CardDescription>Tickets requiring attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {openTickets.map((ticket) => (
                                    <div key={ticket.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{ticket.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {ticket.client?.name || 'Unknown Client'}
                                            </p>
                                        </div>
                                        <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                                            {ticket.priority}
                                        </Badge>
                                    </div>
                                ))}
                                {openTickets.length === 0 && (
                                    <p className="text-muted-foreground text-center py-4">
                                        🎉 No open tickets!
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Notifications */}
                {recentNotifications.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>🔔 Recent Notifications</CardTitle>
                            <CardDescription>System alerts and reminders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentNotifications.map((notification) => (
                                    <div key={notification.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{notification.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {notification.client?.name || 'System Notification'}
                                            </p>
                                        </div>
                                        <Badge variant="outline">
                                            {notification.type.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}