/* ==========================================
    Elements to toggle pic upload overlay
============================================*/
const ImgChangeBtn = document.getElementById('profImgChangeBtn')
const picUploadOverlay = document.getElementById('picUploadOverlay')
const overlayCloseTxt = document.getElementById('overlayCloseTxt')

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

// Click "Snap!" to take a snapshot
snapBtn.addEventListener('click', ()=> {
    context.drawImage(finder, 0, 0)
    stopDeviceCamera();
    // show only thr canvas and "Once again" button
    finder.style.display = "none";
    snapBtn.style.display = "none";
    profilePicCanvas.style.display = "block";
    snapAgainBtn.style.display = "block";
})