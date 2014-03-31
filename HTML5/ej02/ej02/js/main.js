$(function(){
    'use strict';

    document.designMode = 'on';

    $(document).on('click', '#negrita', function(e){

        document.execCommand('bold',false,null);

    });

    $(document).on('click', '#cursiva', function(e){

        document.execCommand('italic',false,null);

    });

    $(document).on('click', '#subrayar', function(e){

        document.execCommand('underline',false,null);

    });
    $(document).on('click', '#centrar', function(e){

        document.execCommand('justifycenter',false,null);

    });
});