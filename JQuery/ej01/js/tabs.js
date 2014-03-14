$(document).ready(function(){ //$(function(){})
    'use strict';

var $divs = $('div.module');

//Ocultar todos los elementos div.module;
$divs.hide();


//Crear una lista desordenada antes del primer div.module para utilizar como pestañas;
//Interactuar con cada div utilizando $.fn.each. Por cada uno,
//utilizar el texto del elemento h2 como el texto para el ítem de la lista desordenada;
var $ul = $('<ul/>',{
        'id' : 'myTabs'})
        .addClass('tabs'); //primero creo el ul y le creo la clase tabs para usarla abajo para los eventos
var myItems = []; //creo el array para ir metiendo los li
$divs.each(function(){
    var $div = $(this); //por cada div hago un li con el atributo text con el valor del primer h2.text
    var $title = $div.find('h2').first().text();
    var $li = $('<li/>', {
        'text' : $title
    });
    $li.data('target',$div);
    console.log($li);

    myItems.push($li.get(0)); //añado el li en el array pero con get(0) para que coja el elemento del dom y no un objeto query
});
//$divs.first().before($ul); //pongo el ul antes del primer div
//$ul.append(myItems); //junto los li al ul
$ul.append(myItems).insertBefore($divs.eq(0)); //Es lo mismo que las dos filas de antes...

//Vincular un evento click a cada ítem de la lista de forma que:
//Muestre el div correspondiente y oculte el otro;
//Añada la clase "current" al ítem seleccionado;
//Remueva la clase "current" del otro ítem de la lista;
$(document).on('click', '.tabs li', function(e) {
    var $li = $(this);

    $li.addClass('current').siblings().removeClass('current');
    $li.data('target').show().siblings('.module').hide();

});
//Inicializo el primero como el current
$divs.eq(0).show();
$ul.find('li').filter(':first').addClass('current');






});