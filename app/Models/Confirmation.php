<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Confirmation extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'description',
        'file_path',
        'created_by'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    // In Confirmation.php
public function createdByUser()
{
    return $this->belongsTo(User::class, 'created_by');
}
}