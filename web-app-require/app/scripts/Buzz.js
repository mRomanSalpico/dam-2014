define('Buzz', [],function(){
    'use strict';

    var buzz = function(numero){
        console.log('buzz funcion');

        if ((numero % 5) === 0){
            return 'Buzz';
        }
        return '';
    };

    return {
        buzz : buzz
    };

});