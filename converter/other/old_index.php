<?php

//echo exec('C:\ffmpeg\bin\ffmpeg.exe -i \\\\node1\videos\real\17C0FE36-F064-4BCA-8C16-38BA178A214C.flv -y \\\\node1\videos\converted\\2.mp4 2>&1');//WORKS!!!
//die();
set_time_limit(0);
ini_set('memory_limit', '4048M');
ini_set('display_errors', 'On');
error_reporting(E_ALL); 

$user     = 'sa'; 
$pass     = 'pass';  //$server   = '192.168.202.106';
$server   = '192.168.0.102'; //$server   = 'localhost';
$database = 'test';
$connectionInfo=array("UID"=>$user,"PWD"=>$pass,"Database"=>$database);


///PDO 
try {$link = new PDO ("sqlsrv:Server=$server;Database=$database","$user","$pass");}
catch (PDOException $e) { echo "Failed to get DB handle: " . $e->getMessage() . "\n"; exit;}
 
$videodir = '\\\\node1\videos'; //$videodir = realpath('..\\videos');
 
$ttf = "C\\\\:/ffmpeg/Comili-Book.otf"; //ток так пашет=);
$limit = 7;		// max - 10 files in process;
$ffmpeg = 'C:\ffmpeg\bin\ffmpeg.exe';//и так пашет и с \\ и с \\\\ =)));
$ffprobe = 'C:\ffmpeg\bin\ffprobe.exe';

 
 

function changeStatus($name, $status){// = > менять статусы ;
	return "UPDATE [dbo].[DeficiencyVideos] SET [Status] = $status WHERE FileName='$name'";
} 
////////////////////////////////////////////////// 
$checkStatus = "select SUM(status) inProccess,
 (select sum(case when status=0 then 1 else 0 end) FROM [dbo].[DeficiencyVideos] where status = 0) inQueue, 
 (select sum(case when status=2 then 1 else 0 end) FROM [dbo].[DeficiencyVideos] where status = 2) success,
 (select sum(case when status=3 then 1 else 0 end) FROM [dbo].[DeficiencyVideos] where status = 3) error 
 FROM [dbo].[DeficiencyVideos] where status = 1";

//while ($row = $stmt->fetch()) { print_r($row);} unset($link);unset($stmt);
 
$stmt = $link->prepare($checkStatus); // $stmt = sqlsrv_query( $link, $checkStatus); 
try{
	$stmt->execute();
	while($row = $stmt->fetch()){
	  $inProccess 	= $row['inProccess'];
	  $inQueue 		= $row['inQueue'];
	  $success 		= $row['success'];
	  $error 		= $row['error'];  
	};  
	 $inProccess=$inProccess==''?0:$inProccess;	echo "<b>inProccess => $inProccess ($limit)</b></br>";
	 $inQueue   =$inQueue	==''?0:$inQueue;	echo "<b>inQueue 	=> $inQueue</b></br>" ;
	 $success	=$success	==''?0:$success;	echo "<b>success 	=> $success</b></br>";
	 $error		=$error		==''?0:$error; 		echo "<b>error 		=> $error</b></br>";
} catch(Exception $e) {echo "[SQL read ERROR->$e]; "; die();}

if( $stmt === false ) { unset($link); unset($stmt); }
///////////////////////////////////////////// 
///////////////////////////////////////////// 
if($inQueue>0){//есть ли что-то в очереди
	if($inProccess<$limit){
		$parseList = "select filename FROM [dbo].[DeficiencyVideos] where status = 0   order by date desc";
		$stmt = $link->prepare($parseList); // $stmt = sqlsrv_query( $link, $parseList);
		try{ $stmt->execute(); while($row = $stmt->fetch()){$filename = $row['filename']; } ///выбираем последний файл!
		}catch(Exception $e){ echo "<br>[SQL READ ERROR->$e ]";}
		echo "<b>filename => $filename</b></br>";
	// меняем статус выбранного файла = > в процессе;
		$stmt = $link->prepare(changeStatus($filename, 1)); //$stmt = sqlsrv_query($link,changeStatus($filename, 1));
		try{$stmt->execute(); $stmt->fetch(); echo '<br>[SQL WRITE SUCCESS!]';}catch(Exception $e){ echo "<br>[SQL WRITE ERROR->$e ]";}
		//CONVERT HERE  		//CONVERT HERE  			
		//CONVERT HERE  		//CONVERT HERE
		$real = $videodir."\\real\\$filename"; 
		
		$name = explode('.', $filename)[0];
		$vid = $videodir."\\converted\\$name.mp4";
		$img = $videodir."\\img\\$name.jpg";
		$gif = $videodir."\\gif\\$name.gif";
		 echo $real ;
		
	 if(file_exists($real)){

	exec("$ffprobe -i $real -v quiet -print_format json -show_format -show_streams -hide_banner > temp_file", $output);
	$info = json_decode(file_get_contents("temp_file"));

	$duration 	 = $info->format	->duration;
	$size  		 = round($info->format	->size/ 1000 / 1000,2);
	$width       = $info->streams[0]->width;
	$height		 = $info->streams[0]->height;
	$ratio 		 = $info->streams[0]->display_aspect_ratio;
	$video_codec = $info->streams[0]->codec_name;
	$audio_codec = $info->streams[1]->codec_name;
	$rate 		 = $info->streams[1]->sample_rate;
	echo "Video duration: 			$duration 	<br>";
	echo "Video size: 				$size 		<br>";
	echo "Video resolution width: 	$width		<br>";
	echo "Video resolution height: 	$height		<br>";
	echo "Video aspect ratio: 		$ratio		<br>";
	echo "Video codec: 				$video_codec<br>";
	echo "Audio codec: 				$audio_codec<br>";
	echo "Audio sample rate:		$rate 		<br>";
	 
	//GENERATE thumbnail JPG & GIF PREVIEW & CONVERT VIDEO! ::
	$anim_start = 0; $anim_fps = 5;
		if ($duration  <= 2) 					  {$anim_duration = 1; }
	elseif(($duration  >  2)  && ($duration<=5))  {$anim_duration = 2; }
	elseif(($duration  >  5)  && ($duration<=12)) {$anim_duration = 5; $anim_start = 1; }
	elseif(($duration  >  12) && ($duration<=30)) {$anim_duration = 12;$anim_start = 2; }
	elseif(($duration  >  30) && ($duration<=60)) {$anim_duration = 15;$anim_start = 8; }
	elseif(($duration  >  60)) 					  {$anim_duration = 15;$anim_start = 13;}
  
		$cmd_pic = "$ffmpeg -v warning -y -i $real -pix_fmt yuvj422p -deinterlace -an -ss $anim_start -f mjpeg -t 1 -r 1 -y -s 200x200 -y $img	2>&1";
		
		$cmd_gif = "$ffmpeg -v warning -y -ss $anim_start -t $anim_duration -i $real -vf fps=$anim_fps,scale=300:-1:sws_dither=ed -gifflags -transdiff -y $gif	2>&1";
		
		$cmd_vid = "$ffmpeg -v warning -y -i $real -vf drawtext=\"fontfile=$ttf: text='apcis.tmou.org': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.4: x=w-tw:y=h-th\" -c:v libx264 -crf 18 -y $vid	2>&1";
		  
 //GIF + LOGs params: 
 //exec('ffmpeg -v -y -ss 2 -t 15 -i C:\inetpub\wwwroot\videos\real\0AA01031-2F73-9206-C77D-8A511BB59886.mov -vf fps=5,scale=300:-1:sws_dither=ed -gifflags -transdiff -y C:\inetpub\wwwroot\videos\gif\0AA01031-2F73-9206-C77D-8A511BB59886.gif');
 
/*  VIDEO CONV WORKS!
	ffmpeg -v warning -y -i C:\inetpub\wwwroot\videos\real\823AFF2D-B606-34C7-AD40-B9D8D30BAAE9.mpg -vf drawtext="fontfile=C\\:/inetpub/wwwroot/videos/Comili-Book.otf: text='apcis.tmou.org': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.4: x=w-tw:y=h-th" -c:v libx264 -crf 18 -y C:\inetpub\wwwroot\videos\converted\823AFF2D-B606-34C7-AD40-B9D8D30BAAE9.mp4*/
	
		echo "<hr/>cmd_pic => $cmd_pic ->";exec($cmd_pic, $output, $value); print_r($output); print_r($value);
		echo "<hr/>cmd_gif => $cmd_gif ->";exec($cmd_gif, $output, $value); print_r($output); print_r($value);	
		echo "<hr/>cmd_vid => $cmd_vid ->";exec($cmd_vid, $output, $value); print_r($output); print_r($value);	
		echo "<br/>vid => <b>$vid</b>";
	 
		//CONVERT HERE !
		//CONVERT HERE !
		//меняем статус выбранного файла = > УСПЕШНО!!+++!;
		$stmt = $link->prepare(changeStatus($filename, 2)); //$stmt = sqlsrv_query($link,changeStatus($filename, 2));
			try{$stmt->execute(); $stmt->fetch(); echo '<br>[SQL WRITE SUCCESS!]';}catch(Exception $e){ echo "<br>[SQL WRITE ERROR->$e ]";}
		} else {
			echo '=>>>>>>>>>>>>>>old file not exist!'; 
			$stmt = $link->prepare(changeStatus($filename, 3)); //$stmt = sqlsrv_query($link,changeStatus($filename, 3)); //меняем статус выбранного файла = > ОШИБКА!!!+++!;
			try{$stmt->execute(); $stmt->fetch(); echo '<br>[SQL WRITE SUCCESS!]';}catch(Exception $e){ echo "<br>[SQL WRITE ERROR->$e ]";}
		}
	 echo "<br/> => Old File exist? -->" . file_exists($real);
	 echo "<br/> => New File exist? -->" . file_exists($vid);
	 if(file_exists($vid)<1){
		 echo '<br/>=>> NEW FILE NOT EXIST! ! ! ! ';
			$stmt = $link->prepare(changeStatus($filename, 3));
			try{$stmt->execute(); $stmt->fetch(); echo '<br>[SQL WRITE SUCCESS!]';}catch(Exception $e){ echo "<br>[SQL WRITE ERROR->$e ]";}
	 }
	}else{echo 'Processes is over than limit!!';} 
}else{echo '<br/>Queue is empty!';}
 
  
?>