window.$ = Element.prototype.$ = function(selector){

    var that = (this instanceof Element) ? this : document;
    var elems = that.querySelectorAll(selector);


    return (elems.length === 1) ? elems[0]: elems;
};
var APP = APP || {};
APP.validador = (function(){
    "use strict";

    var validarRequired = function(nombre){
        return nombre && nombre.length > 0;
    };
    var validarPassword = function(password){

        var min =/(a-z)/;
        var may =/(A-Z)/;
        var num =/(0-9)/;

        return password && password.length >= 6 && min.test(password) && may.test(password) && num.test(password);
    };
    var validarEmail = function(email){
        var exp = /^(\w+)((\.|-|_)?(\w+))*@(\w+)(\.\w{2,})+$/;
        return email && exp.test(email);
    };
    var validarComentario = function(comentario, size){
        return comentario && comentario.length <= size;
    };

    return {
        required : validarRequired,
        password : validarPassword,
        email : validarEmail,
        comentario : validarComentario
    };

})();


