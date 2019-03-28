<?php
/*
echo '<h1>RIGHTS</h1>';///////////////////////////
echo "<b>Current script owner:</b> ".get_current_user()."<br>";
$username = getenv('USERNAME') ?: getenv('USER');
echo "<b>USER:</b> $username<br>"; // e.g. root or www-data
echo '<b>whoami:</b> '.exec('whoami').'<hr>';
 
//echo '<h1>SECTION 2</h1>'; echo  exec("c:\\windows\\system32\\cmd.exe /c C:/ffmpeg/cmd.cmd"); //test permissions
echo '<h1>SECTION 3</h1>'; echo exec("$ffmpeg ffmpeg -version");
echo '<h1>SECTION 4</h1>';
//echo exec("$ffmpeg -i C:/ffmpeg/1.flv -y C:/ffmpeg/2.mp4");

$a = "$ffmpeg -i $videodir\\real\\1AFF62E9-3EBF-41EC-BFB1-891527277189.mp4 -y C:\\\\ffmpeg\\2.mp4 2>&1";
$a = 'C:\ffmpeg\bin\ffmpeg.exe -i Z:\\real\\17C0FE36-F064-4BCA-8C16-38BA178A214C.flv -y C:\\ffmpeg\2.mp4 2>&1';
echo exec ($a);
echo '<br>'.$a;
echo  exec("c:\\windows\\system32\\cmd.exe /c $a");
die();

  $dir = 'C:\\\\ffmpeg';
  $real= $dir.'\\1.flv';
  $img = $dir.'\\img.jpg';
  $gif = $dir.'\\gif.gif';
  $mp4 = $dir.'\\mp4.mp4'; 
		$cmd_pic = "$ffmpeg -v warning -y -i $real -pix_fmt yuvj422p -deinterlace -an -ss 0 -f mjpeg -t 1 -r 1 -y -s 200x200 -y $img 2>&1";
		$cmd_gif = "$ffmpeg -v warning -y -ss 1 -t 2 -i $real -vf fps=1,scale=300:-1:sws_dither=ed -gifflags -transdiff -y $gif 2>&1";
		$cmd_vid = "$ffmpeg -v warning -y -i $real -vf drawtext=\"fontfile=$ttf: text='apcis.tmou.org': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.4: x=w-tw:y=h-th\" -c:v libx264 -crf 18 -y $mp4 2>&1";
	
		echo "<hr/>cmd_pic => $cmd_pic ->";echo exec($cmd_pic, $output, $value);echo '<br><br>'; var_dump($output); echo '<br><br>';	print_r($value);
		echo "<hr/>cmd_gif => $cmd_gif ->";echo '<br><br>';echo exec($cmd_gif, $output, $value);echo '<br><br>'; var_dump($output); echo '<br><br>';	print_r($value);	
		echo "<hr/>cmd_vid => $cmd_vid ->";echo '<br><br>';echo exec($cmd_vid, $output, $value);echo '<br><br>'; var_dump($output); echo '<br><br>';	print_r($value);		
 echo '<hr><hr><hr>';
	$str = "ffprobe -i $realAbsFixSlashes -v quiet -print_format json -show_format -show_streams -hide_banner > temp_file";
	echo $realAbsFixSlashes.'<hr>';
	echo $str.'<hr>';
 	exec($str,$output);
	$info = json_decode(file_get_contents("temp_file"));
	var_dump($info);
	 
	die();
*/	 
 //phpinfo();die();
 /* exec('ffmpeg -v info -y -i C:\inetpub\wwwroot\videos\real\0AA01031-2F73-9206-C77D-8A511BB59886.mov -vf fps=5,scale=300:-1:sws_dither=ed -gifflags -transdiff -y  C:\inetpub\wwwroot\videos\gif\0AA01031-2F73-9206-C77D-8A511BB59886.gif 2>&1', $output, $value);
 print_r($output);	echo '<br/>';
 print_r($value);  	exit; 
 die; */
  


 		//execute ffmpeg and create thumb 
		/*
		ffmpeg -y -ss 30 -t 3 -i C:/inetpub/wwwroot/videos/real/705DE685-00A0-C2C3-1B97-6D5FE90E4855.mp4 -filter_complex \
		"fps=10,scale=320:-1:flags=lanczos[x];[x]split[x1][x2]; \
		[x1]palettegen[p];[x2][p]paletteuse" C:/inetpub/wwwroot/videos/img/111.gif
 
	ffmpeg -y -ss 30 -t 5 -i C:/inetpub/wwwroot/videos/real/705DE685-00A0-C2C3-1B97-6D5FE90E4855.mp4 C:/inetpub/wwwroot/videos/img/111.gif
		 
		 ffmpeg -i \\192.168.202.102\videos\real\34F4B8C4-7AE5-40C3-AE99-190FC4B814CE.mp4 \\192.168.202.102\videos\test!.mp4
		 
	set start_time=0
	set duration=60
	set palette="c:\temp\palette.png"
	set filters="fps=15,scale=-1:-1:flags=lanczos"
	ffmpeg -v warning -ss %start_time% -t %duration% -i %1 -vf "%filters%,palettegen" -y %palette%
	ffmpeg -v warning -ss %start_time% -t %duration% -i %1 -i %palette% -lavfi "%filters% [x]; [x][1:v] paletteuse" -y %2
	*/
	/*ANIM _works=> ffmpeg -v warning -y -ss 2 -t 15 -i C:/inetpub/wwwroot/videos/real/B3A1D4DA-BCFD-A71D-EC0C-EF53E3637944.mp4 -vf fps=5,scale=300:-1:sws_dither=ed -gifflags -transdiff -y  C:/inetpub/wwwroot/videos/img/111.gif*/
	//INFO ABOUT FILE:
	
?>