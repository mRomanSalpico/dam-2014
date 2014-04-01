$(function(){
    'use strict';

        var $progress = $('#progress');

    $(document).on('change', 'input', function(e){
        var $this = $(this);
        if ($this.value!== '')
            $progress.val($progress.val()+1);

    });
});