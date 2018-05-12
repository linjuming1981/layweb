<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>项目列表</title>
	<link rel="stylesheet" href="{{asset('css/global.css')}}">
</head>
<body>

<div class="projects_list">
	<ul>
		<?php foreach($list as $k=>$v){ ?>
		<li><a href="{{url('project/'.$project.'/'.$v)}}">{{$v}}</a></li>
		<?php } ?>
	</ul>
</div>
	
</body>
</html>