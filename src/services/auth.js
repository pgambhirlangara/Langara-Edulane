

  
const register = (e) => {
    e.preventDefault();
    // sign up the user & add firestore data
<<<<<<< HEAD
=======

>>>>>>> a42fdcc6c8aed6887c5056498b1571d8245670fa
    auth.createUserWithEmailAndPassword(studentEmail.value, studentPassword.value).then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        name: studentName.value,
        email: studentEmail.value,
        studentId: studentId.value,
        nickName: studentNickName.value,
        department: studentDepartment.value,
      });
    }).then(() => {
        /* Added by Hiroshi on Nov 21, to upload profile pic (Variables refer to "firstTimeLogin.js") */
        let newUid = auth.currentUser.uid;
        return storage.ref(`profilePics/${newUid}.jpg`).put(files);
    }).then(() => {
        alert("Account succesfully Created");
        window.location = "login.html";
    });

}

const login = (event) => {
    event.preventDefault();
  auth.signInWithEmailAndPassword(studentEmail.value, studentPassword.value).then((cred) => {
        alert("User Logged In!");
        window.location = "../home.html";
  });
}

const logout = () => {
    auth.signOut();
    alert("User Logged Out!");
    window.location = "login.html";
}


const validateEmail = (email) => {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email)) {
        return true;
    }
    return false;
}

const validatePassword = (password) => {
    if (password.length < 6) {
        return false;
    }
    return true;
}

const validateField = (field) => {
    if (!field) {
        return false;
    }
    return true;
}
