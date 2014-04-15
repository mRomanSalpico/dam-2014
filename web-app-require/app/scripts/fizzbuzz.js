//APP.fizzbuzz =(function(){})()
define('fizzbuzz', ['Fizz','Buzz'],function(Fizz,Buzz){
    'use strict';

    var testNumber = function(num, funciones){
        var lista =[];

        funciones.forEach(function(funcion) {
            if (funcion(num).length >0) {
                lista.push(funcion(num));
            }
        });

        if(!lista.length){
            lista.push(num);
        }

        return lista.join('');
    };

    var fizzbuzz = function(numero){

        var lista=[];
        var funciones =[Fizz.fizz,Buzz.buzz]; //estaría mejor recorrer el arguments[i] para crear el array de funciones pero entonces todos los modulos
                                                // tendiran que tener el nombre de funcion igual, por ejemplo validate
        for(var i=1;i<=numero;i++){
            lista.push(testNumber(i, funciones));
        }

        return lista;
    };

    return {
        fizzbuzz : fizzbuzz
    };

});
