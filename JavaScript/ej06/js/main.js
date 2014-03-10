var muestra= (function(){
    "use strict";

    var muestra = function(numero){
        //var parrafos = document.querySelectorAll('span');
        //if (parrafos.length){
        //    parrafos[numero-1].className = "adicional";
        //}

        //var enlaces = document.querySelectorAll('a');
        //if (enlaces.length){
        //    enlaces[numero-1].className = "oculto";
        //}

        var enlaces = document.querySelectorAll('.enlace');
        if (enlaces.length > 0){
            enlaces[numero-1].classList.add("oculto");
            var parrafo = enlaces[numero-1].previousElementSibling;
            var spans = parrafo.querySelectorAll('span.oculto');
            if (spans.length > 0){
                spans[numero-1].classList.remove('oculto');
            }
        }
    };

    return muestra;

})();


