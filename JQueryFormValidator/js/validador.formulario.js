HTMLFormElement.prototype.validar = function(errores){
    "use strict";

    var form = this;
    var inputs = form.querySelectorAll('[data-validator]');


    var funcionEnRojo = function(objeto){
        objeto.classList.add("txt-red");
        objeto.classList.remove("txt-white");
    };
    var funcionEnBlanco = function(objeto){
        objeto.classList.add("txt-white");
        objeto.classList.remove("txt-red");
    };


    var funcionRequired= function(e){
        var comprobar = validador.required(this);   //APP.validador.required(this.value);
        if (this.type === "checkbox") {comprobar = this.checked;
                                        if (!comprobar){funcionEnRojo(this.labels[0]);}
                                        else funcionEnBlanco(this.labels[0]);}
        if (!comprobar){
            funcionEnRojo(this);
            console.log(errores.errorRequired);
        } else funcionEnBlanco(this);
        return comprobar;
    };
    var funcionPassword= function(e){
        var comprobar = validador.password(this); //APP.validador.password(this.value);
        if (!comprobar){
            funcionEnRojo(this);
            console.log(errores.errorPassword);
        } else funcionEnBlanco(this);
        return comprobar;
    };
    var funcionEmail= function(e){
        var comprobar = validador.email(this); //APP.validador.email(this.value);
        if (!comprobar){
            funcionEnRojo(this);
            console.log(errores.errorEmail);
        } else funcionEnBlanco(this);
        return comprobar;
    };
    var funcionComentario= function(e){
        var comprobar = validador.comentario(this); //APP.validador.comentario(this.value, this.dataset.max);
        if (!comprobar){
            funcionEnRojo(this);
            console.log(errores.errorComentario);
        } else funcionEnBlanco(this);
        return comprobar;
    };

    var funcionSubmit= function(e){

        var comprobar;
        for (var i = inputs.length - 1; i >= 0; i--) {
            switch(inputs[i].dataset.validator){
                case 'required' : comprobar = funcionRequired.call(inputs[i]);break;
                case 'password' : comprobar = funcionPassword.call(inputs[i]);break;
                case 'email' : comprobar = funcionEmail.call(inputs[i]);break;
                case 'min' : comprobar = funcionComentario.call(inputs[i]);
            }
        }


        if (!comprobar){
            e.preventDefault();
        }
        return comprobar;
    };

    form.addEventListener('submit', funcionSubmit);

    for (var i = inputs.length - 1; i >= 0; i--) {
        switch(inputs[i].dataset.validator){
            case 'required' : inputs[i].addEventListener('blur', funcionRequired);break;
            case 'password' : inputs[i].addEventListener('blur', funcionPassword);break;
            case 'email' : inputs[i].addEventListener('blur', funcionEmail);break;
            case 'min' : inputs[i].addEventListener('blur', funcionComentario);break;
        }
    }
};