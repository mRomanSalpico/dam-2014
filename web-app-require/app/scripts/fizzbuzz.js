define('fizzbuzz', ['Fizz','Buzz'],function(Fizz,Buzz){
    'use strict';

    var fizzbuzz = function(numero){
        console.log("fizzbuzz funcion");

        var lista=[];
        var msg='';
        for(var i=1;i<=numero;i++){
            msg='';
            if (Fizz.fizz(i)) {
                msg+='Fizz';
            }
            if (Buzz.buzz(i)) {
                msg+='Buzz';
            }
            if (!(Fizz.fizz(i)) && !(Buzz.buzz(i)) ){
                msg=i;
            }
            lista[i-1]=msg;

                console.log("msg");
                console.log(msg);
                console.log(lista);
        }

        return lista;
    };

    return {
        fizzbuzz : fizzbuzz
    };

});
