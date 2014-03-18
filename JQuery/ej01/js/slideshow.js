

$(document).ready(function(){
    'use strict';

    var onSlideBefore = function onSlideBefore($slideElement, oldIndex, newIndex){
        console.log($slideElement, oldIndex, newIndex);
    };

    var onSlideAfter =function onSlideAfter($slideElement, oldIndex, newIndex){
        console.log($slideElement, oldIndex, newIndex);
    };

    var $slider = $('#slideshow').bxSlider({
        'mode': 'fade',
        'pager':false,
        'controls':false,

        'onSlideBefore' : onSlideBefore,
        'onSlideAfter' : onSlideAfter
    });

    $(".fancybox").fancybox();

    $(document).on('click', '.anterior', function(e) {

        e.preventDefault();

        //var target = this.dataset.target; //Si hay mas de un slider para saber en cual tenemos que usar
        //var $target =$(this).data('target');

        $slider.goToPrevSlide();
    });

    $(document).on('click', '.siguiente', function(e) {

        e.preventDefault();
        $slider.goToNextSlide();
    });

});