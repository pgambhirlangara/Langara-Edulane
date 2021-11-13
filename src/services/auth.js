const register = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(studentEmail.value, studentPassword.value)
    .then(() => {
        const user = auth.currentUser;

        // Add to firebase
        const databaseRef = database.ref();

        // Create User data
        const userData = {
            name: studentName.value,
            email: studentEmail.value,
            studentId: studentId.value,
            nickName: studentNickName.value,
            department: studentDepartment.value,
            lastLogin: Date.now(),
        }

        databaseRef.child('users/' + user.uid).set(userData);
        alert("Account succesfully Created");
        window.location = "login.html";
    })
    .catch((error) => {
        alert(error.message);
    })

}

const login = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(studentEmail.value, studentPassword.value)
    .then(() => {
        const user = auth.currentUser;

        // Add to firebase
        const databaseRef = database.ref();

        // Create User data
        const userData = {
            lastLogin: Date.now(),
        }

        databaseRef.child('users/' + user.uid).update(userData);
        alert("User Logged In!");
        window.location = "../home.html";
    })
    .catch((error) => {
        alert(error.message);
    })
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
