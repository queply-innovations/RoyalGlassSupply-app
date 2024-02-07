<?php

namespace App\Http\Controllers;

use App\Models\RolePermission;
use App\Http\Resources\RolePermissionCollection;
use App\Http\Resources\RolePermissionResource;
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
        $rolePermission = RolePermission::create($request->all());

        return new RolePermissionResource($rolePermission);
    }

    /**
     * Display the specified resource.
     */
    public function show(RolePermission $rolePermission)
    {
        return new RolePermissionResource($rolePermission);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RolePermission $rolePermission)
    {
        return new RolePermissionResource($rolePermission);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RolePermission $rolePermission)
    {
        $rolePermission->update($request->all());

        return new RolePermissionResource($rolePermission);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RolePermission $rolePermission)
    {
        $rolePermission->delete();

        return new RolePermissionCollection(RolePermission::all());
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {

        //returns a filtered list of permissions of a particular role
        $query = RolePermission::where('role_id', $request->role_id);

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

        return new RolePermissionCollection($query->get());
    }
}
