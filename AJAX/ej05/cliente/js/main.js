$(function(){
    'use strict';

    var $this = $(this);
    var $login = $('#login');
    var $disponibilidad = $('#disponibilidad');

    $(document).on('click', '#comprobar', function(e){

        $.ajax({
            url : '../servidor/compruebaDisponibilidadJSON.php', //Es relativa al html y no al js
            data : { login : $login.val()},
            type : 'POST',
            dataType : 'json',
            success : function(data, textStatus, jqXHR){
                console.log(data);
                for(var prop in data){
                    $disponibilidad.text(prop + ' : ' + data[prop]);
                }
            }
        });
    });


});