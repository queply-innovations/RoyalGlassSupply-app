<?php

namespace App\Http\Controllers;

use App\Models\UserWarehouse;
use App\Http\Resources\UserWarehouseCollection;
use App\Http\Resources\UserWarehouseResource;
use Illuminate\Http\Request;

class UserWarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all user roles in json
        return new UserWarehouseCollection(UserWarehouse::all());
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
        $userWarehouse = UserWarehouse::create($request->all());

        return new UserWarehouseResource($userWarehouse);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserWarehouse $userWarehouse)
    {
        return new UserWarehouseResource($userWarehouse);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserWarehouse $userWarehouse)
    {
        return new UserWarehouseResource($userWarehouse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserWarehouse $userWarehouse)
    {
        $userWarehouse->update($request->all());
        
        return new UserWarehouseResource($userWarehouse);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserWarehouse $userWarehouse)
    {
        $userWarehouse->delete();

        return new UserWarehouseCollection(UserWarehouse::all());
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {

        //returns a filtered list of roles of a particular user
        $query = UserWarehouse::where('user_id', $request->user_id);

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

        return new UserWarehouseCollection($query->get());
    }
}
