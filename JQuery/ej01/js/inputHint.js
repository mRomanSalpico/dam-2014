$(document).ready(function(){ //$(function(){})
    'use strict';

    var $text = $('input.input_text');
    var $label = $text.closest('form').find('label[for=' + $text.attr('name')+']');
    //var $label = $('label[type=q]');

    //Establecer el valor del elemento input igual al valor del elemento label;
    $text.val($label.text());

    //Añadir la clase "hint" al elemento input;
    $text.addClass('hint');

    //Remover el elemento label;
    $label.hide();

    //Vincular un evento focus en el input para remover el texto de sugerencia y la clase "hint";
    $(document).on('focus', 'input.input_text', function(e) {
        var $input = $(this);
        if ($input.val() === $label.text()){
            this.value = '';
            $input.removeClass('hint');
        }
    });

    //Vincular un evento blur en el input para restaurar el texto de sugerencia y
    // la clase "hint" en caso que no se haya ingresado algún texto.
    $(document).on('blur', 'input.input_text', function(e) {
        var $input = $(this);
        if ($input.val().length === 0){
            $input.val($label.html());
            $input.addClass('hint');
        }
    });

});