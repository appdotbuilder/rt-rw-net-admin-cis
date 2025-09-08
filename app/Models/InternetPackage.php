<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\InternetPackage
 *
 * @property int $id
 * @property string $name
 * @property string $price
 * @property string $speed
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Client> $clients
 * @property-read int|null $clients_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage query()
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage whereSpeed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InternetPackage active()
 * @method static \Database\Factories\InternetPackageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class InternetPackage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'price',
        'speed',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the clients for this internet package.
     */
    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    /**
     * Scope a query to only include active packages.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}