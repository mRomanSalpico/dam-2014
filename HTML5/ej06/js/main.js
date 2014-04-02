$(function(){
    'use strict';

    var video = document.getElementById("video");

    $(document).on('click', '#iniciar', function(e){
        video.play();
    });
    $(document).on('click', '#pausa', function(e){
        video.pause();
    });
    $(document).on('click', '#parar', function(e){
        video.pause();
        video.currentTime=0;
    });

    $(document).on('click', '#avanzar', function(e){
        video.currentTime=video.currentTime+10;
    });
    $(document).on('click', '#retroceder', function(e){
        video.currentTime=video.currentTime-10;
    });
    $(document).on('click', '#inicio', function(e){
        video.currentTime=0;
    });
    $(document).on('click', '#fin', function(e){
        video.currentTime=video.duration;
    });
    $(document).on('click', '#pantalla', function(e){
        if (video.requestFullScreen ) video.requestFullScreen();
        else if (video.msRequestFullScreen ) video.msRequestFullScreen();
        else if (video.mozRequestFullScreen ) video.mozRequestFullScreen();
        else video.webkitRequestFullScreen();
    });

    var volumen = document.getElementById("volumen");
    $(document).on('change', '#volumen', function(e){
        video.volume=volumen.value/100;
    });

    var progreso = document.getElementById("progress");
    var cambiarProceso = function(){
        progreso.max = video.duration;
        progreso.value= video.currentTime;
    };
    video.addEventListener('timeupdate',cambiarProceso, false);


    $(document).on('click', '#video1', function(e){
        var videoCurso = document.getElementById("video");
        videoCurso.src="videos/gatitos.mp4";

    });

    $(document).on('click', '#video2', function(e){
        var videoCurso = document.getElementById("video");
        videoCurso.src="videos/gatitos2.mp4";

    });

});