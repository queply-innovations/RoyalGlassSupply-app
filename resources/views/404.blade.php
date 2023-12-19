@extends('layout.layout')

@section('content')
    <div class="flex flex-col items-center justify-center w-screen h-screen">
        <h1 class="font-bold text-9xl text-primary-dark-gray">404</h1>
        <h2 class="text-3xl font-bold text-primary-dark-gray">
            Page Not Found
        </h2>
        <p class="text-xl text-primary-dark-gray">
            Sorry, the page you're looking for doesn't exist.
        </p>
        <a href="{{ url()->previous() }}">
            <button type="button" class="px-4 py-2 bg-red-400 rounded-full">Go Back</button>
        </a>
    </div>
@endsection
