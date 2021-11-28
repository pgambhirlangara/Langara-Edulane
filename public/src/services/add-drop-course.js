let userCourses = [];
let userCourseID = "";

const getCurrentCourseList = () => {
    addCourseContainer.innerHTML = '<div class="loader"></div>';
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).onSnapshot((snapshot) => {
                let val = snapshot.docChanges();
                addCourseContainer.innerHTML = "";
                userCourses = val[0].doc.data().courses;
                userCourseID = val.length > 0 ? val[0].doc.id: "";
                generateAddDropCourseHTML(userCourses)
            })
        } else {
            window.location = '../components/auth/login.html';
        }
    })
}


const generateAddDropCourseHTML = (data) => {
    console.log(userCourses, "USER COURSSES");
    if (data.length === 0) {
        addCourseContainer.innerHTML = "You currently have no courses";
    } else {
            data.forEach((courseVal) => {
                let courseSubContainer = document.createElement('div');
    
                let courseLI = document.createElement('button');
                // const IdToDelete = val.doc.id;
                let deleteButton = `<button class="accent-btn delete-btn" onclick="deleteCourseFromUser(${JSON.stringify(courseVal).split('"').join("&quot;")})"><i class="fas fa-trash"></i></button>`;
    
                courseLI.textContent = courseVal.name;
                courseSubContainer.classList.add("add-course-sub-container");
                courseLI.classList.add("accent-btn", "course-btn");
                
                courseSubContainer.appendChild(courseLI);
                courseSubContainer.innerHTML += deleteButton;
                addCourseContainer.appendChild(courseSubContainer);
    
            })
    
    }

}

const deleteCourseFromUser = (val) => {
    const index = userCourses.findIndex((course) => course.crn === val.crn);
    userCourses.splice(index, 1);
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection(user.uid)
            .doc(userCourseID)
            .set({
                courses: userCourses,
            })
            .then(() => {
              alert("Course Dropped Succesfully");
              getCurrentCourseList();
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
    });
}


getCurrentCourseList();