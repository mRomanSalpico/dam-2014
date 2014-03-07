var APP =  APP||{};
APP.validarCadena= (function(){
    "use strict";

    var validarMayusculas = function(cadena){
        return cadena && (cadena === cadena.toUpperCase());
    };
    var validarMinusculas = function(cadena){
        return cadena && (cadena === cadena.toLowerCase());
    };

    var validarCadena = function(cadena){
        var resultado;
        if(validarMayusculas(cadena)) {
            resultado = "MAYUSCULAS";
        } else if(validarMinusculas(cadena)) {
            resultado = "minusculas";
        } else {
            resultado = "MAYUSCULAS y minusculas";
        }
        return resultado;

    };

    return validarCadena;

})();

console.log(APP.validarCadena("ABC"));
console.log(APP.validarCadena("abc"));
console.log(APP.validarCadena("AbC"));
