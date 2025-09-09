import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Internet Packages', href: '/internet-packages' },
    { title: 'Create Package', href: '/internet-packages/create' },
];



export default function CreateInternetPackage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        speed: '',
        description: '',
        is_active: true as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('internet-packages.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Internet Package - RT RW Net" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">📦 Create New Internet Package</h1>
                        <p className="text-muted-foreground mt-1">
                            Add a new internet package to your service offerings
                        </p>
                    </div>
                    <Link href={route('internet-packages.index')}>
                        <Button variant="outline">
                            <span className="mr-2">←</span>
                            Back to Packages
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>🎯 Package Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Package Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., Basic, Standard, Premium"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Monthly Price (Rp) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="e.g., 150000"
                                        min="0"
                                        step="1000"
                                        className={errors.price ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="speed">Speed *</Label>
                                    <Input
                                        id="speed"
                                        type="text"
                                        value={data.speed}
                                        onChange={(e) => setData('speed', e.target.value)}
                                        placeholder="e.g., 25 Mbps, 100 Mbps"
                                        className={errors.speed ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.speed} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="is_active">Status</Label>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                                        />
                                        <Label htmlFor="is_active">
                                            Package is active and available for new subscribers
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe what this package includes and who it's for..."
                                    rows={3}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex items-center justify-end space-x-2 pt-6 border-t">
                                <Link href={route('internet-packages.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <span className="mr-2">⏳</span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <span className="mr-2">✨</span>
                                            Create Package
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