<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InternetPackage>
 */
class InternetPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $packages = [
            ['name' => 'Basic', 'speed' => '10 Mbps', 'price' => 150000],
            ['name' => 'Standard', 'speed' => '25 Mbps', 'price' => 250000],
            ['name' => 'Premium', 'speed' => '50 Mbps', 'price' => 400000],
            ['name' => 'Ultimate', 'speed' => '100 Mbps', 'price' => 600000],
        ];

        $package = fake()->randomElement($packages);

        return [
            'name' => $package['name'],
            'price' => $package['price'],
            'speed' => $package['speed'],
            'description' => fake()->sentence(),
            'is_active' => fake()->boolean(85), // 85% chance of being active
        ];
    }

    /**
     * Indicate that the package is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}