import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Welcome() {
    const features = [
        {
            icon: '👥',
            title: 'Client Management',
            description: 'Manage comprehensive client records including personal info, packages, and status'
        },
        {
            icon: '📦',
            title: 'Package Management',
            description: 'Create and manage internet packages with pricing and speed configurations'
        },
        {
            icon: '💰',
            title: 'Payment Tracking',
            description: 'Record and track monthly bill payments with detailed payment history'
        },
        {
            icon: '📊',
            title: 'Reports & Analytics',
            description: 'Generate comprehensive reports for active clients and revenue analysis'
        },
        {
            icon: '🎫',
            title: 'Ticketing System',
            description: 'Log and manage client complaints and technical support requests'
        },
        {
            icon: '🔔',
            title: 'Smart Notifications',
            description: 'Automated alerts for upcoming payments and overdue bills'
        }
    ];

    const stats = [
        { label: 'Active Clients', value: '500+', color: 'bg-green-100 text-green-800' },
        { label: 'Internet Packages', value: '4', color: 'bg-blue-100 text-blue-800' },
        { label: 'Monthly Revenue', value: 'Rp 125M+', color: 'bg-purple-100 text-purple-800' },
        { label: 'Support Tickets', value: '98% Resolved', color: 'bg-orange-100 text-orange-800' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 text-white p-2 rounded-lg">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">RT RW Net</h1>
                                <p className="text-sm text-gray-600">Client Information System</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <Link href={route('login')}>
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            🌐 Complete Client Management for RT RW Net
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Streamline your internet service provider operations with our comprehensive 
                            client information system. Manage clients, track payments, handle support tickets, 
                            and grow your business efficiently.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('login')}>
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                    🚀 Access Dashboard
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="px-8 py-3">
                                📖 View Features
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white rounded-lg p-6 shadow-sm border">
                                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                    <Badge className={stat.color}>{stat.label}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            ⚡ Powerful Features for ISP Management
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage your RT RW Net operations efficiently and effectively.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="text-4xl mb-3">{feature.icon}</div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold mb-6">
                        📱 Modern Dashboard Interface
                    </h3>
                    <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                        Clean, intuitive interface designed specifically for RT RW Net administrators. 
                        Access all features from a single, comprehensive dashboard.
                    </p>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            <div>
                                <h4 className="font-semibold mb-2">📈 Real-time Analytics</h4>
                                <p className="text-blue-100 text-sm">
                                    Track revenue, client growth, and system performance
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">⏰ Payment Reminders</h4>
                                <p className="text-blue-100 text-sm">
                                    Automated notifications for due and overdue payments
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">🛠️ Support Management</h4>
                                <p className="text-blue-100 text-sm">
                                    Efficiently handle client complaints and technical issues
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                        🎯 Ready to Streamline Your RT RW Net Operations?
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                        Join hundreds of RT RW Net operators who trust our system to manage their clients 
                        and grow their business. Get started today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                🚀 Start Free Trial
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button variant="outline" size="lg" className="px-8 py-3">
                                🔑 Administrator Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="bg-blue-600 text-white p-2 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold">RT RW Net Client System</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Professional client information management for internet service providers
                        </p>
                        <p className="text-gray-500 text-sm">
                            © 2024 RT RW Net Client System. Built with Laravel & React.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}