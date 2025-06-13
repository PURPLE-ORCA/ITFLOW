<?php
// The new migration file (e.g., xxxx_xx_xx_xxxxxx_create_chat_messages_table.php)

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Who sent it
            $table->text('prompt')->nullable(); // The text part of the message
            $table->text('reply')->nullable(); // The AI's reply text
            $table->string('file_path')->nullable(); // Path to the uploaded file
            $table->string('file_name')->nullable(); // Original name of the file
            $table->string('mime_type')->nullable(); // e.g., 'image/jpeg', 'application/pdf'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
