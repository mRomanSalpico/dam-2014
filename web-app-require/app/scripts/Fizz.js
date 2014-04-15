define('Fizz', [],function(){
    'use strict';

var fizz = function(numero){
    console.log("fizz funcion");

if (!(numero%3)) {
    return true;
}

    return false;
};

return {
    fizz : fizz
};

});