<?php 
use FFMpeg\FFMpeg;
use FFMpeg\FFProbe;///позволяет обращаться не \FFMpeg\FFProbe::create, а коротко - FFProbe::create
/*СТАВИТЬ через композер: PHP + FFMPEG + WINDOWS => https://github.com/PHP-FFMpeg/PHP-FFMpeg*/

/*  // = = = = = DEMO  - is valid video== = = == = 
$file  = 'C:/Users/dev/Videos/video/6.mpg';
$libs = [
    'ffmpeg.binaries'  => 'c:\ffmpeg\bin\ffmpeg.exe',
    'ffprobe.binaries' => 'c:\ffmpeg\bin\ffprobe.exe' 
];
$ffprobe = \FFMpeg\FFProbe::create($libs);
$ffprobe->isValid($file); // returns bool
*/


$ffprobe = FFProbe::create($libs);
$duration = $ffprobe
            ->format($file) // extracts file informations
            ->get('duration');// returns the duration property
echo round($duration);

 
/*$video
    ->filters()
    ->resize(new FFMpeg\Coordinate\Dimension(320, 240))
    ->synchronize();
$video
    ->frame(FFMpeg\Coordinate\TimeCode::fromSeconds(10))
    ->save('frame.jpg');

$video
    ->save(new FFMpeg\Format\Video\X264(), 'export-x264.mp4')
    ->save(new FFMpeg\Format\Video\WMV(), 'export-wmv.wmv')
    ->save(new FFMpeg\Format\Video\WebM(), 'export-webm.webm');
*/
?>