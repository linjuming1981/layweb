<?php 
/**
 * bootstrap小组件
 */
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class WidgetController extends Controller{

	public function index(){
		echo app()->path().'<br>'; 					// D:\www\layweb\app
		echo app()->basePath().'<br>'; 				// D:\www\layweb
		echo app()->bootstrapPath().'<br>'; 		// D:\www\layweb\bootstrap
		echo app()->configPath().'<br>'; 			// D:\www\layweb\config
		echo app()->databasePath().'<br>'; 			// D:\www\layweb\database
		echo app()->langPath().'<br>'; 				// D:\www\layweb\resources\lang
		echo app()->publicPath().'<br>'; 			// D:\www\layweb\public
		echo app()->storagePath().'<br>'; 			// D:\www\layweb\storage
		echo app()->environmentPath().'<br>'; 		// D:\www\layweb
		echo app()->environmentFilePath().'<br>'; 	// D:\www\layweb\.env
		echo app()->environment().'<br>'; 			// local
		echo app()->environmentFilePath().'<br>'; 	// D:\www\layweb\.env
		echo app()->getNamespace().'<br>'; 			// App\
	}

	public function detail(Request $req, $widget){
		$isAjax = $req->ajax();
		$data = [
			'widget' => $widget,
			'isAjax' => $isAjax
		];
		return view('widget.detail', $data);
	}

}