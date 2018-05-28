<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/project', 'ProjectController@index');
Route::get('/project/{project}', 'ProjectController@projectDetail');
Route::get('/project/{project}/{page}', 'ProjectController@pageDetail');
Route::get('/widget/{widget}', 'WidgetController@pageDetail');
Route::get('/widget', 'WidgetController@index');
Route::get('/widget/{widget}', 'WidgetController@detail');
Route::get('/htmlNodes', 'ProjectController@htmlNodes');
