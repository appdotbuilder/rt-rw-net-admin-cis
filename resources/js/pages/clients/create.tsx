import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
    { title: 'Create', href: '/clients/create' },
];

interface InternetPackage {
    id: number;
    name: string;
    price: number;
    speed: string;
}

interface CreateClientFormData {
    name: string;
    address: string;
    phone: string;
    internet_package_id: string;
    installation_date: string;
    status: string;
    notes: string;
    [key: string]: string | number | boolean | File | null | undefined;
}

interface CreateClientProps {
    internetPackages: InternetPackage[];
    [key: string]: unknown;
}

export default function CreateClient({ internetPackages }: CreateClientProps) {
    const { data, setData, post, processing, errors } = useForm<CreateClientFormData>({
        name: '',
        address: '',
        phone: '',
        internet_package_id: '',
        installation_date: '',
        status: 'active',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('clients.store'));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Client - RT RW Net" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">➕ Add New Client</h1>
                    <p className="text-muted-foreground mt-2">
                        Register a new client to the RT RW Net system
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📝 Client Information</CardTitle>
                        <CardDescription>
                            Fill in all the required information for the new client
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Client Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter full name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="e.g., 08123456789"
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <Label htmlFor="address">Address *</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Enter complete address"
                                    className={errors.address ? 'border-red-500' : ''}
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-600">{errors.address}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Internet Package */}
                                <div className="space-y-2">
                                    <Label htmlFor="internet_package_id">Internet Package *</Label>
                                    <Select
                                        value={data.internet_package_id}
                                        onValueChange={(value) => setData('internet_package_id', value)}
                                    >
                                        <SelectTrigger className={errors.internet_package_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select package" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {internetPackages.map((pkg) => (
                                                <SelectItem key={pkg.id} value={pkg.id.toString()}>
                                                    {pkg.name} - {pkg.speed} ({formatCurrency(pkg.price)}/month)
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.internet_package_id && (
                                        <p className="text-sm text-red-600">{errors.internet_package_id}</p>
                                    )}
                                </div>

                                {/* Installation Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="installation_date">Installation Date *</Label>
                                    <Input
                                        id="installation_date"
                                        type="date"
                                        value={data.installation_date}
                                        onChange={(e) => setData('installation_date', e.target.value)}
                                        className={errors.installation_date ? 'border-red-500' : ''}
                                    />
                                    {errors.installation_date && (
                                        <p className="text-sm text-red-600">{errors.installation_date}</p>
                                    )}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value)}
                                >
                                    <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">✅ Active</SelectItem>
                                        <SelectItem value="inactive">⏸️ Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <Label htmlFor="notes">Additional Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Any additional information about this client"
                                    className={errors.notes ? 'border-red-500' : ''}
                                />
                                {errors.notes && (
                                    <p className="text-sm text-red-600">{errors.notes}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-6 border-t">
                                <Link href={route('clients.index')}>
                                    <Button type="button" variant="outline">
                                        ← Back to Clients
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <span className="animate-spin mr-2">⏳</span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <span className="mr-2">💾</span>
                                            Create Client
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}