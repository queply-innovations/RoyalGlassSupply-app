<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username',100)->default('')->index();
            $table->string('email',100)->default('')->index();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password',100);
            $table->string('firstname',100)->default('');
            $table->string('lastname',100)->default('');
            $table->string('contact_no',40);
            $table->string('position',40);
            $table->string('active_status',40);
            $table->string('remember_token',100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
