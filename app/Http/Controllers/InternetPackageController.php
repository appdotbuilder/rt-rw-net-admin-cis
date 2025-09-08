<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInternetPackageRequest;
use App\Http\Requests\UpdateInternetPackageRequest;
use App\Models\InternetPackage;
use Inertia\Inertia;

class InternetPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packages = InternetPackage::withCount('clients')
            ->latest()
            ->paginate(10);

        return Inertia::render('internet-packages/index', [
            'packages' => $packages
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('internet-packages/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInternetPackageRequest $request)
    {
        $package = InternetPackage::create($request->validated());

        return redirect()->route('internet-packages.index')
            ->with('success', 'Internet package created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InternetPackage $internetPackage)
    {
        $internetPackage->load(['clients' => function ($query) {
            $query->with('payments')->latest();
        }]);

        return Inertia::render('internet-packages/show', [
            'package' => $internetPackage
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InternetPackage $internetPackage)
    {
        return Inertia::render('internet-packages/edit', [
            'package' => $internetPackage
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInternetPackageRequest $request, InternetPackage $internetPackage)
    {
        $internetPackage->update($request->validated());

        return redirect()->route('internet-packages.index')
            ->with('success', 'Internet package updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InternetPackage $internetPackage)
    {
        if ($internetPackage->clients()->count() > 0) {
            return redirect()->route('internet-packages.index')
                ->with('error', 'Cannot delete package that has active clients.');
        }

        $internetPackage->delete();

        return redirect()->route('internet-packages.index')
            ->with('success', 'Internet package deleted successfully.');
    }
}