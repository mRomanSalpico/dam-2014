$(function() {


//sessionStorage
    var texto1 = document.getElementById('texto1');

    texto1.value=sessionStorage.getItem('texto1');

    $(document).on('keyup', '#texto1', function(e){
        sessionStorage.setItem('texto1', texto1.value);
    });

//localStorage
    var texto2 = document.getElementById('texto2');

    texto2.value=localStorage.getItem('texto2');

    $(document).on('keyup', '#texto2', function(e){
        localStorage.setItem('texto2', texto2.value);
    });


function handleStorage(event) {
 event = event || window.event; // support IE8
 var texto2 = document.getElementById('texto2');
 if (event.newValue !== texto2.value) { // se ha modificado
    texto2.value=localStorage.getItem('texto2');
 }
}
window.addEventListener('storage', handleStorage, false); //esto funciona en Chrome
//window.attachEvent('onstorage', handleStorage); // Esto para explorer

});