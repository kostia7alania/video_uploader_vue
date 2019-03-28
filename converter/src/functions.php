<?php 
$n = '<br>\n';
//PDO  
try {$link = new PDO ('sqlsrv:Server='.vid_cfg['SQL_server'].';Database='.vid_cfg['SQL_database'],vid_cfg['SQL_user'],vid_cfg['SQL_pass']);} catch (PDOException $e) { echo '{status: 0, msg: "Failed to get DB handle: "'.$e->getMessage()."} "; exit;}

/*****************/

function checkStatus() {
  global $link;
  global $n;
  $limit = vid_cfg['limit'];

  /*  $check_status_SQL = "SELECT SUM(status) inProccess, -- << === КОГДА Status - INT 
    (SELECT SUM(CASE WHEN status=0 THEN 1 ELSE 0 END) FROM [dbo].[DeficiencyVideos] WHERE status=0) inQueue, 
    (SELECT SUM(CASE WHEN status=2 THEN 1 ELSE 0 END) FROM [dbo].[DeficiencyVideos] WHERE status=2) success,
    (SELECT SUM(CASE WHEN status=3 THEN 1 ELSE 0 END) FROM [dbo].[DeficiencyVideos] WHERE status=3) error 
  FROM [dbo].[DeficiencyVideos]
  WHERE status=1"; */
  
  $check_status_SQL = "SELECT SUM(CASE WHEN CAST(Status AS VARCHAR(50))='1' THEN 1 ELSE 0 END) inProccess, 
  (SELECT SUM(CASE WHEN CAST(Status AS VARCHAR(50))='0' THEN 1 ELSE 0 END) FROM [dbo].[DeficiencyVideos] WHERE CAST(Status AS VARCHAR(50))='0') inQueue, 
  (SELECT SUM(CASE WHEN CAST(Status AS VARCHAR(50))='2' THEN 1 ELSE 0 END) FROM [dbo].[DeficiencyVideos] WHERE CAST(Status AS VARCHAR(50))='2') success, 
  (SELECT SUM(CASE WHEN CAST(Status AS VARCHAR(50))='3' THEN 1 ELSE 0 END) FROM [dbo].[DeficiencyVideos] WHERE CAST(Status AS VARCHAR(50))='3') error 
  FROM [dbo].[DeficiencyVideos] WHERE CAST(Status AS VARCHAR(50))='1'";

  $stmt = $link->prepare($check_status_SQL); //$stmt = sqlsrv_query($link, $checkStatus); 
  try {
   $stmt->execute(); 
   while ($row = $stmt->fetch()) {
     $inProccess 	= $row['inProccess'];
     $inQueue 		= $row['inQueue'];
     $success 		= $row['success'];
     $error 	  	= $row['error'];  
   };
   $inProccess=$inProccess==''?0:$inProccess;	
   $inQueue   =$inQueue	  ==''?0:$inQueue;	
   $success	  =$success	  ==''?0:$success;
   $error		  =$error		  ==''?0:$error;
   if(vid_cfg['display_logs']) echo "<hr> 
    <b>=> checkStatus():</b> $n
    inProccess=>$inProccess ($limit), $n
    inQueue=>$inQueue,                $n
    success=>$success,                $n
    error=>$error;
   <hr>";
 } catch(Exception $e) {echo "[SQL read ERROR->$e ]; "; die();}
 return [ "inProccess"=>$inProccess, "inQueue"=>$inQueue, "success"=>$success, "error"=>$error ];
}

/*****************/

function getDuration($real) {
  global $n;
  $ffprobe = libs['ffprobe.binaries'];
  $req = "$ffprobe -i $real -v quiet -print_format json -show_format -show_streams -hide_banner > ffprobe_last_video_info.txt";
  exec($req, $output);
  $info = json_decode(file_get_contents("ffprobe_last_video_info.txt"));
  $duration 	 = $info->format->duration;
  if(vid_cfg['display_logs']) {
    $size  		 = round($info->format	->size/ 1000 / 1000, 2);
    $width       = $info->streams[0]->width;
    $height		 = $info->streams[0]->height;
    $ratio 		 = $info->streams[0]->display_aspect_ratio;
    $video_codec = $info->streams[0]->codec_name;
    $audio_codec = $info->streams[1]->codec_name;
    $rate 		 = $info->streams[1]->sample_rate;
    echo "
*********
ffprobe OUTPUT=>".var_dump($output).";  $n
          size        > $size;        $n
          width       > $width;       $n
          height      > $height;      $n
          ratio       > $ratio;       $n
          video_codec > $video_codec; $n
          audio_codec > $audio_codec; $n
          rate        > $rate;        $n
*********
";
  }
  return $duration;
}



function changeStatus_SQL($name, $status) {// = > менять статусы ;
	return "UPDATE [dbo].[DeficiencyVideos] SET [Status]=$status WHERE VidUID=LEFT('$name',36)";
}

/************/
function isExist($path, $name) {
  global $n;
  if( !file_exists($path) ) {
   if(vid_cfg['display_logs']) echo "[=>>isExist(path,name)=>FILE NOT EXIST!!!$n
   name=>$name; $n 
   path=>$path; 
    ]";
   return false;
  }
  return true;
}
/*************/

function ttf_detect($v) { 
  if( isset($v['ttf_AbsPath']) && !empty($v['ttf_AbsPath']) ) { 
    $ttf_path =  $v['ttf_AbsPath'];
  } elseif(isset($v['ttf_RelPath']) && !empty($v['ttf_RelPath']) && file_exists($v['ttf_RelPath']) ) { 
    $real = realpath($v['ttf_RelPath']);
    $drive = substr($real, 0, 1);
    $winToLinuxPath = str_replace( '\\','/',    $real );
    $ttf_path = str_replace( "$drive:/", "$drive\\\\:/", $winToLinuxPath );//<=$linuxToFFMPEG_path=));
  } else {
    echo '[>ttf path undefined<]';
    $ttf_path = '';
  }
  return $ttf_path;
}
 

function get_next_task_filename() {
  global $link;
  $parseListSQL = "
    SELECT TOP (1)
      CAST([VidUID] AS VARCHAR(50)) + REVERSE(LEFT(REVERSE([OrigFileName]),
      CHARINDEX('.',REVERSE([OrigFileName])))) AS RealFileName
    FROM [dbo].[DeficiencyVideos]
    WHERE status = 0
    ORDER BY date ASC ";//<--конвертим по очереди;
  $stmt = $link->prepare($parseListSQL);
  $filename = false;
  try {
    $stmt->execute();
    $row = $stmt->fetch();
    if($row) $filename = $row['RealFileName'];
  } catch(Exception $e){ echo "[SQL select ERROR->$e ]; "; die();}
  return $filename;
}



function getAnimParams($duration) {
  $anim_start = 0; 
    if ($duration  <= 2) 					  {$anim_duration = 1; }
  elseif(($duration  >  2)  && ($duration<=5))  {$anim_duration = 2; }
  elseif(($duration  >  5)  && ($duration<=12)) {$anim_duration = 5; $anim_start = 1; }
  elseif(($duration  >  12) && ($duration<=30)) {$anim_duration = 12;$anim_start = 2; }
  elseif(($duration  >  30) && ($duration<=60)) {$anim_duration = 15;$anim_start = 8; }
  elseif(($duration  >  60)) 					  {$anim_duration = 15;$anim_start = 13;} 
  return [$anim_start,$anim_duration];
};



function goExec($cmd, $name) {
  global $n;
  exec ( $cmd, $out1, $out2 );
  if(vid_cfg['display_logs']) echo "
<b>goExec():</b>   $n
name=> $name  $n
****=== CMD ==>********
$cmd
**************
$n
out1=>".var_dump($out1).";    $n
out2=>$out2;
";
}



function changeStatus ($filename, $status) {
  global $link;
  if( vid_cfg['SQL_canwrite'] == false ) return '=>SQL in readonly mode;';
  $stmt = $link->prepare(changeStatus_SQL($filename, $status));
  try {
    $stmt->execute(); $stmt->fetch();
  } catch(Exception $e){ echo "[changeStatus($filename, $status) -> SQL ERROR-> $e ]"; die();}
}


/*
function PROTOTYPEconvertVideoWithDisplayingPercentage () { // DEPRECATED пока что. флаг FASTSTART надо прикостылить, тогда можно заюзать!
  require 'vendor/autoload.php'; //=> composer require php-ffmpeg/php-ffmpeg
  $_360p = (new FFMpeg\Format\Video\X264('libmp3lame'))->setKiloBitrate(500);// Create the formats in Kilo Bitrates
  $_480p = (new FFMpeg\Format\Video\X264('libmp3lame'))->setKiloBitrate(750);
  $_720p = (new FFMpeg\Format\Video\X264('libmp3lame'))->setKiloBitrate(1500); 
  $format_aac = new FFMpeg\Format\Video\X264('aac');
  $ffmpeg = FFMpeg\FFMpeg::create(libs);
  $video = $ffmpeg->open('C:/Users/dev/Videos/video/Без учителей заговорил на АНГЛИЙСКОМ! Это невероятно!.mp4');
  $_360p->on('progress', function ($video, $format, $percentage) {
    $s = '{"percent":'.$percentage.',"date": "'.((new \DateTime())->format('Y-m-d H:i:s')).'"}';
    echo $s.'\n<br>';
    changePercent($s);
  });
  $video->save($_360p, 'video.mp4');
}

function changePercent($e) {
  global $link;
  $stmt = $link->prepare("UPDATE [dbo].[DeficiencyVideos] SET [Status]='$e' WHERE VidUID='9CB35D03-79A0-4EE3-8572-0A27DEEE7999'" );
  try {
    $stmt->execute(); $stmt->fetch();
  } catch(Exception $e){ echo "[changeStatus($filename, $status) -> SQL ERROR-> $e ]"; die();}

} 
*/



?>

