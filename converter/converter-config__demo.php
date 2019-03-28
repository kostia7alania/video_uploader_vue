<?php
  
//const videodir = 'E:\\fsc_videos';	//'\\\\red\videos'; //$videodir = realpath('..\\videos');\\\\media\\videos\\real/
//const videodir = '\\\\192.168.0.107/fsc_videos';//<--когда с локалки, то fileExist работает именно так!
const videodir = 'Y:\\';//'\\\\192.168.0.107/fsc_videos';//когда с локалки,то fileExist НЕ работает!

const vid_cfg = [
    'SQL_user'      => 'sa',
    'SQL_pass'      => 'sqlsrv pass',
    'SQL_server'    => 'localhost',//'NODE1',//'192.168.0.106';
    'SQL_database'  => 'db_name',
    'watermark'     => 'ISGS',
    'ttf_AbsPath'   => '',//'C\\\\:/ffmpeg/Comili-Book.otf', //ток так пашет=);
    'ttf_RelPath'   => __DIR__.'/src/Comili-Book.otf',
    'limit'         => 5, //max - files in process; 
    'real_dir'      => videodir."\\real\\",
    "converted_dir" => videodir."\\converted\\",
    "static_img_dir"=> videodir."\\img\\",
    "anim_gif_dir"  => videodir."\\gif\\",
    "anim_webp_dir" => videodir."\\webp\\",
    "display_logs"  => true,
    "SQL_canwrite"  => false, //можно ли делать запросы, меняющие данные в SQL; TRUE -> в продакшене
];

const libs = [
  'ffmpeg.binaries'  => 'c:\ffmpeg\bin\ffmpeg.exe',//и так пашет и с \\ и с \\\\ =)));
  'ffprobe.binaries' => 'c:\ffmpeg\bin\ffprobe.exe',
  'ffmpeg_LogLevel'  => 'error'//"quiet","panic", "fatal", "error","warning","info","verbose","debug","trace"
];  

ini_set('memory_limit', '4048M');
ini_set('display_errors', 'On');
error_reporting(E_ALL); 

libxml_use_internal_errors(true);
ini_set('max_execution_time', 0);
ini_set('max_input_time', 0);
set_time_limit(0);

if( vid_cfg['display_logs'] ) echo '['.(new \DateTime())->format('Y-m-d H:i:s').']: ';