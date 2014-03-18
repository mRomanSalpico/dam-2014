var validador = (function($) {

  $.fn.validador = function(){

    return this.filter('form').each(function(){
      var $this = $(this);


    });
  };
  $.fn.validador.required = function(){

    return this.filter('.required').each(function(){
      //var $this = $(this);
      var texto = this.value;
        return texto && texto.length > 0;

    });
  };
    $.fn.validador.password = function(){

    return this.filter('.password').each(function(){
      //var $this = $(this);
      var password = this.value;
        var min =/(a-z)/;
        var may =/(A-Z)/;
        var num =/(0-9)/;

        return password && password.length >= 6 && min.test(password) && may.test(password) && num.test(password);

    });
  };
    $.fn.validador.email = function(){

    return this.filter('.email').each(function(){
      //var $this = $(this);
      var email = this.value;
        var exp = /^(\w+)((\.|-|_)?(\w+))*@(\w+)(\.\w{2,})+$/;
        return email && exp.test(email);

    });
  };
    $.fn.validador.comentario = function(){

    return this.filter('.min').each(function(){
      //var $this = $(this);
      var comentario = this.value;
      var size = this.dataset.max;
        return comentario && comentario.length <= size;

    });
  };

})(jQuery);

$('form').validador();
$('form').validador();

/*
$('table, div').validador('red');






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
*/

