window.$ = Element.prototype.$ = function(selector){

    var that = (this instanceof Element) ? this : document;
    var elems = that.querySelectorAll(selector);


    return (elems.length === 1) ? elems[0]: elems;
};

window.onload = $('#registro').validar({
//$('#registro').validar({
    errorEmail : "El email es incorrecto!!!!!!!!!!!",
    errorRequired : "Datos requeridos!!!!!!!!!!!",
    errorComentario : "El comentario está fuera de rango!!!!!!!!!!!",
    errorPassword : "El password es incorrecto!!!!!!!!!!!"
});
