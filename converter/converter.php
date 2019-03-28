<?php
	require('./converter-config.php');
	require('./src/functions.php');
	$stats = checkStatus();// <== CHECK STATUS ALL VIDEOS
	if( $stats['inProccess'] >= vid_cfg['limit'] ) { echo '[Processes is over than limit!!]'; die; }// <== CHECK QUEUE LIMITS
	if(!$stats['inQueue']) {echo 'Queue empty'; die();}
	$filename = get_next_task_filename(); //'testNAME.MP3';
	if(!$filename) {echo 'can`t get filename.!.';die;}
	changeStatus ($filename, 1);// меняем статус выбранного файла = > в процессе;
	/** convert CONFIG PREPARE **/
	$real_fullPath = vid_cfg['real_dir'].$filename;//. $filename;
	$arr = explode('.', $filename);
	$arr_count = count($arr);
	$ext = $arr[$arr_count-1];
	$name = $arr[0];
	$conv_fullPath= vid_cfg['converted_dir'].$name.'.mp4';
	$img_fullPath = vid_cfg['static_img_dir'].$name.'.jpg';
	$gif_fullPath = vid_cfg['anim_gif_dir']  .$name.'.gif';
	$webp_fullPath= vid_cfg['anim_webp_dir'].$name.'.webp';

	if( !isExist($real_fullPath, 'REAL') ) {changeStatus($real_fullPath, 3); die;} //меняем статус выбранного файла = > ОШИБКА!!!+++!;

	$duration = getDuration($real_fullPath);	//INFO ABOUT FILE: 
	$anim_fps = 5; 
	$anim_start    = getAnimParams($duration)[0];
	$anim_duration = getAnimParams($duration)[1]; 
	
	$def = libs['ffmpeg.binaries'].' -v '.libs['ffmpeg_LogLevel'].' -y -i '.$real_fullPath ;
	
	/** JPG PREVIEW  */
	$cmd_pic = "$def -pix_fmt yuvj422p -deinterlace -an -ss $anim_start -f mjpeg -t 1 -r 1 -y -s 300x167 -y $img_fullPath 2>&1"; //соотношение -> 16х9
	/** GIF PREVIEW  */
	$cmd_gif = "$def -ss $anim_start -t $anim_duration -vf fps=$anim_fps,scale=300:-1:sws_dither=ed -gifflags -transdiff -y $gif_fullPath 2>&1";
	/** webp PREVIEW  */
	$cmd_webp = "$def -ss $anim_start -t $anim_duration -vf fps=$anim_fps,scale=300:-1:sws_dither=ed -an -vsync 0 -loop 0  -y $webp_fullPath 2>&1";
	/** CONVERT VIDEO **/
	$cmd_vid = "$def -movflags +faststart -vf drawtext=\"fontfile=".ttf_detect(vid_cfg).": text='".vid_cfg['watermark']."': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.4: x=w-tw:y=h-th\" -c:v libx264 -preset veryslow -crf 18 -y $conv_fullPath	-hide_banner 2>&1";
	goExec($cmd_pic,'pic');
	goExec($cmd_gif,'gif');
	goExec($cmd_webp,'webp');
	goExec($cmd_vid,'vid');
	if( isExist($conv_fullPath, 'NEW')) changeStatus($filename, 2);//success
	else 							   changeStatus($filename, 3);//fail