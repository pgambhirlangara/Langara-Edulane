/* ==========================================
    Elements to toggle pic upload overlay
============================================*/
const ImgChangeBtn = document.getElementById('profImgChangeBtn');
const picUploadOverlay = document.getElementById('picUploadOverlay');
const overlayCloseTxt = document.getElementById('overlayCloseTxt');
const setProfilePic = document.getElementById('setProfilePic');

/* ==========================================
    Elements to access the device camera
============================================*/
// Get video element(reflection of the camera) in the UI
const finder = document.getElementById('profilePicFinder');
// "Take a picture button"
const takePicBtn = document.getElementById('takePic');
// "Snap!" button
const snapBtn = document.getElementById('snap');
// "Once again button"
const snapAgainBtn = document.getElementById('takePicAgain');
// Profile pic placeholder
const profilePicPlaceholder = document.getElementById('profilePicPlaceholder');
// Get canvas element in the UI
const profilePicCanvas = document.getElementById('profilePicCanvas');
const context = profilePicCanvas.getContext('2d');
context.scale(0.5, 0.5);

/* ==========================================
    Functions related to the overlay
============================================*/
// Toggle the overlay
const overlayToggle = () => {
    picUploadOverlay.classList.toggle('overlay-on');
}
// Click "Change picture" and open the overlay
ImgChangeBtn.addEventListener('click', () => {
    overlayToggle();
})
// click "close" and close the overlay
overlayCloseTxt.addEventListener('click', () => {
    overlayToggle();
    // show only profile pic placeholder and "take picture" button
    profilePicCanvas.style.display = "none";
    finder.style.display = "none";
    snapAgainBtn.style.display = "none";
    snapBtn.style.display = "none";
    profilePicPlaceholder.style.display = "block";
    takePicBtn.style.display = "block";
    // Stop the camera if it is turned on
    if (finder.srcObject) {
        stopDeviceCamera();
    }
})

/* ==========================================
    Functions related to the device camera
============================================*/

// Boot the device camera
const bootDeviceCamera = ()=> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then( (stream) => {
      finder.srcObject = stream;
    }
    );
    // Show only Finder and "Snap!" button
    profilePicPlaceholder.style.display = "none";
    takePicBtn.style.display = "none";
    finder.style.display = "block";
    snapBtn.style.display = "block";
  } else {
    console.log("Media devices not available");
  }
}

// Turn off the device camera
const stopDeviceCamera = ()=> {
    const tracks = finder.srcObject.getTracks();
    tracks.forEach(track => track.stop());
}

// Click "take a picture" button and show the finder
takePicBtn.addEventListener('click', bootDeviceCamera)
snapAgainBtn.addEventListener('click', ()=> {
    // hide the canvas and "Once again button"
    profilePicCanvas.style.display = "none";
    snapAgainBtn.style.display = "none";
    bootDeviceCamera();
})

// Show a preview when profile pic is selected from storage
let files;
let reader1 = new FileReader();
function imagePreview(event) {
    let file = event.target.files[0];
    files = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event)=> {
        profilePicPlaceholder.setAttribute('src', reader.result);
        ImgChangeBtn.setAttribute('src', reader.result);
        ImgChangeBtn.style.borderRadius = '50%';
    }
    reader.readAsDataURL(file);
    console.log(files);
}

// Click "Snap!" to take a snapshot
snapBtn.addEventListener('click', ()=> {
    context.drawImage(finder, 0, 0)
    stopDeviceCamera();
    // show only the canvas and "Once again" button
    finder.style.display = "none";
    snapBtn.style.display = "none";
    profilePicCanvas.style.display = "block";
    snapAgainBtn.style.display = "block";
    // Turn the captured image into blob
    const imageBlob = profilePicCanvas.toBlob(handleBlob, 'image/jpeg')
    console.log(imageBlob);
})

// Function to pass in "toBlob" in the event listener for snapBtn
let objectURL = ""
let base64info = ""
function handleBlob(blob) {
  // we can turn the blob into DOMString
  objectURL = window.URL.createObjectURL(blob);
  const copyImg = document.createElement('img');
  copyImg.style.height = "250px";
  /* console.log(objectURL); */

  // we can turn the blob into base64 using FileReader
  /* const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.addEventListener('load', () => {
    console.log(reader.result);
  }); */
}

// Click "Set profile picture"
setProfilePic.addEventListener('click', ()=> {
    if(objectURL !== "") {
        ImgChangeBtn.setAttribute('src', objectURL);
    }
    ImgChangeBtn.style.borderRadius = '50%';
})

const firstLoginSubmitBtn = document.getElementById('firstLoginSubmitBtn');
const ProfilePicForm = document.getElementById('ProfilePicForm');

firstLoginSubmitBtn.addEventListener('click', ()=> {
    if(ProfilePicForm.value) {
        /* storage.ref('ProfilePics/').child(files.name).put(files); */
    } else {
        console.log('empty');
    }
})