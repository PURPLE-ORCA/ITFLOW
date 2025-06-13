<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Add this

class ChatMessage extends Model
{
    use HasFactory; // Add this

    protected $fillable = [
        'user_id',
        'prompt',
        'reply',
        'file_path',
        'file_name',
        'mime_type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
