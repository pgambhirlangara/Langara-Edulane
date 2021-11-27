/* Set Initial position to the location of Langara college */
let currentLatitude = 49.224909417743305;
let currentLongitude = -123.10851741557572; 
let mapArea = document.getElementById('map-area');
let currentLatLang;

/* Declare an array to store friends with position attribute */
let friendsWithPos = [];

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
let myInfoWindow = [];
const showCurrentPositionMarker = ()=> {
  myInfoWindow.push(new google.maps.InfoWindow());
  const position = {
    lat: currentLatitude,
    lng: currentLongitude,
  };
  myInfoWindow[0].setPosition(position);
  myInfoWindow[0].setContent("You are here!");
  myInfoWindow[0].open(map);
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
let friendsInfoWindows = [];
const showFriendsPositionMarker = ()=> {
  for (let i=0; i < friendsWithPos.length; i++) {
    friendsInfoWindows.push(new google.maps.InfoWindow());
    let position = {
      lat: friendsWithPos[i].latitude,
      lng: friendsWithPos[i].longitude,
    };
    friendsInfoWindows[i].setPosition(position);
    friendsInfoWindows[i].setContent(friendsWithPos[i].name);
    friendsInfoWindows[i].open(map)
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
  getFriendsInArr().then(()=> {
    showFriendsPositionMarker()
  });
  if ( navigator.geolocation ) {
      	watchId = navigator.geolocation.watchPosition( 
         ( position ) => {  
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;
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

/* Click "Stop Sharing" to stop the location tracking */
stopSharingPositionBtn.addEventListener('click', ()=> {
  getCurrentPositionBtn.style.display = "block"
  stopSharingPositionBtn.style.display = "none"
  navigator.geolocation.clearWatch(watchId);
  friendsWithPos = [];
  myInfoWindow[0].close();
  myInfoWindow = [];
  for (let i=0; i < friendsInfoWindows.length; i++) {
    friendsInfoWindows[i].close();
  }
})