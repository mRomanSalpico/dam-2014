define('Fizz', [],function(){
    'use strict';

    var fizz = function(numero){
        console.log('fizz funcion');

        if ((numero % 3) === 0){
            return 'Fizz';
        }
        return '';
    };

    return {
        fizz : fizz
    };

});