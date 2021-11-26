let map;
let infoWindow;
/* Set Initial position to the location of Langara college */
let currentLatitude = 49.224909417743305;
let currentLongitude = -123.10851741557572; 
let mapArea = document.getElementById('map-area');
let currentLatLang;
const getCurrentPositionBtn = document.getElementById('getCurrentPosition')

/* ==============================
    Functions
============================== */

function initMap() {
  map = new google.maps.Map(mapArea, {
    center: { lat: currentLatitude, lng: currentLongitude },
    zoom: 19,
  });
}

const showCurrentPositionMarker = ()=> {
  infoWindow = new google.maps.InfoWindow();
   const position = {
     lat: currentLatitude,
     lng: currentLongitude,
   };
   infoWindow.setPosition(position);
   infoWindow.setContent("You are here!");
   infoWindow.open(map);
   map.setCenter(position);
}

/* ==============================
    Event Listeners
============================== */


getCurrentPositionBtn.addEventListener('click', ()=> {
  if ( navigator.geolocation ) {
      	navigator.geolocation.getCurrentPosition( 
         ( position ) => {  
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;
            db.collection("users").doc(auth.currentUser.uid).set({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }, {merge: true});
            initMap();
            showCurrentPositionMarker();
      	}, 
		( error ) => {
			if (	error.code == error.PERMISSION_DENIED ) {
				window.alert("Geolocation Permission Denied");
			}
		 });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
})