<?php
require_once('./Config.php');
define(Url_Soap_V, $UrlSoap);
define(authName, $_SESSION['AuthUserName']);
define(authPass, $_SESSION['AuthPassword']);
const path = '\\\\media\\fsc_videos\\'; //'X:\\';//\\\\media\\fsc_videos

const vid_cfg = [
  'AuthUserName'  => authName,
  'AuthPassword'  => authPass,
  'soapServer'    => Url_Soap_V, //'/TEST.asmx',
  'newPath'       => 'c://test//', //"\\\\media\\videos\\real/";
  'maxSize'       => 2000000000,
  'maxCommentLen' => 3000,
  'allowedFormats'=> ['mpg','mov','flv','mp4','avi','qt','wmv','3gp','mpeg','mkv'],
  'convertedDir'  => path.'converted/',
  'realDir'       => path.'real/',
  'gifDir'        => path.'gif/',
  'webpDir'       => path.'webp/',
  'imgDir'        => path.'img/',
  'tmp_gif_src'   => 'http://placehold.jp/006699/cccc00/200x200.png'
];



const libs = [
  'ffmpeg.binaries'  => 'c:\ffmpeg\bin\ffmpeg.exe',
  'ffprobe.binaries' => 'c:\ffmpeg\bin\ffprobe.exe'
];



libxml_use_internal_errors(true);
ini_set('max_execution_time', 0);
ini_set('max_input_time', 0);
set_time_limit(0);

ini_set('upload_max_filesize',  '2000M'); /*  file_uploads upload_max_filesize max_input_time memory_limit max_execution_time post_max_size */
ini_set('post_max_size',        '2000M');
