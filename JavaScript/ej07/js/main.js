window.$ = Element.prototype.$ = function(selector){

    var that = (this instanceof Element) ? this : document;
    var elems = that.querySelectorAll(selector);


    return (elems.length === 1) ? elems[0]: elems;
};

var anade= (function(){
    "use strict";


    var listas = $('#lista'),
        lis = listas.children,
        count = listas.children.length;

    var mostrarTexto = function(e){
        e.preventDefault(); //Si hay algun error no se ejecuta lo que vaya a hacer después, para bonotes o links
        e.stopPropagation(); //Si hay un listener en el elemento no deja ejecutar los de sus padres
        console.log(this);
        console.log(e);
    };

    //Poniendo el listener en el ul padre
    lista.addEventListener('click', mostrarTexto);

    //Poniendo el listener en el li pero no van a tener los elementos nuevos que se vayan creando, para eso
    // deberiamos crear el listener tb al crear el nuevo li pero eso no es lo mejor
    for (var i = lis.length - 1; i >= 0; i--) {
        lis[i].addEventListener('click', mostrarTexto);
    }

    var anade = function(){
        var li = document.createElement('li');
        li.innerText = "Elemento " + (++count);

        listas.appendChild(li);

    };


    return anade;

})();


