

var validar= (function(){
    "use strict";






    var funcionSubmit= function(){

        comprobar = funcionPassword(this.value) && funcionRequired(this.value) &&
                    funcionEmail(this.value) && funcionComentario(this.value, this.value);
        console.log("conprobar:"+comprobar);
        if (!comprobar){
            e.preventDefault();
            console.log(e);
        }
        return comprobar;
    };


    var required = $('[data-validator="required"]');
    for (var i = required.length - 1; i >= 0; i--) {
        required[i].addEventListener('blur', funcionRequired);
    }

    var password = $('[data-validator="password"]');
    password.addEventListener('blur', funcionPassword);
//    for (var j = password.length - 1; j >= 0; j--) {
//        password[j].addEventListener('blur', funcionPassword);
//    }

    var email = $('[data-validator="email"]');
    email.addEventListener('blur', funcionEmail);
//    for (var k = email.length - 1; k >= 0; k--) {
//        email[k].addEventListener('blur', funcionEmail);
 //   }

    var comentario = $('[data-validator="min"]');

        comentario.addEventListener('blur', funcionComentario);
//    for (var l = comentario.length - 1; l >= 0; l--) {
//        comentario[l].addEventListener('blur', funcionComentario);
//    }

    var submit = $('[type="submit"]');
    console.log(submit);
    submit.addEventListener('click', funcionSubmit);


    return validar;

})();


