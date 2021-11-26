/* Set Initial position to the location of Langara college */
let currentLatitude = 49.224909417743305;
let currentLongitude = -123.10851741557572; 
let mapArea = document.getElementById('map-area');
let currentLatLang;

/* Declare an array to store friends with position attribute */
const friendsWithPos = [];

/* Get buttons in the UI */
const getCurrentPositionBtn = document.getElementById('getCurrentPosition')
const stopSharingPositionBtn = document.getElementById('stopSharingPosition')

/* ==============================
    Functions
============================== */

/* Initiate the map o loading*/
let map;
function initMap() {
  map = new google.maps.Map(mapArea, {
    center: { lat: currentLatitude, lng: currentLongitude },
    zoom: 19,
  });
}

/* Set the position marker of the current user*/
const showCurrentPositionMarker = ()=> {
  let infoWindow = new google.maps.InfoWindow();
  const position = {
    lat: currentLatitude,
    lng: currentLongitude,
  };
  infoWindow.setPosition(position);
  infoWindow.setContent("You are here!");
  infoWindow.open(map);
  map.setCenter(position);
  /* Set position data to Firebase document */
  db.collection("users").doc(auth.currentUser.uid).set({
    latitude: currentLatitude,
    longitude: currentLongitude,
  }, {merge: true});
}

/* Store friends with position value to "friendsWithPos" array */
const getFriendsInArr = async ()=> {
  const users = await db.collection("users").get();
  users.forEach((user) => {
    /* Exclude the current user */
    if(user.data().latitude && user.id !== auth.currentUser.uid)
    friendsWithPos.push({
      /* Store only nickName and position data */
      name: user.data().nickName,
      latitude: user.data().latitude,
      longitude: user.data().longitude});
  })
}

/* Set the position markers of all the friends on the map */
const showFriendsPositionMarker = ()=> {
  for (let i=0; i < friendsWithPos.length; i++) {
    let infoWindow = new google.maps.InfoWindow();
    let position = {
      lat: friendsWithPos[i].latitude,
      lng: friendsWithPos[i].longitude,
    };
    infoWindow.setPosition(position);
    infoWindow.setContent(friendsWithPos[i].name);
    infoWindow.open(map)
  }
}

/* ==============================
    Event Listeners
============================== */

let watchId // Variable to store watchId, which is passed to clearWatch().

/* Click "Share Location!" to show the markers */
getCurrentPositionBtn.addEventListener('click', ()=> {
  getCurrentPositionBtn.style.display = "none"
  stopSharingPositionBtn.style.display = "block"
  if ( navigator.geolocation ) {
      	watchId = navigator.geolocation.watchPosition( 
         ( position ) => {  
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;
            showCurrentPositionMarker();
            getFriendsInArr().then(()=> {
              showFriendsPositionMarker();
            })
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

/* Click "Stop Sharing" to stop the location tracking */
stopSharingPositionBtn.addEventListener('click', ()=> {
  getCurrentPositionBtn.style.display = "block"
  stopSharingPositionBtn.style.display = "none"
  navigator.geolocation.clearWatch(watchId);
})