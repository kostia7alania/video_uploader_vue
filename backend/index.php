<?php
header('Access-Control-Allow-Origin: *');//KOSTIA_ TEST_API
require('./soap.php');
$action = $_GET['action'];
//$videodir = "\\\\media\videos\converted\2FD3D68C-B4DD-416B-A431-10189EC24887.mp4";
///echo file_get_contents($videodir, 'r'); echo is_writeable($videodir ).'<hr>'.exec('whoami'); 
//var_dump(file_get_contents($newPath, 'r'));die;

$newPath = "\\\\media\\videos\\real/";
 
$allowed = ['mpg','mov','flv','mp4','avi','qt','wmv','3gp','mpeg'];
if ($action == 'savevid') {
  $outjson = '['; 
  for ($i=0; $i<count($_FILES); $i++) {
    if (strlen($outjson) != 1) { $outjson .= ','; };
    if (isset($_FILES['file_' . $i]) && $_FILES['file_' . $i]['error'] == 0) {
		//echo '=============================================cycle=============================================<br/>\n\r\t';
		$name = $_FILES['file_'.$i]['name'];
		$extension = explode('.', $name); $extension = end($extension);
		$type = $_FILES['file_'.$i]['type'];
		$size = round($_FILES['file_'.$i]['size'] / 1024 / 1024);
		$uid = str_replace (array("{", "}"), "", getGUID()); 
		$tmp = $_FILES['file_'.$i]['tmp_name']; // File in the PHP tmp folder
		$full_new_path =$newPath.$uid.'.'.$extension;
    if (empty($_POST['comment_'.$i])) {$comment = "-";} 
    else {
			$comment = trim($_POST['comment_'.$i]);  
			$comment = str_replace('\\', '', $comment); //$comment = addslashes($comment);$comment = strip_tags($comment);//$comment = stripslashes($comment);
			$comment = htmlentities($comment, ENT_QUOTES, "UTF-8"); 
			$comment = htmlspecialchars($comment, ENT_QUOTES);	
			if ( strlen($comment) > 1500 ){ $comment = mb_substr($comment,0,3000,'UTF-8');} // $comment = substr($comment, 0, 3000);
		}
		$extension = pathinfo($name, PATHINFO_EXTENSION);
		if (!in_array(strtolower($extension), $allowed)) { $outjson .= '{"success":0, "fail":1, "message": "Format Not Supported", "name": "'.$name.'", "size": "'.$size.'", "format": "'.$type.'"}'; }
	else {
			if(!($size<1000)) {	// !< 1GB ? 
				$outjson .= '{"success":0, "fail":1, "message": "Size of file is exceeded", "name": "'.$name.'", "size": "'.$size.'", "format": "'.$type.'"}';}
		  else { 		/*..TEST DATA:*/ //echo "Video uploaded successively! for $_FILES['file_'.$i]['name']</h2> !<br>;  <b>Name:</b> $name<br>   <b>Comment:</b> $comment<br>    <b>Size</b>: $size MBytes<br>    <b>Type</b>: $type <br>  <b>Stored in</b>: $full_new_path<br>";
        $moved = move_uploaded_file($tmp, $full_new_path);
        if (!$moved) {
          var_dump($moved);die; 
          $outjson .= '{"success":0, "fail":1, "message": "function move_uploaded_file failed", "name": "'.$name.'", "size": "'.$size.'", "format": "'.$type.'"}';}
        else { 
          if (!file_exists($full_new_path)) { $outjson .= '{"success":0, "fail":1, "message": "File not found on our server", "name": "'.$name.'", "size": "'.$size.'", "format": "'.$type.'"}';}
          else { //successively move_uploaded_file! 	//shell_exec("ffmpeg -f mp4 -i '$fileNewLoc' 'sex.mp4'"); $conn->query("INSERT INTO [dbo].[videos] VALUES('$name','$uid.$extension','descript!')");
						$request =
						 'DefUID="'  .$_POST['def_uid'].'"'
						.' InspUID="'.$_POST['insp_uid'].'"'
						.' Comment="'.$comment.'"'
						.' UID="'    .$uid.'"'
						.' FileExt=".'.$extension.'"';
						$res = $soap_service->NewDefVideo( array('Request'=>"<Video $request />") );
						$outjson .= '{"success":1, "fail":0, "message": "Successfully uploaded!", "name": "'.$name.'", "size": "'.$size.'", "format": "'.$type.'"}';
					}
				}
			}
		}
	} else { $outjson .= '{"success":0, "fail":1, "message": "The file was uploaded with some errors", "name": "'.$name.'", "size": "'.$size.'", "format": "'.$type.'"}';		 }
}
  echo json_encode($outjson.']');
	if($_GET['break']==1) {die();} 	//prevent log.errors //exec('kill -9 ' . getmypid());
  if (preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false)) {//if IE!
          $_GET['action']   = 'viewvideo';
          $_GET['def_uid']  = $_POST['def_uid'];
          $_GET['insp_uid'] = $_POST['insp_uid'];
          $_GET['add_vid']  = 1;
  }
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
?>