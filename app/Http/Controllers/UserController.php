<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\UserRole;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all users in json
        
        return new UserCollection(User::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
{
        // Update basic user information (except position)
        $userData = $request->except('position');
        $user->update($userData);
        
        // Handle position/role update
        $position = $request->input('position');
        if ($position) {
            // Find the role by title
            $role = Role::where('title', $position)->first();
            
            if ($role) {
                // Update or create the user role
                UserRole::updateOrCreate(
                    ['user_id' => $user->id],
                    ['role_id' => $role->id]
                );
            }
        }

        return new UserResource($user);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return new UserCollection(User::all());
    }

    public function register(Request $request) {
        $fields = $request->validate([
            'username' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'contact_no' => 'required|string',
            'position' => 'required|string',
            'active_status' => 'required|string'
        ]);
    
        // Create user without position field
        $user = User::create([
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'contact_no' => $fields['contact_no'],
            'active_status' => $fields['active_status']
        ]);
    
        // Assign role based on position
        $role = Role::where('title', $fields['position'])->first();
        if ($role) {
            UserRole::create([
                'user_id' => $user->id,
                'role_id' => $role->id
            ]);
        }
    
        $token = $user->createToken('myapptoken')->plainTextToken;
    
        $response = [
            'user' => $user,
            'token' => $token
        ];
    
        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        //Verify account
        if($user->active_status != 'active') {
            return response([
                'message' => 'Your account has been disabled. Kindly contact your administrator.'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out.'
        ];
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {
        $query = User::whereNotNull('id');

        if(!empty($request->search)){
            foreach($request->search as $search_key => $search_value){
                $query->where($search_key, 'like', '%'.$search_value.'%');
            }
        }
        
        if(!empty($request->filter)){
            foreach($request->filter as $filter_key => $filter_value){
                $query->where($filter_key, $filter_value);
            }
        }

        if(!empty($request->date_range)){
            foreach($request->date_range as $date_range_key => $date_range_value){
                $query->whereBetween($date_range_key, [$date_range_value['from'].' 00:00:00', $date_range_value['to'].' 23:59:59']);
            }
        }

        if(!empty($request->sort)){
            foreach($request->sort as $sort_key => $sort_value){
                $query->orderBy($sort_key, $sort_value);
            }
        }

        return new UserCollection($query->get());
    }
}
