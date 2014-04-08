$(function() {

//TEngo unas variables globales para saber qué jugador y
//qué partida estoy jugando y los datos del mapa para mostrarlo.
var indexJugador=0; //variable de jugador inicial
var indexPartida=0; //variable de partida inicial
var longitude; //para el mapa
var latitude; //para mostrar el mapa

//hacer comprobaciones sobre si se puede usar indexedDB en el navegador
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
 window.webkitIndexedDB || window.msIndexedDB;

if ('webkitIndexedDB' in window) {
window.IDBTransaction = window.IDBTransaction ||
 window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
 window.webkitIDBKeyRange || window.msIDBKeyRange;

}

//creamos la base de datos
version = '6';
var request = indexedDB.open('jugadores',version);
request.onerror = function () {
    console.log('failed to open indexedDB');
};
var db = null;
request.onsuccess = function (event) {
    db=event.target.result;
    getInformacion(); //Una vez se tiene la BBDD creada se llama a la funcion que va a cargar los datos
};
request.onupgradeneeded = function(event) { //Ha cambiado la version o es la primera vez
    db=event.target.result;
    if(db.objectStoreNames.contains('jugadores')) db.deleteObjectStore('jugadores');
    var store = db.createObjectStore('jugadores', { //se crea un identificador unico
                keyPath: 'id',
                autoIncrement: false
                });
    getInformacion(); //Una vez se tiene la BBDD creada se llama a la funcion que va a cargar los datos
};


//CARGA DE DATOS DESDE EL JSON A UNA BBDD INDEXEDDB
    function getInformacion() { //Funcion que se lanza al principio para cargar el json en la BBDD
         var tweets = $.ajax({ url : 'data/show.json',
                                dataType: 'json',
                                cache : false,
                                success: function(data, textStatus, jqXHR){
                                    //Se ha obtenido el JSON, y para cada jugador juardo la informacion
                                    for (var i = 0; i < data.players.length; i++) {
                                        addJugador(data.players[i],i);
                                    }
                                },
                                error : function(jqXHR, textStatus, errorThrown){
                                    console.log(errorThrown);
                                }
            });
    }

    function addJugador(jugador){ //Se guarda los datos de un jugador del JSON
        var transaction = db.transaction(['jugadores'], 'readwrite');
        var store = transaction.objectStore('jugadores');
        var data = {
            "id": jugador.player.id,
            "name": jugador.player.name,
            "age": jugador.player.age,
            "description": jugador.player.description,
            "photo": jugador.player.photo,
            "challenges": jugador.challenges
        };
        var request = store.add(data);

        request.onerror = function(e) {
            console.log("Error añadiendo: ", e);
        };
    }


// FIN CARGA DE DATOS DESDE EL JSON A UNA BBDD INDEXEDDB




    function comenzarPartida(indiceJugador, indicePartida) {

        var transaction = db.transaction(["jugadores"]);
        var store = transaction.objectStore("jugadores");
        var cursorRequest = store.openCursor();
        var html = [];
        cursorRequest.onsuccess = function(e) {
            var opciones = document.getElementById("opciones");
            var result = e.target.result;
            if (result) {
                if(indiceJugador === result.value.id ){
                    //Pongo las dos fotos con el data-valida de la opcion que es la correcta
                    html.push('<li> Elige una opción entre las siguientes: </li>');
                    html.push('<li> <input id="option1" class="botonImagen" type="button" value="Elegir" data-valida='+result.value.challenges[indicePartida].selected+'><img src="' + result.value.challenges[indicePartida].option1.photo +'" width="100" height="100""></li>');
                    html.push('<li> <input id="option2" class="botonImagen" type="button" value="Elegir" data-valida='+result.value.challenges[indicePartida].selected+'><img src="' + result.value.challenges[indicePartida].option2.photo +'" width="100" height="100""></li>');
                    html.push('<li> <input id="mostrarMapa" type="button" value="Mostrar mapa de localización" ></li>');

                    //guardo direccion para el mapa
                    latitude = result.value.challenges[indexPartida].place.latitude;
                    longitude =result.value.challenges[indexPartida].place.longitude;
                }
                result.continue();
            }
            opciones.innerHTML = html.join('');
        };
    }

    function getJugador(indice) {

        var transaction = db.transaction(["jugadores"]);
        var store = transaction.objectStore("jugadores");
        var cursorRequest = store.openCursor();
        var html = [];
        cursorRequest.onsuccess = function(e) {
            var jugador = document.getElementById("jugador");
            var result = e.target.result;
            if (result) {
                if(indice ===result.value.id ){
                    html.push('<li> Nombre: ' + result.value.name +'</li>');
                    html.push('<li> Edad: ' + result.value.age +'</li>');
                    html.push('<li> Descripcion: ' + result.value.description +'</li>');
                    html.push('<li> Imagen: <img src="' + result.value.photo +'" width="100" height="100""></li>');
                }
                result.continue();
            }
            jugador.innerHTML = html.join('');
        };
    }

    function comprobar(objeto) {

        if(objeto[0].id===objeto[0].dataset.valida){
            indexPartida++;
            if (indexPartida==2){indexPartida=0;indexJugador++;}
            if (indexJugador==2){alert("partida terminada");indexPartida=0;indexJugador=0;}
            comenzarPartida(indexJugador,indexPartida);
            mostrarMapa();
            }
        else
            alert("selección incorrecta");
    }

    function mostrarMapa() {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

        document.querySelector('article').appendChild(mapcanvas);

        navigator.geolocation.getCurrentPosition(function (position) {

            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var latlngJuego = new google.maps.LatLng(latitude, longitude);

            var myOptions = {
                zoom: 15,
                center: latlngJuego,
                mapTypeControl: false,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                enableHighAccuracy: true
            };
            var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: "¡Usted está aquí! "+position.coords.latitude + " Longitud: "+  position.coords.longitude+""
            });

            var marker2 = new google.maps.Marker({
                position: latlngJuego,
                map: map,
                title: "¡El juego está aqui! "+position.coords.latitude + " Longitud: "+  position.coords.longitude+""
            });

        });

    }


//EVENTOS ONCLICK


$(document).on('click', '#mostrar',function(e){ //mostrar datos del jugador
    getJugador(indexJugador);
});
$(document).on('click', '#siguienteJugador',function(e){ //mostrar datos del jugador
    indexJugador++;
    if (indexJugador>1) indexJugador=1;

});
$(document).on('click', '#anteriorJugador',function(e){ //mostrar datos del jugador
    indexJugador--;
    if (indexJugador<0) indexJugador=0;
});

$(document).on('click', '#empezar',function(e){ //Empezar la partida
    comenzarPartida(indexJugador,indexPartida);
});

$(document).on('click', '#option1',function(e){ //Comprobar si la opcion1 es la buena
    $this=$(this);
    comprobar($this);
});
$(document).on('click', '#option2',function(e){ //Comprobar si la opcion2 es la buena
    $this=$(this);
    comprobar($this);
});
$(document).on('click', '#mostrarMapa',function(e){ //Mostrar el mapa
    mostrarMapa();
});


});