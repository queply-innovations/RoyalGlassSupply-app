<?php

namespace App\Http\Controllers;

use App\Models\OperationExpense;
use App\Http\Resources\OperationExpenseCollection;
use App\Http\Resources\OperationExpenseResource;
use Illuminate\Http\Request;

class OperationExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all OperationExpenses in json
        return new OperationExpenseCollection(OperationExpense::all());
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
        $operationExpense = OperationExpense::create($request->all());

        return new OperationExpenseResource($operationExpense);
    }

    /**
     * Display the specified resource.
     */
    public function show(OperationExpense $operationExpense)
    {
        return new OperationExpenseResource($operationExpense);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OperationExpense $operationExpense)
    {
        return new OperationExpenseResource($operationExpense);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OperationExpense $operationExpense)
    {
        $operationExpense->update($request->all());

        return new OperationExpenseResource($operationExpense);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OperationExpense $operationExpense)
    {
        $operationExpense->delete();
        
        return new OperationExpenseCollection(OperationExpense::all());
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {
        $query = OperationExpense::whereNotNull('id');

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

        return new OperationExpenseCollection($query->get());
    }
}
