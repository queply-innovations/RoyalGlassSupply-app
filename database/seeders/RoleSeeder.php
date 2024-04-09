<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['admin', 'super_admin', 'manager_CDO', 'manager_ILI', 'salesperson_CDO', 'salesperson_ILI', 'encoder_CDO', 'encoder_ILI'];

        foreach($roles as $role) {
            $check = Role::where('title', $role)->exists();

            if(!$check) {
                $create = Role::create([
                    'title' => $role
                ]);

                $this->command->info("Role with title: $create->title created successfully.");
            }
        }
    }
}
