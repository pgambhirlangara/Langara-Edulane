const register = (e) => {
  e.preventDefault();
  // sign up the user & add firestore data
  auth
    .createUserWithEmailAndPassword(studentEmail.value, studentPassword.value)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        name: studentName.value,
        email: studentEmail.value,
        studentId: studentId.value,
        nickName: studentNickName.value,
        department: studentDepartment.value,
      });
    })
    .then(() => {
      /* Added by Hiroshi on Nov 21, to upload profile pic (Variables refer to "firstTimeLogin.js") */
      let newUid = auth.currentUser.uid;
      return storage.ref(`profilePics/${newUid}.jpg`).put(files);
    })
    .then(() => {
      alert("Account successfully Created");
      window.location = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

const login = (event) => {
  event.preventDefault();
  auth
    .signInWithEmailAndPassword(studentEmail.value, studentPassword.value)
    .then((cred) => {
      alert("User Logged In!");
      window.location = "../home.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

const resetPasswordEmail = (event) => {
  event.preventDefault();
  auth
    .sendPasswordResetEmail(resetEmail.value)
    .then(function () {
      // Password reset email sent.
      alert("Reset Link sent to your email succesfully");
    })
    .catch(function (error) {
      // Error occurred. Inspect error.code.
      alert(error.message);
    });
};

const resetPassword = (event) => {
  event.preventDefault();

  if (newPassword.value !== matchPassword.value) {
    alert("Password don't match");
    return;
  }
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      user
        .updatePassword(newPassword.value)
        .then(function () {
          alert("Password Changed!")
          window.location = "../home.html";
        })
        .catch(function (error) {
          // An error happened.
          alert(error.message);
        });
    }
  });
};

const logout = () => {
  auth.signOut();
  alert("User Logged Out!");
  window.location = "../auth/login.html";
};



/* Script to toggle the hamburger menu: configured by Tainara on Nov. 25 */
function openNav() {
  document.getElementById("myNav").style.height = "100%";
  document.getElementById("menuToggle").style.display = "none";
  document.getElementById("closeBtn").style.display = "block";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
  document.getElementById("menuToggle").style.display = "block";
  document.getElementById("closeBtn").style.display = "none";
}
