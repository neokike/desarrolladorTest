@extends('layouts.base')
@section('title')
    Home
@endsection
@section('head')
    @parent
    <link rel="stylesheet" href="{{asset('css/dataTables.css')}}">
    <script src="https://use.fontawesome.com/8ceb8e6639.js"></script>
@endsection

@section('content')
    <div id="wrapper" ng-app="app">
        @include('layouts.topmenu')
        <div id="page-wrapper">
            <div class="container-fluid" ui-view>

            </div>
        </div>
    </div>
@endsection

@section('scripts')
    @parent
    <script src="{{asset('js/app.js')}}"></script>
@endsection