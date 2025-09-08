<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Internet connection slow',
            'No internet access',
            'WiFi not working',
            'Connection drops frequently',
            'Need to upgrade package',
            'Router not working',
            'Need technical support',
        ];

        return [
            'client_id' => Client::factory(),
            'title' => fake()->randomElement($titles),
            'description' => fake()->paragraph(),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'urgent']),
            'status' => fake()->randomElement(['open', 'in_progress', 'resolved', 'closed']),
            'resolution' => fake()->optional(0.6)->paragraph(),
            'resolved_at' => fake()->optional(0.6)->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the ticket is open.
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'open',
            'resolution' => null,
            'resolved_at' => null,
        ]);
    }

    /**
     * Indicate that the ticket is resolved.
     */
    public function resolved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'resolved',
            'resolution' => fake()->paragraph(),
            'resolved_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }
}