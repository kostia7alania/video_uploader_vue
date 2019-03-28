# video-uploader-new

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### COMPOSER 
```
Если выполнить
composer install
то поставятся те версии которые указанны в composer.lock

.lock файл -  точно говорит какую версию поставить.

Поэтому рекомендуется писать
composer install
а не
composer update
т.к. update перезапишет .lock файл и добавит последнии версии.
```

### FFMPEG install on WINDOWS + PHP 
For Windows users: Please find the binaries at http://ffmpeg.zeranoe.com/builds/.
```
& put to c:\ffmpeg\
```
#Look -> https://github.com/PHP-FFMpeg/PHP-FFMpeg

```
FFMPEG HELP -> https://trac.ffmpeg.org/wiki/Encode/H.264
 
=> в планировщик добавлять так:
Действия-> запуск проги - c:\windows\system32\cmd.exe
Аргументы:
/m /c php-cgi -f E:\fsc_videos\converter\run_converter.cmd >> E:\fsc_videos\converter\logs_sheduller.txt

тригеры -> повторять каждые 5 мин бесконечно;

=> run_converter.cmd:
php-cgi -f E:\fsc_videos\ffmpeg\converter.php >> E:\fsc_videos\ffmpeg\logs.log
```