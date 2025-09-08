<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use App\Models\InternetPackage;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::with(['internetPackage'])
            ->latest()
            ->paginate(15);

        return Inertia::render('clients/index', [
            'clients' => $clients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $internetPackages = InternetPackage::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('clients/create', [
            'internetPackages' => $internetPackages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());

        return redirect()->route('clients.show', $client)
            ->with('success', 'Client created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        $client->load([
            'internetPackage',
            'payments' => function ($query) {
                $query->orderBy('period_month', 'desc');
            },
            'tickets' => function ($query) {
                $query->latest();
            },
            'notifications' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('clients/show', [
            'client' => $client
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        $internetPackages = InternetPackage::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('clients/edit', [
            'client' => $client,
            'internetPackages' => $internetPackages
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return redirect()->route('clients.show', $client)
            ->with('success', 'Client updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->route('clients.index')
            ->with('success', 'Client deleted successfully.');
    }
}