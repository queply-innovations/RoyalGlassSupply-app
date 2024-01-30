<?php

namespace App\Http\Controllers;

use App\Models\RolePermission;
use App\Http\Resources\RolePermissionCollection;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all role permissions in json
        return new RolePermissionCollection(RolePermission::all());
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
        return RolePermission::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(RolePermission $rolePermission)
    {
        return $rolePermission;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RolePermission $rolePermission)
    {
        return $rolePermission;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RolePermission $rolePermission)
    {
        $rolePermission->update($request->all());

        return $rolePermission;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RolePermission $rolePermission)
    {
        $rolePermission->delete();

        return new RolePermissionCollection(RolePermission::all());
    }
}
