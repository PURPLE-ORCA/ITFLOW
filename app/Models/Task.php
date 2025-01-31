<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'phase',
        'assigned_to',
        'created_by',
        'due_date'
    ];

    protected $casts = [
        'due_date' => 'datetime'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function confirmations()
    {
        return $this->hasMany(Confirmation::class);
    }

    public function confirmation()
{
    return $this->hasOne(Confirmation::class);
}
public function createdByUser()
{
    return $this->belongsTo(User::class, 'created_by');
}
}
