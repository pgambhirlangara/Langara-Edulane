
const getCurrentCourseList = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).onSnapshot((snapshot) => {
                let val = snapshot.docChanges();
                generateAddDropCourseHTML(val)
            })
        }
    })
}

const generateAddDropCourseHTML = (data) => {
   
    data.forEach((val) => {

        val.doc.data().courses.forEach((courseVal) => {
            let courseSubContainer = document.createElement('div');

            let courseLI = document.createElement('button');
            let deleteCourse = document.createElement('button');
            let deleteIcon = document.createElement('i');

            courseLI.textContent = courseVal.name;
            deleteIcon.classList.add("fas", "fa-trash");
            courseSubContainer.classList.add("add-course-sub-container");
            courseLI.classList.add("accent-btn", "course-btn");
            deleteCourse.classList.add("accent-btn", "delete-btn");
            
            courseSubContainer.appendChild(courseLI);
            deleteCourse.appendChild(deleteIcon);
            courseSubContainer.appendChild(deleteCourse);
            addCourseContainer.appendChild(courseSubContainer);

        })


    });
}



getCurrentCourseList();