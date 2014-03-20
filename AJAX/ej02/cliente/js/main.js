$(function(){
    'use strict';

    var $this = $(this);
    var $ticker = $('#ticker');

    var mensajes =[];
    var index = 0;

    var refrescar = setInterval( function()
    {
        $.ajax({ url : '../servidor/generaContenidos.php',
                data : {data : $this.val()},
                dataType: 'html',
                cache : false,
                success: function(data, textStatus, jqXHR){
                    var fecha = new Date();
                    var fechaMostrar = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
                    $ticker.text(fechaMostrar + ' '+ data);
                    mensajes.push(data);
                    index = mensajes.length;
                    $ticker.addClass('strong');
                },
                error : function(jqXHR, textStatus, errorThrown){
                    $ticker.text(textStatus);
                }
            });
    }, 1000);


    $(document).on('click', '#detener', function(e){

        var $this = $(this);

        clearInterval(refrescar);
    });


    $(document).on('click', '#anterior', function(e){

        var $this = $(this);

        clearInterval(refrescar);
        $ticker.text(mensajes[index-1]);
        index--;

    });

    $(document).on('click', '#siguiente', function(e){

        var $this = $(this);

        clearInterval(refrescar);
        $ticker.text(mensajes[index+1]);
        index++;

    });



});