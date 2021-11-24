
const getCurrentCourseList = () => {
    addCourseContainer.innerHTML = '<div class="loader"></div>';
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).onSnapshot((snapshot) => {
                let val = snapshot.docChanges();
                addCourseContainer.innerHTML = "";
                generateAddDropCourseHTML(val)
            })
        }
    })
}

const generateAddDropCourseHTML = (data) => {
    
    if (data.length === 0) {
        addCourseContainer.innerHTML = "You currently have no courses";
    } else {
        data.forEach((val) => {

            val.doc.data().courses.forEach((courseVal) => {
                let courseSubContainer = document.createElement('div');
    
                let courseLI = document.createElement('button');
                const IdToDelete = val.doc.id;
                let deleteButton = `<button class="accent-btn delete-btn" onclick="deleteCourseFromUser(${JSON.stringify(IdToDelete).split('"').join("&quot;")})"><i class="fas fa-trash"></i></button>`;
    
                courseLI.textContent = courseVal.name;
                courseSubContainer.classList.add("add-course-sub-container");
                courseLI.classList.add("accent-btn", "course-btn");
                
                courseSubContainer.appendChild(courseLI);
                courseSubContainer.innerHTML += deleteButton;
                addCourseContainer.appendChild(courseSubContainer);
    
            })
    
    
        });
    }

}

const deleteCourseFromUser = (id) => {
    console.log(id);
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).doc(id).delete();
            alert('successfullt deleted');
        }
    })
}


getCurrentCourseList();