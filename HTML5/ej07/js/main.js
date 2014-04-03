$(document).ready(function() {
    // Calcular posición


    function showMap() {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

        document.querySelector('article').appendChild(mapcanvas);

        navigator.geolocation.watchPosition(function (position) {

            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var myOptions = {
                zoom: 15,
                center: latlng,
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
            var status = document.getElementById('status');
            status.innerHTML="Encontrado!! " +
                             " Latitud: "+position.coords.latitude +
                             " Longitud: "+  position.coords.longitude +
                             " Altitud: "+  position.coords.altitude +
                             " altitudeAccuracy: "+  position.coords.altitudeAccuracyheading +
                             " heading: "+  position.coords.heading +
                             " velocidad: "+ position.coords.speed;

        });

    }
    showMap();
});