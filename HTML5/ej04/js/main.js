$(function(){
    'use strict';

        var $progress = $('#progress');

    $(document).on('change', 'input', function(e){
        var $this = $(this);
        if ($this.value!== '')
            $progress.val($progress.val()+1);

    });


    //Sacar por pantalla que inputs reconoce el navegador

    var $ul = $('#datos');
    $ul.empty();
    for (var tipo in Modernizr.inputtypes){

        $ul.append('<li>Tipo: ' + tipo + ' ----  Valor: ' + Modernizr.inputtypes[tipo] +'</li>');

    }

});