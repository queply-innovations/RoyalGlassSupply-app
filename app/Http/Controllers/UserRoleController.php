<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use App\Http\Resources\UserRoleCollection;
use App\Http\Resources\UserRoleResource;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all user roles in json
        return new UserRoleCollection(UserRole::all());
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
        $userRole = UserRole::create($request->all());

        return new UserRoleResource($userRole);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserRole $userRole)
    {
        return new UserRoleResource($userRole);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserRole $userRole)
    {
        return new UserRoleResource($userRole);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserRole $userRole)
    {
        $userRole->update($request->all());
        
        return new UserRoleResource($userRole);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserRole $userRole)
    {
        $userRole->delete();

        return new UserRoleCollection(UserRole::all());
    }
}
