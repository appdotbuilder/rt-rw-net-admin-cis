import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
];

interface Client {
    id: number;
    name: string;
    address: string;
    phone: string;
    status: string;
    installation_date: string;
    internet_package: {
        name: string;
        price: number;
        speed: string;
    };
}

interface ClientsIndexProps {
    clients: {
        data: Client[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    [key: string]: unknown;
}

export default function ClientsIndex({ clients }: ClientsIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients - RT RW Net" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">👥 Client Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage all RT RW Net clients and their information
                        </p>
                    </div>
                    <Link href={route('clients.create')}>
                        <Button>
                            <span className="mr-2">➕</span>
                            Add New Client
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{clients.data.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {clients.data.filter(client => client.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Inactive Clients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {clients.data.filter(client => client.status === 'inactive').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Clients List */}
                <Card>
                    <CardHeader>
                        <CardTitle>📋 All Clients</CardTitle>
                        <CardDescription>Complete list of RT RW Net clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {clients.data.map((client) => (
                                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <Link href={route('clients.show', client.id)}>
                                                    <h3 className="font-semibold hover:underline">{client.name}</h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground">{client.phone}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Package: </span>
                                                <span className="font-medium">{client.internet_package.name}</span>
                                                <span className="text-muted-foreground"> ({client.internet_package.speed})</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Price: </span>
                                                <span className="font-medium">{formatCurrency(client.internet_package.price)}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Installed: </span>
                                                <span className="font-medium">{formatDate(client.installation_date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                                            {client.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                                        </Badge>
                                        <div className="flex space-x-2">
                                            <Link href={route('clients.show', client.id)}>
                                                <Button variant="outline" size="sm">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            <Link href={route('clients.edit', client.id)}>
                                                <Button variant="outline" size="sm">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {clients.data.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">👥</div>
                                    <h3 className="text-xl font-semibold mb-2">No clients found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Start by adding your first client to the system.
                                    </p>
                                    <Link href={route('clients.create')}>
                                        <Button>Add First Client</Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {clients.links && clients.links.length > 3 && (
                            <div className="flex items-center justify-center space-x-2 mt-6">
                                {clients.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`px-3 py-1 rounded border ${
                                                    link.active
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'hover:bg-muted'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="px-3 py-1 text-muted-foreground"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}