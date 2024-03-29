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
const finder = document.getElementById('profilePicFinder');
const takePicBtn = document.getElementById('takePic');
const snapBtn = document.getElementById('snap');
const snapAgainBtn = document.getElementById('takePicAgain');
const profilePicPlaceholder = document.getElementById('profilePicPlaceholder');
const profilePicCanvas = document.getElementById('profilePicCanvas');
const context = profilePicCanvas.getContext('2d');
context.scale(0.3, 0.3);

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

// Boot the device camera and show finder
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

// Show a preview when profile pic is selected from storage
let files;
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
}

// Function to pass in "toBlob" in the event listener for snapBtn
let objectURL;
function handleBlob(blob) {
  files = blob
  objectURL = window.URL.createObjectURL(blob);
}

/* ==========================================
    Event Listeners
============================================*/

// Click "take a picture" button and show the finder
takePicBtn.addEventListener('click', bootDeviceCamera)
snapAgainBtn.addEventListener('click', ()=> {
    // hide the canvas and "Once again button"
    profilePicCanvas.style.display = "none";
    snapAgainBtn.style.display = "none";
    bootDeviceCamera();
})

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
    profilePicCanvas.toBlob(handleBlob, 'image/jpeg')
})

// Click "Set profile picture"
setProfilePic.addEventListener('click', ()=> {
    if(objectURL !== undefined) {
        ImgChangeBtn.setAttribute('src', objectURL);
    }
    ImgChangeBtn.style.borderRadius = '50%';
    overlayToggle();
})