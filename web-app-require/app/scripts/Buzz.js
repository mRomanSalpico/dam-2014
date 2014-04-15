define('Buzz', [],function(){
    'use strict';

var buzz = function(numero){
    console.log("buzz funcion");

if (!(numero%5)) {
    return true;
}

    return false;
};

return {
    buzz : buzz
};

});