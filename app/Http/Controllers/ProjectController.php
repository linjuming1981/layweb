<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    

	public function index(){
		$project_dir = public_path().'/projects';
		$arr = glob($project_dir.'/*', GLOB_ONLYDIR);
		$list = [];
		foreach($arr as $k=>$v){
			$list[] = basename($v);
		}
		$data = ['list'=>$list];
		return view('project/index',$data);
	}


	public function projectDetail($project){
		$project_dir = public_path().'/projects/'.$project;
		$pages = glob($project_dir.'/*');
		$list = [];
		foreach($pages as $k=>$v){
			$list[] = basename($v);
		}
		$data = ['list'=>$list,'project'=>$project];
		return view('project/projectDetail',$data);

	}

	public function pageDetail(Request $request, $project, $page){
		$page_path = public_path().'/projects/'.$project.'/'.$page;
		$code = file_get_contents($page_path);
		
		$data = [
			'project'=>$project, 
			'page'=>$page,
			'code'=>$code,
			'root_url'=> $request->root(),
		];
		return view('project/pageDetail', $data);
	}

	
}
