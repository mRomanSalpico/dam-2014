
(function($){

    //funciones para cambiar color si hay error o no
    var funcionEnRojo = function(objeto){
        objeto.classList.add("txt-red");
        objeto.classList.remove("txt-white");
    };
    var funcionEnBlanco = function(objeto){
        objeto.classList.add("txt-white");
        objeto.classList.remove("txt-red");
    };
    //fin funciones para cambiar color si hay error o no

    //funciones validadoras
    var email = function(ml){

        var mail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        return ml && mail.test(ml);
    };

    var password = function(passwd){

        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return passwd && pass.test(passwd);
    };

    var required = function(requi){

        var req = /.+/;
        return requi && req.test(requi);
    };

    var min = function(text, size){

       return text && text.length <= size;

    };
    // final funciones validadoras


    //funciones
    var validarRequerido = function(e){
        var comprobar = required(this.value);

        if (this.type === "checkbox") {comprobar = this.checked;
                                        if (!comprobar){mostrarError(e.data.check);
                                                        funcionEnRojo(this.labels[0]);}
                                        else funcionEnBlanco(this.labels[0]);}
        if(!comprobar){
                mostrarError(e.data.required);
                funcionEnRojo(this);
        }
        else{
            funcionEnBlanco(this);

        }
    };

    var validarEmail = function(e){
        var comprobar = email(this.value);
        if(!comprobar){
                mostrarError(e.data.email);
                funcionEnRojo(this);
        }
        else{
            funcionEnBlanco(this);

        }
        return comprobar;
    };

    var validarPassword = function(e){
        var comprobar =password(this.value);

        if(!comprobar){
                mostrarError(e.data.password);
                funcionEnRojo(this);
        }
        else{
            funcionEnBlanco(this);

        }
        return comprobar;
    };

    var validarMin = function(e){
        var comprobar = min(this.value, e.data.min.size);

        if(!comprobar){
                mostrarError(e.data.min);
                funcionEnRojo(this);
        }
        else{
            funcionEnBlanco(this);

        }
        return comprobar;
    };


    var validarFormulario = function(e){
        var $this = $(this).find(':input[data-validator]');
        var comprobar;
        $this.each(function(){
                switch(this.dataset.validator){
                    case 'required' : comprobar = validarRequerido.call(this, { data : e.data });break;
                    case 'email' : comprobar = validarEmail.call(this, { data : e.data }); break;
                    case 'password' : comprobar = validarPassword.call(this, { data : e.data }); break;
                    case 'min' : comprobar = validarMin.call(this, { data : e.data }); break;
                }
        });

        if (!comprobar){
            e.preventDefault();
        }
        return comprobar;
    };

    var mostrarError = function(err){
        if (err) {
            console.log(err.error);

        }
        else {
            console.log("faltan datos o son incorrectos!!!!!!!");
        }
    };
    //final funciones



    $.fn.formValidator = function(options){

        var opts = $.extend({}, $.fn.formValidator.defaults, options);

        return this.filter('form').each(function(){
            var $this = $(this);

            $this.find(':input[data-validator=required]').on('keyup', opts, validarRequerido);
            $this.find(':input[data-validator=password]').on('keyup', opts, validarPassword);
            $this.find(':input[data-validator=email]').on('keyup', opts, validarEmail);
            $this.find(':input[data-validator=min]').on('keyup', opts, validarMin);
            $this.on('submit', opts, validarFormulario);

        });
    };

    //defaults
    $.fn.formValidator.defaults = {
        'required' : {
            'error' : 'Datos requeridos!!!!!!!!!!!'

        },
        'email' : {
            'error' : 'El email es incorrecto!!!!!!!!!!!'

        },
        'password' : {
            'error' : 'El password es incorrecto!!!!!!!!!!!'

        },
        'min' : {
            'error' : 'El comentario está fuera de rango!!!!!!!!!!!',
            'size' : 50

        },
        'check' : {
            'error' : 'Acepta las condiciones!!!!!!!!'

        }
    };
    //end of defaults


})(jQuery);

$('form').formValidator();
