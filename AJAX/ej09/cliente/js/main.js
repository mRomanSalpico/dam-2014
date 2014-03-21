$(function(){
    'use strict';



    var $propuestas = $('#propuestas');
    var $municipio = $('#municipio');
    var $listaPropuestas = $('#listaPropuestas');
    $municipio.focus();


    var autocompleta = function(data, textStatus, jqXHR){
                    //$propuestas.text(data);
                    var $listaPropuestas = $('#listaPropuestas');
                    $listaPropuestas.html('');
                    var myItems = [];
                    if ($('#municipio').val().length >0){
                        for(var prop in data){
                            myItems.push('<li> ' + data[prop] + '</li>');
                        }
                    }
                    $listaPropuestas.append(myItems.join('')); //fuera del for es donde hacemos el append
    };

    $(document).on('keyup', $municipio, function(e){

        var $municipio = $('#municipio');
        $.ajax({
            url : '../servidor/autocompletaMunicipios.php', //Es relativa al html y no al js
            data : { municipio : $municipio.val()},
            type : 'POST',
            dataType : 'json',
            success : autocompleta
        });
    });


});