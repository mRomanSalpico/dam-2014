$(function () {
    "use strict";

    // Obtener los elementos del DOM

    // Mi color asignado por el servidor
    var myColor = false;
    // Mi nick
    var myName = false;

    // Comprobar la disponibilidad de Web Socket en el navegador
    if (Modernizr.websockets) {
        console.log("Si se soporta webSokets");
    } else{
        console.log("NO se soporta webSokets");
        return false;
    }

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket){
        console.log("NO se soporta webSokets");
    }

    // Abrir la conexion con ws://www.arkaitzgarro.com:1337
    var socket = new WebSocket('ws://www.arkaitzgarro.com:1337');
    // 1. Al abrir la conexión, solicitar el nick.
    socket.onopen  = function(e){
        console.log("Welcome - status "+this.readyState);
        var $status = $('#status');
        $status[0].innerHTML="Introduce tu nick:";

        var $input = $('#input');
        $input.removeAttr("disabled");
     };
    // 2. Controlar posibles errores del servidor.
    socket.onerror = function(e){
        console.log("se ha producido un error al abrir el websocket");
    };
    // 3. Escucar los mensajes del servidor, y mostrarlos en el elemento "content"
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data.type === 'color') {
            console.log("me viene mensaje de color");
            myColor = data.data;
            var $status = $('#status');
            console.log(myColor);
            $status[0].innerHTML=myName;
            $status.css("color",myColor);

        } else  if (data.type === 'history'){
            console.log("me viene mensaje de history");
            var content = document.getElementById("content");
            var html = [];
            for (var i = 0; i < data.data.length; i++) {
                console.log(data.data[i]);
                addMessage(data.data[i].author, data.data[i].text, data.data[i].color, new Date(data.data[i].time));
            }

        } else  if (data.type === 'message'){
            addMessage(data.data.author, data.data.text, data.data.color, new Date(data.data.time));
            console.log("me viene mensaje de message");
        }
    };
    // 4. La estructura del objeto enviado por el servidor es la siguiente:
    //      {
    //          // Contiene el tipo de mensaje recibido
    //          type : @string in ['color', 'history', 'message'],
    //          // Contiene los datos según el tipo de mensaje recibido
    //          data: @Object {author, text, color, time}
    //      }
    // 5. Enviar un mensaje al pulsar enter. El mensaje enviado es únicamente la cadena de caracteres.
    $(document).on('click', '#enviar',function(e){
        myName = $('#input')[0].value;
        socket.send(myName);
    });

    /**
     * Añadir el mensaje a la ventana de chat
     */
    function addMessage(author, message, color, dt) {
        $('#content').prepend('<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
});