<?php
/* //PROD ::: INDEX.PHP ::: =>
if ( in_array( $_GET['action'],['viewvideo', 'savevid', 'watch','get-uploaded-video-list','abusingFile'] ) )  {
	header('Access-Control-Allow-Origin: *');//KOSTIA_ TEST_API
	require(__DIR__.'./video-hosting/backend/index.php');;
	die;
}
*/
if (!isset($_SESSION)) session_start();
if($_GET['action']=='viewvideo') die(file_get_contents(__DIR__ .'/../frontend/dist/index.html'));

require __DIR__.'/../../../vendor/autoload.php';//'/../../vendor/autoload.php';
require(__DIR__.'./video-config.php');

$action = $_GET['action'];

/*
if($action == 'ffmpeg') {
  $file  = 'C:\Users\dev\Downloads\Fifa_Fan_Dance_in_da_Red_Square_2018_____.mp4';
  $ffprobe = \FFMpeg\FFProbe::create(libs);
  $isValid = $ffprobe->isValid($file); // returns bool
  echo $isValid."=";
  //$ffprobe = \FFMpeg\FFProbe::create(libs);
  $duration = $ffprobe
    ->format($file) // extracts file informations
    ->get('duration');  // returns the duration property
  echo $duration;
  die;
}
*/

if ( $action == 'get-config' ) {
    $res = $soap_service->GetIsUserObserver(['Request' => 0]);
    $xml = $res->GetIsUserObserverResult->any;
    $xml = simplexml_load_string($xml);
    $json = json_encode($xml);
    $is_observer = json_decode($json,TRUE)['Observer'];  
    $CAN_UPLOAD = !$is_observer ? 1:0;
    $BASE_URL = './api?api=video-manager&';
    $config = [
        'locale'                => vid_cfg['locale'],
        'title'                 => vid_cfg['title'],
        'CAN_UPLOAD'            => $CAN_UPLOAD,
        'BASE_URL'              => $BASE_URL,
        'watch_url'             => $BASE_URL . 'action=watch&dir=watch&v=',
        'gif_url'               => $BASE_URL . 'action=watch&dir=gif&v=',
        'webp_url'              => $BASE_URL . 'action=watch&dir=webp&v=',
        'img_url'               => $BASE_URL . 'action=watch&dir=img&v=',
        'video_brand_img_title' => '',
        'video_brand_click_msg' => 'Brand click', //Введи сюда Brand click - чтобы взяло значение из перевода , если не будет перевода, то выведет как есть;
        'video_brand_img_src'   => '', //ссылка на значек в плеере
        'show_menu'             => false,
        'maxSize'               => vid_cfg['maxSize'], // мегабайты - - размер видео.
        'maxDuration'           => vid_cfg['maxDuration'] // минуты  - - длительность видео. 
    ];
    die(json_encode($config));
}

if ( $action == 'watch' ) {
  if(!isset($_GET['v']) || !isset($_GET['dir']) ) echo_and_die (0, 'Wrong URL parameters', 500);
    $v = $_GET['v']; // filename
    $dir = $_GET['dir'];
    $status = $_GET['status'];// status > 2-значит готово и надо искать в папке CONVERTED
    ob_clean();

    if($dir=='gif') {
      if( $status == 2) $gif = vid_cfg['gifDir'] . $v;
      else              $gif = vid_cfg['tmp_gif_src'];
      $imginfo = getimagesize($gif);
      header("Content-type: {$imginfo['mime']}");
      readfile($gif);
      die;
    }
    if($dir=='webp') {
      if( $status == 2) $gif = vid_cfg['webpDir'] . $v;
      $imginfo = getimagesize($gif);
      header("Content-type: image/webp");
      readfile($gif);
      die;
    }
    if($dir=='img') {
      if( $status == 2) $gif = vid_cfg['imgDir'] . $v;
      $imginfo = getimagesize($gif);
      header("Content-type: {$imginfo['mime']}");
      readfile($gif);
      die;
    }

  if($dir=='watch') {
    require(__DIR__.'./libs/VideoStream.php');
    if ($status==2) $videoDir = vid_cfg['convertedDir'];
    else            $videoDir = vid_cfg['realDir'];
    $stream = new \Sources\VideoStream($videoDir.$v); // $stream = new \Sources\VideoStream('c://PHP PARSER 2019-02-25_19-03-14.mp4'); //test
    $stream->start();
  }
}
  
//$videodir = "\\\\media\videos\converted\2FD3D68C-B4DD-416B-A431-10189EC24887.mp4";
///echo file_get_contents($videodir, 'r'); echo is_writeable($videodir ).'<hr>'.exec('whoami');
//var_dump(file_get_contents($newPath, 'r'));die; //echo ini_get('post_max_size');
//echo getmypid();die; //prevent log.errors //exec('kill -9 ' . getmypid());
$newPath       = vid_cfg['newPath'];       //'c:\\test\\';//"\\\\media\\videos\\real/";
$maxSize       = vid_cfg['maxSize'];       //2000000000;
$maxCommentLen = vid_cfg['maxCommentLen']; //3000
$allowedFormats= vid_cfg['allowedFormats'];//['mpg','mov','flv','mp4','avi','qt','wmv','3gp','mpeg'];

if ($action == 'abusingFile') {
  $post = fopen('php://input', 'r');
  $data = json_decode(stream_get_contents($post));
  fclose($post);
  if ( !isset($_GET['VidUID']) || strlen($_GET['VidUID'])>55 || !isset($data->comment) || strlen($data->comment) > $maxCommentLen ) 
    echo_and_die (0, 'Wrong request! Report isn\'t saved!', 500);
  $comment = toEscapeString($data->comment);
  $request =
    'VidUID="' .$_GET['VidUID'].  '"'
  .' Comment="'.$comment.         '"'
  .' Browser="'.browserParse().   '"';
  $res = $soap_service->NewDefVideoReport( ['Request'=>"<Video $request />"] );
  $xml = $res->NewDefVideoReportResult->any;
  $xml = simplexml_load_string($xml);
  $json = json_encode($xml);
  $array = json_decode($json, TRUE);
  if($array) echo_and_die (1, ' Success', 200);
  echo_and_die (0, 'Failed!', 500);
}
if ($action == 'savevid') {
  if ( !isset($_GET['def_uid']) || !isset($_GET['insp_uid']) ) echo_and_die (0, ' Try to relogin', 500);
  if ( !isset($_FILES['file']) || $_FILES['file']['error'] === 1 || !file_exists($_FILES['file']['tmp_name']) ) echo_and_die (0, 'File is corrupt', 500);
    
    $file     = $_FILES['file'];    //[ name=>'', tmp_name=>'', size=>'' ]; //$lastModified = $_POST['lastModified'];
    $file_name = $file['name'];     //[name] => 20180715_200045.mp4
    $tmp_name = $file['tmp_name'];  //[tmp_name] => C:\Users\dev\AppData\Local\Temp\php2664.tmp
    $file_size = $file['size'];     //[size] => 7887277
    //$file_time =  date ("Y-m-d H:i:s", date($lastModified)); //валидная дата; new DAte распознает норм(js)
    $hash     = $_POST['hash'];
    $comment  = toEscapeString ( $_POST['comment'] );
    $info     = htmlspecialchars ( $_POST['info']    );
    //print_r($file); die;//Array ( [name] => 5.flv [type] => video/x-flv [tmp_name] => C:\Users\dev\AppData\Local\Temp\phpACAE.tmp [error] => 0 [size] => 1904323 )
    //print_r($file) ;die;   // Array ( [name] => 3.avi [type] => [tmp_name] => [error] => 1 [size] => 0 ) // ??BUG??
    if($file['size'] > $maxSize) echo_and_die (0, 'File size exceeded!', 500);
    $name = $file['name'];
    $ext = pathinfo($name, PATHINFO_EXTENSION);
    if( !in_array(strtolower($ext), $allowedFormats) ) echo_and_die (0, 'Unsupported file type!', 500);
    $extension = explode('.', $name);
    $extension = end($extension);
  /*
      [name] => 20180715_200045.mp4
      [type] => video/mp4
      [tmp_name] => C:\Users\dev\AppData\Local\Temp\php2664.tmp
      [error] => 0
      [size] => 7887277
  */
    $uid = str_replace ([ "{",  "}"  ], "", getGUID());
    $full_new_path = $newPath.$uid.'.'.$extension;
    if(strlen($hash) !== 40) $hash = ''; //hash must be 40 digits
    if ( strlen ( $comment ) > $maxCommentLen ) { $comment = mb_substr ( $comment, 0, $maxCommentLen, 'UTF-8' ); }

    /* IS VALID */
    $ffprobe = \FFMpeg\FFProbe::create(libs);
    if(!$ffprobe->isValid($tmp_name)) echo_and_die (0, 'The file is not valid!', 500);

    /* DURATION */
    $duration = $ffprobe
      ->format($tmp_name) // extracts file informations
      ->get('duration');  // returns the duration property
    $duration = round($duration);

    /* MOVE */
    $moved = move_uploaded_file($tmp_name, $full_new_path);
    //  touch($full_new_path, $file_time);//возвращаем старые даты изменения))
      if ( !$moved ) echo_and_die (0, 'An error occurred while moving the file to the file storage!', 500);
      if ( !file_exists($full_new_path) ) echo_and_die (0, 'An error occurred after moving the file to the file storage!', 500);

      $request =
        'DefUID="'        .$_GET['def_uid'].  '"'
        .' InspUID="'     .$_GET['insp_uid']. '"'
        .' Comment="'     .$comment.          '"'
        .' Info="'        .$info.             '"'
        .' UID="'         .$uid.              '"'
        .' OrigFileName="'.$name.             '"'
        .' Hash="'        .$hash.             '"'
        .' Duration="'    .$duration.         '"'
        .' Browser="'     .browserParse().    '"';
        $res = $soap_service->NewDefVideo( ['Request'=>"<Video $request />"] );
        $xml = $res->NewDefVideoResult->any;
        $xml = simplexml_load_string($xml);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);
        if(!isset($array['@attributes']['OrigFileName'])) echo_and_die (0, 'An error occurred while write to data base!', 500); 

        header_status(201);
        echo json_decode([ "stat"=>1,
                    "msg"   =>"Successfully uploaded",
                    "Hash"=>$array['@attributes']['Hash'],
                    "OrigFileName"=>$array['@attributes']['OrigFileName'],
                    "VidUID"=>$array['@attributes']['VidUID'],
                    "Duration"=>$duration,
                  ]);
        die;
  }

//BREAK !!!!!!!!!!!!!

if ($action == 'get-uploaded-video-list') {
        if ( !isset($_GET['def_uid']) || !isset($_GET['insp_uid']) ) echo_and_die (0, 'An error has occurred! Try refresh your browser!', 500);
       
          $request = 'DefUID="'.$_GET['def_uid'].'"'
                   .' InspUID="'.$_GET['insp_uid'].'"'
                   .' AddVid="0"';
        $res = $soap_service->GetViewVideos( ['Request'=>"<Videos $request />"] );
        $xml = $res->GetViewVideosResult->any;
        $xml = simplexml_load_string($xml);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);
        $arr=[];
        if (isset($array['File']) && count($array['File']) === 1) $arr[] = $array['File']['@attributes'];
        elseif (isset($array['File']) && count($array['File'])>0) foreach($array['File'] as $k => $r) $arr[] = $r['@attributes'];
        exit(json_encode($arr));
        
}
?> 