$(function(){ //$(function(){})
    'use strict';

    var $boxes = $('.box');
    var $width = $(document).width();
console.log($width);
    // $boxes.animate({
    //     'height' : '50px',
    //     'width' : '50px',
    //     'color' : 'yellow',
    //     'background-color' : 'red',
    //     'font-size' : '18px',
    //     'left':'100%'
    // }, 1000, function(){
    //         console.log('Fin de animacion');
    // });

    $boxes.css({
        'height' : '50px',
        'width' : '50px',
        'color' : 'yellow',
        'font-size' : '18px',
        'background-color' : 'blue',
        '-webkit-transform':'translateX('+($width-100)+'px)',
        '-webkit-transition-property':'all',
        '-webkit-transition-duration':'1s'
    });


    // $boxes.first().animate({
    //     'left':'100%'
    // },1000);

});