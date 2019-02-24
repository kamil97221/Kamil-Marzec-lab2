window.addEventListener("DOMContentLoaded", start);


let Gamma;
let Beta;
let marker;
let map;
let pozycja;
let id2;
let id1;
let id3;
let id4;




function start() {



    window.addEventListener('deviceorientation', ruch);

}

function Pozycja(positio) {

    let geoPos = {
        lat: positio.coords.latitude,
        lng: positio.coords.longitude,
    }
    map.setCenter(geoPos);
    marker.setPosition(geoPos);
    map.setZoom(13);

}

function getLocalization(){
     
      navigator.geolocation.getCurrentPosition(geoOk,geoFail)
  }

       function geoOk(data){
      let coords = {
      lat: data.coords.latitude,
      lng: data.coords.longitude
    }
    map.setCenter(coords)
    marker.setPosition(coords)
  }
// geo fail jeszcze raz zgoda
  function geoFail(err){
      alert("Sorki, nie zadziałam bez lokalizacji :). Wyraz zgode jeszcze raz !");
      getLocalization();
  }
/////// Poruszanie klawiszami
/*function addKeyboardEvents() {
    window.addEventListener('keydown', poruszMarkerem)
}
function poruszMarkerem(ev) {
    let lat = marker.getPosition().lat()
    let lng = marker.getPosition().lng()
 
    switch (ev.code) {
        case 'ArrowUp':
            lat += 0.1
            break;
        case 'ArrowDown':
            lat -= 0.1
            break;
        case 'ArrowLeft':
            lng -= 0.1
            break;
        case 'ArrowRight':
            lng += 0.1
            break;
    }*/
function initMap() {

    navigator.geolocation.getCurrentPosition(Pozycja);
    let id = navigator.geolocation.watchPosition(Pozycja);

    map = new google.maps.Map(document.querySelector("#mapa"), {
        zoom: 4,

    });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        // Moj marker
        icon: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Ball-Pink.png' // Moj marker
    });
}

function ruch(e) {

    Beta = Math.round(e.beta);
    Gamma = Math.round(e.gamma);


    // Porszuanie markerem  za pomocą sensorów
    //Beta góra
    if (Beta > 0) {
        if (id1 == null) {
            cancelAnimationFrame(id2);
            id2 = null;
            zwiekszBete(e);

        }

    }
    // doł
    if (Beta < 0) {

        if (id2 == null) {
            cancelAnimationFrame(id1);
            id1 = null;
            zmniejszBete(e);

        }
    }
    //gamma góra
    if (Gamma < 0) {
        if (id3 == null) {
            cancelAnimationFrame(id4);
            id4 = null;
            zwiekszGamme(e);
        }

    }
    //gamma w dół
    if (Gamma > 0) {
        if (id4 == null) {
            cancelAnimationFrame(id3);
            id3 = null
            zmniejszGamme(e);
        }
    }

    //znimuje bete
    function zwiekszBete(e) {
        if (Beta > 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat() - skalowanie(Beta), marker.getPosition().lng());
            marker.setPosition(latlng);

            console.log("zwieksza");
        }
        id1 = requestAnimationFrame(zwiekszBete);

    }
    //animacja zmniejszania
    function zmniejszBete(e) {
        if (Beta < 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat() - skalowanie(Beta), marker.getPosition().lng());
            marker.setPosition(latlng);

            console.log(Beta);
        }
        id2 = requestAnimationFrame(zmniejszBete);
    }
    //taka sama funkcja dla gammy 
    function zwiekszGamme(e) {
        if (Gamma < 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng() - skalowanie(Gamma * -1));
            marker.setPosition(latlng);
        }
        id3 = requestAnimationFrame(zwiekszGamme);
    }
    //Porszuanie sie po mapie

    function zmniejszGamme(e) {
        if (Gamma > 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng() - skalowanie(Gamma * -1));
            marker.setPosition(latlng);
        }
        id4 = requestAnimationFrame(zmniejszGamme);
    }

}

//Szybsza beta

function skalowanie(Beata) {
    return 0.0001 * (Beata / 30);
}
getLocalization();