$(function(){

    $(document).on('change', 'select[name=day]', function(e){
        var $this = $(this);

/*
        $.getJSON('data/specials.json', //Es relativa al html y no al js
                { data : $this.val()}, //pasarle datos es opcional, solo
                function(data, textStatus, jqXHR){
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                });
*/

        $.ajax({ url : 'data/specials.json',
                data : {data : $this.val()},
                dataType: 'json',
                cache : false,
                success: function(data, textStatus, jqXHR){
                    //console.log(JSON.parse(data)); //Si dataType lo tenemos como text y queremos pasar el resultado a json
                    console.log(data);
                },
                error : function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });

    });

});