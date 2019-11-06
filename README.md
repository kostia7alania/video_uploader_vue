# Как развернуть:
1) ```git clone``` к себе
2) вставили нужный URL в прокси vue.config.js
3) установка зависимостей и запуск проекта:```npm i && npm run serve```
4) заходим на localhost:8080 и правим src
5) если нужна авторизация: подмениваем куки localhost:8080 от целевого сайта: написать в консоле localhost'а:
```document.cookie = 'PHPSESSID=2tlo43nds6d16icd6o4mthi604' ```
взять PHPSESSID можно из запросов с целевого сайта (devTools - Network - первый request)
5) билдим: ```npm run build```
6) копируем папку dist в папку проекта целевого сайта
7) при необходимости, настраиваем пути в dist/index.html или где у вас инициализируется приложение vue...
8) фиксируем правки ```git add . && git commit -m 'изменил шапку'```
9) шлем обратно в репозиторий фронтовых модулей - в отдельную ветку, затем скрещиваем в test, потом в master....


# DEMO

<img src=demo/video-uploader-list.JPG>
<img src=demo/video-uploader-uploading.JPG>



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
<img alt=наработки title=наработки src=https://sun9-43.userapi.com/c855416/v855416719/150495/l1WgjhjyrDE.jpg> 
