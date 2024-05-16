<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'admin',
                'email' => 'admin@royalglasssupply.com',
                'password' => bcrypt('@dminrgs1234'),
                'role' => 'admin',
                'first_name' => 'Admin',
                'last_name' => 'Test',
                'contact_no' => '0909090909'
            ],
            [
                'username' => 'encoder_ILI',
                'email' => 'encoderili@royalglasssupply.com',
                'password' => bcrypt('encoderrgs1234'),
                'role' => 'encoder_ILI',
                'first_name' => 'Encoder ILI',
                'last_name' => 'Test',
                'contact_no' => '0909090909'
            ],
            [
                'username' => 'encoder_CDO',
                'email' => 'encodercdo@royalglasssupply.com',
                'password' => bcrypt('encoderrgs1234'),
                'role' => 'encoder_CDO',
                'first_name' => 'Encoder CDO',
                'last_name' => 'Test',
                'contact_no' => '0909090909'
            ],
            [
                'username' => 'salesperson_CDO',
                'email' => 'sales_cdo@royalglasssupply.com',
                'password' => bcrypt('salesrgs1234'),
                'role' => 'salesperson_CDO',
                'first_name' => 'Salesperson CDO',
                'last_name' => 'Test',
                'contact_no' => '0909090909'
            ],
            [
                'username' => 'salesperson_ILI',
                'email' => 'sales_ili@royalglasssupply.com',
                'password' => bcrypt('salesrgs1234'),
                'role' => 'salesperson_ILI',
                'first_name' => 'Salesperson ILI',
                'last_name' => 'Test',
                'contact_no' => '0909090909'
            ],
            [
                'username' => 'manager_ILI',
                'email' => 'managerili@royalglasssupply.com',
                'password' => bcrypt('managerrgs1234'),
                'role' => 'manager_ILI',
                'first_name' => 'Manager ILI',
                'last_name' => 'Test',
                'contact_no' => '0909090909'
            ],
            [
                'username' => 'manager_CDO',
                'email' => 'managercdo@royalglasssupply.com',
                'password' => bcrypt('managerrgs1234'),
                'role' => 'manager_CDO',
                'first_name' => 'Manager CDO',
                'last_name' => 'Test',
                'contact_no' => '0909090909'
            ]
        ];

        foreach($users as $user) {
            $role = Role::where('title', $user['role'])->first();

            if($role) {
                $data = [
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'password' => $user['password'],
                    'firstname' => $user['first_name'],
                    'lastname' => $user['last_name'],
                    'contact_no' => $user['contact_no'],
                    'position' => $user['role'],
                    'active_status' => 'active'
                ];

                $details = User::updateOrCreate([
                    'email' => $user['email']
                ], $data);

                $userRole = UserRole::updateOrCreate([
                    'user_id' => $details->id
                ], [
                    'user_id' => $details->id,
                    'role_id' => $role->id
                ]);

                $this->command->info("User: {$details->email} created/updated successfully.");
            }
        }
    }
}