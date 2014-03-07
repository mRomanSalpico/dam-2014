var APP =  APP||{};
APP.validarPalindromo= (function(){
    "use strict";

    var validarPalindromo = function(cadena){
        cadena = cadena.trim().replace(/ /gi, "").toLowerCase();
        var pal =cadena.split("").reverse().join("");
        return cadena && cadena === pal;
    };

    return validarPalindromo;

})();

console.log(APP.validarPalindromo("ABA"));
console.log(APP.validarPalindromo("abc"));
console.log(APP.validarPalindromo("LA AL"));

