const addCourseToCollege = (e) => {
    e.preventDefault();
      return db.collection("courses").doc().set({
        name: courseName.value,
        department: courseDepartment.value,
        inTake: courseIntake.value,
        startDate: courseStartDate.value,
        crn: courseCRN.value,
        endDate: courseEndDate.value,
        description: courseDescription.value
    }).then(() => {
        alert("Course succesfully Created");
        // window.location = "login.html";
    });
}

const getCourseList = (e) => {
    db.collection('courses').get().then(snapshot => {
        generateSearchCourseHTML(snapshot.docs);
    });
}

const generateAddDropCourseHTML = (data) => {
    let courseSubContainer = document.createElement('div');
   
    data.forEach((val) => {
        let courseLI = document.createElement('button');
        let deleteCourse = document.createElement('button');
        let deleteIcon = document.createElement('i');
        
        courseLI.textContent = val.data().name;
        deleteIcon.classList.add("fas", "fa-trash");
        courseSubContainer.classList.add("add-course-sub-container");
        courseLI.classList.add("accent-btn", "course-btn");
        deleteCourse.classList.add("accent-btn", "delete-btn");
        
        courseSubContainer.appendChild(courseLI);
        deleteCourse.appendChild(deleteIcon);
        courseSubContainer.appendChild(deleteCourse);
        addCourseContainer.appendChild(courseSubContainer);
    });
}


const generateSearchCourseHTML = (data) => {
    data.forEach((val) => {
        let courseSubContainer = document.createElement('div');
        let searchCourseImageContainer = document.createElement('div');
        let searchCourseImage = document.createElement('img');
        let searchCourseContent = document.createElement('div');
        let courseTitle = document.createElement('h4');
        let searchCourseNameContainer = document.createElement('div');
        let checkBox = document.createElement('input');
        let searchCourseDescriptionContainer = document.createElement('div');
        let description = document.createElement('span');
        let plusContainer = document.createElement('div');
        let plusIcon = document.createElement('i');

        checkBox.type = "checkbox";
        plusIcon.classList.add('fas', 'fa-plus');

        courseSubContainer.classList.add('search-course-sub-container');
        searchCourseImageContainer.classList.add('search-course-img');
        searchCourseContent.classList.add('search-course-content');
        searchCourseNameContainer.classList.add('search-course-name-container');
        searchCourseDescriptionContainer.classList.add('search-course-description-container');
        description.classList.add('text-ellipses-2');
        plusContainer.classList.add('plus-course-container');

        courseSubContainer.appendChild(searchCourseImageContainer);
        courseSubContainer.appendChild(searchCourseContent);

        courseTitle.textContent = val.data().name;
        searchCourseNameContainer.appendChild(courseTitle);
        searchCourseNameContainer.appendChild(checkBox);

        searchCourseDescriptionContainer.appendChild(description);
        plusContainer.appendChild(plusIcon);
        searchCourseDescriptionContainer.appendChild(plusContainer);
        searchCourseContent.appendChild(searchCourseNameContainer);
        searchCourseContent.appendChild(searchCourseDescriptionContainer);

        searchCourseImage.setAttribute('src', "../assets/images/profile-placeholder.svg");
        searchCourseImageContainer.appendChild(searchCourseImage);


        description.textContent = val.data().description;

        searchCourseContainer.appendChild(courseSubContainer);
    });
}

// Fetch all the course list that exists
getCourseList();
