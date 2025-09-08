import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Internet Packages', href: '/internet-packages' },
];

interface InternetPackage {
    id: number;
    name: string;
    price: number;
    speed: string;
    description: string;
    is_active: boolean;
    clients_count: number;
}

interface InternetPackagesIndexProps {
    packages: {
        data: InternetPackage[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    [key: string]: unknown;
}

export default function InternetPackagesIndex({ packages }: InternetPackagesIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Internet Packages - RT RW Net" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">📦 Internet Package Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage available internet packages and their configurations
                        </p>
                    </div>
                    <Link href={route('internet-packages.create')}>
                        <Button>
                            <span className="mr-2">➕</span>
                            Add New Package
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{packages.data.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {packages.data.filter(pkg => pkg.is_active).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {packages.data.reduce((sum, pkg) => sum + pkg.clients_count, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Packages Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {packages.data.map((pkg) => (
                        <Card key={pkg.id} className={`hover:shadow-lg transition-shadow ${
                            !pkg.is_active ? 'opacity-75' : ''
                        }`}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                                    <Badge variant={pkg.is_active ? 'default' : 'secondary'}>
                                        {pkg.is_active ? '✅ Active' : '⏸️ Inactive'}
                                    </Badge>
                                </div>
                                <div className="text-3xl font-bold text-primary">
                                    {formatCurrency(pkg.price)}
                                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">🚀</span>
                                        <span className="font-medium">{pkg.speed}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {pkg.description}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">👥</span>
                                    <span className="text-sm">
                                        <span className="font-medium">{pkg.clients_count}</span>
                                        <span className="text-muted-foreground"> subscribers</span>
                                    </span>
                                </div>

                                <div className="flex space-x-2 pt-4 border-t">
                                    <Link href={route('internet-packages.show', pkg.id)} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            👁️ View
                                        </Button>
                                    </Link>
                                    <Link href={route('internet-packages.edit', pkg.id)} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            ✏️ Edit
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {packages.data.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold mb-2">No internet packages found</h3>
                            <p className="text-muted-foreground mb-4">
                                Start by creating your first internet package offering.
                            </p>
                            <Link href={route('internet-packages.create')}>
                                <Button>Create First Package</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {packages.links && packages.links.length > 3 && (
                    <div className="flex items-center justify-center space-x-2">
                        {packages.links.map((link, index) => (
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
            </div>
        </AppLayout>
    );
}