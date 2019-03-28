FFMPEG HELP -> https://trac.ffmpeg.org/wiki/Encode/H.264



=> в планировщик добавлять так:
Действия-> запуск проги - c:\windows\system32\cmd.exe
Аргументы:
/m /c php-cgi -f E:\fsc_videos\converter\run_converter.cmd >> E:\fsc_videos\converter\logs_sheduller.txt

тригеры -> повторять каждые 5 мин бесконечно;