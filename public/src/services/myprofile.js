/* ==========================================
    Elements to toggle pic upload overlay
============================================*/
const picUploadOverlay = document.getElementById("picUploadOverlay");
const overlayCloseTxt = document.getElementById("overlayCloseTxt");
const setProfilePic = document.getElementById("setProfilePic");

/* ==========================================
    Elements to access the device camera
============================================*/
const takePicBtn = document.getElementById("takePic");
const snapBtn = document.getElementById("snap");
const snapAgainBtn = document.getElementById("takePicAgain");
const profilePicPlaceholder = document.getElementById("profilePicPlaceholder");
const profilePicCanvas = document.getElementById("profilePicCanvas");
const context = profilePicCanvas.getContext("2d");
context.scale(0.3, 0.3);

/* ==========================================
    Functions related to the device camera
============================================*/

// Toggle the overlay
const overlayToggle = () => {
  picUploadOverlay.classList.toggle("overlay-on");
};


// Boot the device camera and show finder
const bootDeviceCamera = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      profilePicFinder.srcObject = stream;
    });
    // Show only Finder and "Snap!" button
    profilePicPlaceholder.style.display = "none";
    takePicBtn.style.display = "none";
    profilePicFinder.style.display = "block";
    snapBtn.style.display = "block";
  } else {
    console.log("Media devices not available");
  }
};

takePicBtn.addEventListener('click', bootDeviceCamera)

// Turn off the device camera
const stopDeviceCamera = () => {
  const tracks = profilePicFinder.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
};

// Show a preview when profile pic is selected from storage
let files;
function imagePreview(event) {
  let file = event.target.files[0];
  files = event.target.files[0];
  let reader = new FileReader();
  reader.onload = (event) => {
    profilePicPlaceholder.setAttribute("src", reader.result);
    myProfileImage.setAttribute("src", reader.result);
    myProfileImage.style.borderRadius = "50%";
  };
  reader.readAsDataURL(file);
}

// Function to pass in "toBlob" in the event listener for snapBtn
let objectURL;
function handleBlob(blob) {
  files = blob;
  objectURL = window.URL.createObjectURL(blob);
}

// Click "Snap!" to take a snapshot
snapBtn.addEventListener("click", () => {
  context.drawImage(finder, 0, 0);
  stopDeviceCamera();
  // show only the canvas and "Once again" button
  profilePicFinder.style.display = "none";
  snapBtn.style.display = "none";
  profilePicCanvas.style.display = "block";
  snapAgainBtn.style.display = "block";
  // Turn the captured image into blob
  profilePicCanvas.toBlob(handleBlob, "image/jpeg");
});

// Click "Set profile picture"
setProfilePic.addEventListener("click", () => {
  if (objectURL !== undefined) {
    myProfileImage.setAttribute("src", objectURL);
  }
  myProfileImage.style.borderRadius = "50%";
  overlayToggle();
});

/* Get the current username and show on the top bar */
const getUserProfile = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  if (userDoc.exists) {
    myProfileName.value = userDoc.data().name;
    myProfileNickName.value = userDoc.data().nickName;
    myProfileEmail.value = userDoc.data().email;
    myProfileId.value = userDoc.data().studentId;
    myProfileDepartment.value = userDoc.data().department;
  } else {
    console.log("user not find");
  }
};

/* Get the current user photo and show on the top bar */
const getUserProfileImage = async (userId) => {
  const userPic = storage.ref().child(`profilePics/${userId}.jpg`);
  if (userPic) {
    userPic.getDownloadURL().then((url) => {
      myProfileImage.src = url;
    });
  }
};

const getUser = () => {
  myProfileForm.innerHTML = '<div class="loader"></div>';
  auth.onAuthStateChanged((user) => {
    getUserProfile(user.uid);
    getUserProfileImage(user.uid);
    myProfileForm.innerHTML = `
      <div class="first-login-img-container">
      <a href="#"><img style="border-radius: 50%" src="../assets/images/firstTimeLoginImage-placeholder.svg" alt="Change Picture" id="myProfileImage"></a>
  </div>
  <div class="first-login-info-title">
      <h2>Personal Information</h2>
  </div>
        <div class="first-login-form-row">
        <label for="myProfileName">Name</label>
        <input type="text" name="myProfileName" id="myProfileName" placeholder="Required" 
        required>
        <div class="form-required-circle"></div>
    </div>
    <div class="first-login-form-row">
        <label for="myProfileNickName">Nick name</label>
        <input type="text" name="myProfileNickName" id="myProfileNickName" placeholder="Required" required>
        <div class="form-required-circle"></div>
    </div>
    <div class="first-login-form-row">
        <label for="myProfileEmail">Email</label>
        <input type="email" disabled name="myProfileEmail" id="myProfileEmail" placeholder="Required" required>
        <div class="form-required-circle"></div>
    </div>
    <div class="first-login-form-row">
        <label for="myProfileId">Student ID</label>
        <input type="number" disabled name="myProfileId" id="myProfileId" placeholder="Required" required>
        <div class="form-required-circle"></div>
    </div>
    <div class="first-login-form-row">
        <label for="myProfileDepartment">Department</label>
        <input type="text" disabled name="myProfileDepartment" id="myProfileDepartment" placeholder="Required" required>
        <div class="form-required-circle"></div>
    </div>
    <input type="file" name="ProfilePicForm" id="ProfilePicForm" onchange="imagePreview(event);"> <!-- Hidden input -->
    <div class="submitButton" id="firstLoginSubmitBtn">
        <button class="primary-btn" type="submit">Save Changes</button>
        <a href="../components/home.html">Cancel</a>
    </div>
        `;

    // Click "Change picture" and open the overlay
    myProfileImage.addEventListener("click", () => {
      overlayToggle();
    });

    // click "close" and close the overlay
    overlayCloseTxt.addEventListener("click", () => {
      overlayToggle();
      // show only profile pic placeholder and "take picture" button
      profilePicCanvas.style.display = "none";
      profilePicFinder.style.display = "none";
      snapAgainBtn.style.display = "none";
      snapBtn.style.display = "none";
      profilePicPlaceholder.style.display = "block";
      takePicBtn.style.display = "block";
      // Stop the camera if it is turned on
      if (profilePicFinder.srcObject) {
        stopDeviceCamera();
      }
    });
  });
};

const updateUserProfile = (e) => {
  e.preventDefault();
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .update({
          name: myProfileName.value,
          nickName: myProfileNickName.value,
        })
        .then(() => {
            if (files) {
                return storage.ref(`profilePics/${user.uid}.jpg`).put(files);
            }
        })
        .then(() => {
          alert("Succesfully Updated");
          window.location = "../components/home.html"
        });
    }
  });
};

getUser();
