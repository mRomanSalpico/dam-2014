$(document).ready(function(){ //$(function(){})
    'use strict';


    $('#nav li').hover(function(){
        $(this).addClass('hover')
        .find('ul').show();
    }, function(){
        $(this).removeClass('hover')
        .find('ul').hide();
    });



})

.css({'cursor':'pointer'});