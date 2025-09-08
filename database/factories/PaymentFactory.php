<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $periodMonth = fake()->dateTimeBetween('-1 year', 'now');
        
        return [
            'client_id' => Client::factory(),
            'amount' => fake()->randomFloat(2, 100000, 600000),
            'payment_date' => fake()->dateTimeBetween($periodMonth, 'now'),
            'period_month' => $periodMonth->format('Y-m-01'), // First day of month
            'payment_method' => fake()->randomElement(['cash', 'transfer', 'other']),
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the payment was made via transfer.
     */
    public function transfer(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => 'transfer',
        ]);
    }

    /**
     * Indicate that the payment was made in cash.
     */
    public function cash(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => 'cash',
        ]);
    }
}