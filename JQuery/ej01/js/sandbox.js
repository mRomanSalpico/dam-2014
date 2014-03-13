$(document).ready(function(){ //$(function(){})
    'use strict';
    var $divs = $('div.module');
    console.log($divs);

    var $li = $('#myList li').eq(2);
    console.log($li[0]);
    $li = $('#myList').find('li').eq(2);
    console.log($li[0]);
    $li = $('#myList li:nth-child(3)');
    console.log($li[0]);
    $li = $('#myListItem');
    console.log($li[0]);

    //Seleccionar el elemento label del elemento input utilizando un ..
    var $input = $('input.input_text');
    var $label = $input.closest('form')
                    .find('label[for=' + $input.attr('name')+']');
    console.log($label);

    //averiguar cuantos elementos en la pagina estan ocultos
    var $ocultos = $(':hidden');

    //averiguar cuantas imagenes en la pagina poseen el atributo alt
    var $img = $('img[alt]');

    //seleccionar todas las filas impares del cuerpo de la tabla y les cambiamos en color a gris
    var $filas = $('tbody tr:odd').css('background-color','gray');


    //Seleccionar todas las imágenes en la página; registrar en la consola el atributo alt de cada imagen.
    var $imgagenes = $('img[alt]').each(function(idx, el) {
         console.log($(el).attr('alt'));
    });
    $imgagenes = $('img[alt]').each(function(idx, el) {
         console.log(el.alt);
    });
    $imgagenes = $('img[alt]').each(function() { //esta es la mejor opcion
         console.log(this.alt);
    });
    for (var i = $imgagenes.length - 1; i >= 0; i--) {
        console.log($imgagenes[i].alt);
    }

    //Seleccionar el elemento input, luego dirigirse hacia el formulario y añadirle una clase al mismo.
    var $inputs = $('input.input_text');
    $input.closest('form').addClass('nuevaClase');

    //Seleccionar el ítem que posee la clase "current" dentro de la lista #myList y
    //remover dicha clase en el elemento; luego añadir la clase "current" al siguiente ítem de la lista
    var $current = $('#myList .current').removeClass('current').next().addClass('current');

    //Seleccionar el elemento select dentro de #specials; luego dirigirse hacia el botón submit.
    var $submit = $('#specials select').closest('form')
                    .find('.input_submit');

    //Seleccionar el primer ítem de la lista en el elemento #slideshow; añadirle la clase "current" al mismo y
    //luego añadir la clase "disabled" a los elementos hermanos.
    var  $lista = $('#slideshow li:first-child').addClass('current').siblings().addClass('disabled');

    //Añadir 5 nuevos ítems al final de la lista desordenada #myList.
    var start, end;

    start = new Date(); //Controlamos el tiempo para ver qué opcion es mejor
    var myItems = [];
    for (var j=0; j<5; j++) {
        myItems.push('<li>item de la lista ' + j + '</li>'); //Esta es la opcion buena que se guarda una lista
    }
    $('#myList').append(myItems.join('')); //fuera del for es donde hacemos el append
    end = new Date();
    console.log(end-start);

    start = new Date();
    for (j=0; j<5; j++) {
        $('#myList').append('<li>item de la lista ' + j + '</li>');//hacemos el append dentro del for, es mucho peor
    }
    end = new Date();
    console.log(end-start);

    //Remover los ítems impares de la lista.
    $('#myList li:even').remove();

    //Añadir otro elemento h2 y otro párrafo al último div.module.
    $('div.module:last').append('<h2>H2 NUEVO</h2><p>PARRAFO NUEVO</p>');

    //Añadir otra opción al elemento select; darle a la opción añadida el valor "Wednesday".
    var opt = new Option('Wednesday','Wednesday');
    $('#specials select')[0].options.add(opt);

    $('#specials select').append('<option value="Wednesday">Wednesday</option>');

    //Añadir un nuevo div.module a la página después del último; luego añadir una copia de
        // una de las imágenes existentes dentro del nuevo div.
    var $new = $('<div/',{
        'class' : 'module'
    });
    $('div.module').last().after($new).append($('img:first').clone());
});