<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = [
            ['type' => 'payment_due', 'title' => 'Payment Due', 'message' => 'Your monthly payment is due soon.'],
            ['type' => 'payment_overdue', 'title' => 'Payment Overdue', 'message' => 'Your payment is overdue. Please pay immediately.'],
            ['type' => 'installation_reminder', 'title' => 'Installation Scheduled', 'message' => 'Your installation is scheduled for tomorrow.'],
            ['type' => 'general', 'title' => 'General Notice', 'message' => 'We have an important update for you.'],
        ];

        $notification = fake()->randomElement($types);

        return [
            'client_id' => Client::factory(),
            'title' => $notification['title'],
            'message' => $notification['message'],
            'type' => $notification['type'],
            'is_read' => fake()->boolean(30), // 30% chance of being read
            'due_date' => fake()->optional(0.7)->dateTimeBetween('now', '+1 month'),
        ];
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
        ]);
    }

    /**
     * Indicate that the notification is for payment due.
     */
    public function paymentDue(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'payment_due',
            'title' => 'Payment Due',
            'message' => 'Your monthly internet payment is due in 3 days.',
            'due_date' => now()->addDays(3),
        ]);
    }
}