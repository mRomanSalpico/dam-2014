$(function() {


//hacer comprobaciones sobre si se puede usar indexedDB en el navegador
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
 window.webkitIndexedDB || window.msIndexedDB;

if ('webkitIndexedDB' in window) {
window.IDBTransaction = window.IDBTransaction ||
 window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
 window.webkitIDBKeyRange || window.msIDBKeyRange;

}

function onerror(e) {
    console.log(e);
}

//creamos la base de datos
version = '2';
var request = indexedDB.open('pendientes',version);
request.onerror = function () {
    console.log('failed to open indexedDB');
};
var db = null;
request.onsuccess = function (event) { //una vez creada la BD hay que crear los objetos de la base de datos
    db=event.target.result;
};
request.onupgradeneeded = function(event) {
    db = event.target.result;
    if(db.objectStoreNames.contains('pendientes')) db.deleteObjectStore('pendientes');
    var store = db.createObjectStore('pendientes', { //se crea un identificador unico autoincrementable
                keyPath: 'identificador',
                autoIncrement: false
                });
    store.createIndex('text', 'text', { unique: false });
};


    function addTask(tarea){ //Funcion de añadir una tarea
        var transaction = db.transaction(['pendientes'], 'readwrite');
        var store = transaction.objectStore('pendientes');
        var data = {
            "text": tarea,
            "identificador": new Date().getTime(),
            "completada": false,
            "fecha": new Date().getTime()
        };
        var request = store.add(data);

        request.onsuccess = function(e) {
            console.log("Se ha añadido: "+e);
        };

        request.onerror = function(e) {
            console.log("Error añadiendo: ", e);
        };
    }

    function removeTask(tarea){ //Funcion de borrar una tarea
        var transaction = db.transaction(['pendientes'], 'readwrite');
        var store = transaction.objectStore('pendientes');
        var requestget = store.index("text").get(tarea);
        requestget.onsuccess = function(e) {
            var result = e.target.result;
            console.log(result);
            var request = store.delete(result.identificador);
        };
        request.onsuccess = function(e) {
            console.log("Se ha borrado: "+e);
        };

        request.onerror = function(e) {
            console.log("Error borrando: ", e);
        };
        return requestget;
    }

    function updateTask(identificador){ //Funcion de actualizar una tarea
        var transaction = db.transaction(['pendientes'], 'readwrite');
        var store = transaction.objectStore('pendientes');
        var requestget = store.get(identificador);
        requestget.onsuccess = function(e) {
            var result = e.target.result;
            result.text="Tarea modificada";
            resulr.fecha=new Date().getTime();
            var request = store.put(result);
        };
    }

    function getAllTaskCompleted(completada) {

        var transaction = db.transaction(["pendientes"]);
        var store = transaction.objectStore("pendientes");

        var cursorRequest = store.openCursor();

        var html = [];
        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;
            if(result === false) return;
            if (result) {
            if (result.completada === completada)
            html.push('<li> Tarea: ' + result.value.text +'    --- Completada:  ' + result.value.completada +'</li>');
            result.continue();
            }

        };

        cursorRequest.onerror = onerror;
    }

    function getAllTask() {

        var transaction = db.transaction(["pendientes"]);
        var store = transaction.objectStore("pendientes");

        var cursorRequest = store.openCursor();

        var html = [];
        cursorRequest.onsuccess = function(e) {
            var tareas = document.getElementById("tareas");
            var result = e.target.result;
            if (result) {
                html.push('<li> Tarea: ' + result.value.text +'    --- Completada:  ' + result.value.completada +'</li>');
                result.continue();
            }
            tareas.innerHTML = html.join('');
        };

        cursorRequest.onerror = onerror;
    }
$(document).on('click', '#mostrar',function(e){
    getAllTask();
});
$(document).on('click', '#nueva',function(e){
    var tarea = document.getElementById("tarea");
    addTask(tarea.value);
});
$(document).on('click', '#eliminar',function(e){
    var tarea = document.getElementById("tarea");

    var borrada = removeTask(tarea.value);
    console.log(borrada);
});

});