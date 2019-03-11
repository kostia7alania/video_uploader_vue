<?php
ini_set('upload_max_filesize',  '2000M');
ini_set('post_max_size',        '2000M');
/*  file_uploads
    upload_max_filesize
    max_input_time
    memory_limit
    max_execution_time
    post_max_size
*/


header('Access-Control-Allow-Origin: *');//KOSTIA_ TEST_API
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))//may also be using PUT, PATCH, HEAD etc
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  exit(0);
}

if(!isset($_GET['action'])) {/*http_response_code(500);*/exit('{status: 0, msg: "Wrong action"}');}
require('./soap.php');
$action = $_GET['action'];
//$videodir = "\\\\media\videos\converted\2FD3D68C-B4DD-416B-A431-10189EC24887.mp4";
///echo file_get_contents($videodir, 'r'); echo is_writeable($videodir ).'<hr>'.exec('whoami'); 
//var_dump(file_get_contents($newPath, 'r'));die; //echo ini_get('post_max_size');
//echo getmypid();die; //prevent log.errors //exec('kill -9 ' . getmypid());

$newPath = 'c:\\test\\';//"\\\\media\\videos\\real/"; 
$outjson;
$maxSize = 2000000000;
$maxCommentLen = 3000;

$allowedFormats = ['mpg','mov','flv','mp4','avi','qt','wmv','3gp','mpeg'];

if ($action == 'savevid') {
  if ( !isset($_GET['def_uid']) || !isset($_GET['insp_uid']) ) {     echo '{"status":0, "msg":"! Try to relogin"}'; die; }
  if ( !isset($_FILES['file']) || $_FILES['file']['error'] === 1 ) {
    echo '{"status":0, "msg":"File is corrupt"}';
    die;
  }
    $file     = $_FILES['file'];
    $hash     = $_POST['hash'];
    $comment  = $_POST['comment'];
    //print_r($file); die;//Array ( [name] => 5.flv [type] => video/x-flv [tmp_name] => C:\Users\dev\AppData\Local\Temp\phpACAE.tmp [error] => 0 [size] => 1904323 )
    //print_r($file) ;die;   // Array ( [name] => 3.avi [type] => [tmp_name] => [error] => 1 [size] => 0 )
    if($file['size'] > $maxSize) { echo '{"status":0, "msg":"File size exceeded"}'; die; }
    $name = $file['name'];
    $ext = pathinfo($name, PATHINFO_EXTENSION);
    if( !in_array(strtolower($ext), $allowedFormats) ) { echo '{"status":0, "msg":"Unsupported file type"}'; die; }
    $extension = explode('.', $name);
    $extension = end($extension);

		$tmp = $file['tmp_name']; // File in the PHP tmp folder => C:\Users\dev\AppData\Local\Temp\phpBFDC.tmp
    $uid = str_replace ([ "{",  "}"  ], "", getGUID()); 
    $full_new_path = $newPath.$uid.'.'.$extension; 
    if(strlen($hash) !== 40) $hash = ''; //hash must be 40 digits
			$comment = trim($comment);  
			$comment = str_replace('\\', '', $comment); //$comment = addslashes($comment);$comment = strip_tags($comment);//$comment = stripslashes($comment);
			$comment = htmlentities($comment, ENT_QUOTES, "UTF-8"); 
			$comment = htmlspecialchars($comment, ENT_QUOTES);
    if ( strlen ( $comment ) > $maxCommentLen ) { $comment = mb_substr ( $comment, 0, $maxCommentLen, 'UTF-8' ); }
      $moved = move_uploaded_file($tmp, $full_new_path);
      if ( !$moved ) { echo '{"status":0, "msg":"An error occurred while moving the file to the file storage."}'; die; }
      if ( !file_exists($full_new_path) ) { echo '{"status": 0, "msg": "An error occurred after moving the file to the file storage."}'; die; }
        $request =
        'DefUID="'    .$_GET['def_uid'].'"'
        .' InspUID="' .$_GET['insp_uid'].'"'
        .' Comment="' .$comment.'"'
        .' UID="'     .$uid.'"'
        .' OrigFileName="'.$name.'"'
        .' Hash="'    .$hash.'"'
        .' FileExt=".'.$extension.'"';
        $res = $soap_service->NewDefVideo( ['Request'=>"<Video $request />"] );
        $xml = $res->NewDefVideoResult->any;
        $xml = simplexml_load_string($xml);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE); 
        if(!isset($array['@attributes']['OrigFileName'])) { echo '{"status":0, "msg":"An error occurred while write to data base"}'; die; }

        $output = [ "status"=>1, 
                    "msg"   =>"Successfully uploaded",
                    "Hash"=>$array['@attributes']['Hash'],
                    "OrigFileName"=>$array['@attributes']['OrigFileName'],
                    "VidUID"=>$array['@attributes']['VidUID'],
                  ];
        echo json_encode($output);
        die;
}
 



  if ($action == 'viewvideo'){  //=>VIDEOOOOOOOOOOOO!
    $xsl->load('./view_videos.xsl');
    if (isset($_GET['def_uid'])) {
          $request = 'DefUID="'.$_GET['def_uid'].'"'
                   .' InspUID="'.$_GET['insp_uid'].'"'
                   .' AddVid="'.$_GET['add_vid'].'"';
          $res = $soap_service->GetViewVideos( ['Request'=>"<Videos $request />"] );
        } else { echo 'Please, authorize!'; die; }
          $xml->loadXML( $res->GetViewVideosResult->any );  //  include_once ('videos.php');
}

//BREAK !!!!!!!!!!!!!

if ($action == 'viewvideojson') {

        if ( !isset($_GET['def_uid']) || !isset($_GET['insp_uid']) ) {
          echo '{status: 0, msg: "An error has occurred! Try refresh your browser!"}';
          die;
        }

          $request = 'DefUID="'.$_GET['def_uid'].'"'
                   .' InspUID="'.$_GET['insp_uid'].'"'
                   .' AddVid="'.$_GET['add_vid'].'"';
          $res = $soap_service->GetViewVideos( ['Request'=>"<Videos $request />"] );
        $xml = $res->GetViewVideosResult->any;
        $xml = simplexml_load_string($xml);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE); 
        $arr=[];
        if (isset($array['File']) && count($array['File']) === 1) $arr[] = $array['File']['@attributes'];
        elseif (isset($array['File']) && count($array['File'])>0) foreach($array['File'] as $k => $r) $arr[] = $r['@attributes'];
        echo json_encode($arr); 
        die;		
}  



function getGUID(){
  if (function_exists('com_create_guid')){return com_create_guid();}
  else {
      mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
      $charid = strtoupper(md5(uniqid(rand(), true)));
      $hyphen = chr(45);// "-"
      $uuid = chr(123)// "{"
          .substr($charid, 0, 8).$hyphen
          .substr($charid, 8, 4).$hyphen
          .substr($charid,12, 4).$hyphen
          .substr($charid,16, 4).$hyphen
          .substr($charid,20,12)
          .chr(125);// "}"
      return $uuid;
  }
}

?>



