$(function(){
    'use strict';

    //Mostrar la url en el campo
    $('#recurso').val(window.location);

    //Que al dar al boton de mostrar contenido muestre lo que haya en el recurso
    var recurso = $('#recurso').val();
    var $contenidos = $('#contenidos');
    var $estados = $('#estados');
    var $cabeceras = $('#cabeceras');
    var $codigo = $('#codigo');

    $(document).on('click', 'input[value=Mostrar contenidos]', function(e){

        var $this = $(this);

        $.ajax({ url : recurso,
                data : {data : $this.val()},
                dataType: 'text',
                cache : false,
                success: function(data, textStatus, jqXHR){
                    $contenidos.text(data);
                    //poner las cabeceras
                    $cabeceras.text(jqXHR.getAllResponseHeaders);
                    //escribir el estado
                    $codigo.text(jqXHR.status + ' ' +jqXHR.textStatus);
                },
                error : function(jqXHR, textStatus, errorThrown){
                    $codigo.text(textStatus);
                }
            });


    });

});