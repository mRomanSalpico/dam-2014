$(function(){
    'use strict';

    var $li = $('.user');

    var $ul = $('#datos');
    $ul.empty();
    $ul.append('<li><h2>Atributos con javascript: </h2></li>');

    for (var i = $li.length - 1; i >= 0; i--) {
            $ul.append('<li>Nombre: ' + $li[i].dataset.name +
                     ' -  Ciudad: ' + $li[i].dataset.city +
                     ' -  Lenguaje: ' + $li[i].dataset.lang +
                     ' -  Comida: ' + $li[i].dataset.food +
                     ' -  Delete: ' + $li[i].dataset.delete +
                     '</li>');
    }



    $ul.append('<li><h2>Atributos con jquery: </h2></li>');

    for (var j = $li.length - 1; j >= 0; j--) {

        $ul.append('<li>Nombre: ' + $($li[j]).data('name') +
                     ' -  Ciudad: ' + $($li[j]).data('city') +
                     ' -  Lenguaje: ' + $($li[j]).data('lang') +
                     ' -  Comida: ' + $($li[j]).data('food') +
                     ' -  Delete: ' + $($li[j]).data('delete') +
                     '</li>');

    }

    $ul.append('<li><h2>Cambiando es por _es: </h2></li>');

    for (var k = 0; k < $li.length; k++) {
        if ($li[k].dataset.lang === 'es') $li[k].dataset.lang = 'es_ES';
        $ul.append('<li>Nombre: ' + $li[k].dataset.name +
                 ' -  Ciudad: ' + $li[k].dataset.city +
                 ' -  Lenguaje: ' + $li[k].dataset.lang +
                 ' -  Comida: ' + $li[k].dataset.food +
                 ' -  Delete: ' + $li[k].dataset.delete +
                 '</li>');
    }

    $ul.append('<li><h2>borrar los delete = true: </h2></li>');

    for (var h= 0; h < $li.length; h++) {
        //if ($($li[h]).dataset.delete === true) $($li[h]).remove(); //Así se haria con Jquery
        if ($li[h].dataset.delete === 'true') $li[h].parentNode.removeChild($li[h]);
        else $ul.append('<li>Nombre: ' + $li[h].dataset.name +
                 ' -  Ciudad: ' + $li[h].dataset.city +
                 ' -  Lenguaje: ' + $li[h].dataset.lang +
                 ' -  Comida: ' + $li[h].dataset.food +
                 ' -  Delete: ' + $li[h].dataset.delete +
                 '</li>');
    }


});