@extends('layout.layout')

@section('content')
    <div>
        <h1>hello</h1>
        <a href="{{ url()->previous() }}">
            <button type="button" class="px-4 py-2 bg-red-400 rounded-full">Go Back</button>
        </a>
        <a href="/">
            <button type="button" class="px-4 py-2 bg-green-200 rounded-full">Login Page</button>
        </a>
    </div>
@endsection
