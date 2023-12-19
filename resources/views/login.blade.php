@extends('layout.layout')

@section('content')
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="flex flex-col items-center gap-5 p-5 border-[0.5px] border-gray-50 rounded-md shadow-md">
            <div>
                <img src="/RGS-logo.png" alt="RGS Logo" class="w-20 h-20" />
            </div>
            <div class="text-3xl font-bold">Royal Glass Supply</div>
            <a href="/welcome">
                <button type="button" class="p-2 bg-gray-600">Login</button>
            </a>
            <button onclick="redirectToRandomUrl()">Go to Random URL</button>

        </div>
    </div>
    <script>
        function redirectToRandomUrl() {
            // Array of example URLs
            var urls = [
                'http::/localhost:8000/page1',
                'http::/localhost:8000/page2',
                'http::/localhost:8000/page3',
                // Add more URLs as needed
            ];

            // Get a random URL from the array
            var randomUrl = urls[Math.floor(Math.random() * urls.length)];

            // Redirect to the random URL
            window.location.href = randomUrl;
        }
    </script>
@endsection
