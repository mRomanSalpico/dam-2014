$(function(){
    'use strict';

    var $provincias = $('#provincias');
    var $municipios = $('#municipios');
    var elemento;


        $.ajax({
            url : '../servidor/cargaProvinciasJSON.php', //Es relativa al html y no al js
            //data : { login : $login.val()},
            type : 'POST',
            dataType : 'json',
            success : function(data, textStatus, jqXHR){
                for(var prop in data){

                    elemento = new Option(data[prop],prop);
                    console.log(prop);
                    console.log(data[prop]);
                    console.log(elemento);
                    console.log($provincias);
                    $provincias[0].options.add(elemento);

                }
            }
        });

    $(document).on('change', $provincias, function(e){
        $municipios[0].options.length = 0;
        //$municipios.html('');

        $.ajax({
            url : '../servidor/cargaMunicipiosJSON.php', //Es relativa al html y no al js
            data : { provincia : $provincias.val()},
            type : 'POST',
            dataType : 'json',
            success : function(data, textStatus, jqXHR){
                for(var prop in data){

                    elemento = new Option(data[prop],prop);
                    $municipios[0].options.add(elemento);

                }
            }
        });
    });


});