let courseList = [];
let tempCourseList = [];
let selectedCourses = [];
<<<<<<< HEAD
=======
let currentUser;
>>>>>>> a42fdcc6c8aed6887c5056498b1571d8245670fa

const addCourseToCollege = (e) => {
  e.preventDefault();
  return db
    .collection("courses")
    .doc()
    .set({
      name: courseName.value,
      department: courseDepartment.value,
      inTake: courseIntake.value,
      startDate: courseStartDate.value,
      crn: courseCRN.value,
      endDate: courseEndDate.value,
      description: courseDescription.value,
    })
    .then(() => {
      alert("Course succesfully Created");
    });
};

const getCourseList = (e) => {
  searchCourseContainer.innerHTML = '<div class="loader"></div>';
  db.collection("courses")
    .get()
    .then((snapshot) => {
      courseList = snapshot.docs.map((item) => item.data());
      tempCourseList = courseList;
      generateSearchCourseHTML(courseList);
    });
};

<<<<<<< HEAD
// Move to its suitable file (TODO)
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


=======
>>>>>>> a42fdcc6c8aed6887c5056498b1571d8245670fa
const generateSearchCourseHTML = (data) => {
<<<<<<< HEAD
    searchCourseContainer.innerHTML = "";
    data.forEach((val) => {
        let courseSubContainer = document.createElement('div');
        let searchCourseImageContainer = document.createElement('div');
        let searchCourseImage = document.createElement('img');
        let searchCourseContent = document.createElement('div');
        let courseTitle = document.createElement('h4');
        let searchCourseNameContainer = document.createElement('div');
        // let checkBox = document.createElement('input');
        let searchCourseDescriptionContainer = document.createElement('div');
        let description = document.createElement('span');
        let plusContainer = document.createElement('div');
        let plusIcon = document.createElement('i');

        // checkBox.type = "checkbox";
        plusIcon.classList.add('fas', 'fa-plus');

<<<<<<< HEAD
        // checkBox.setAttribute('id', val.crn);
        let checkBox = `<input type='checkbox' onclick='selectCourse(${val.crn})'/>`;
=======
        let checkBox = `<input type='checkbox' onclick='selectCourse(${JSON.stringify(val).split('"').join("&quot;")}})'/>`;
>>>>>>> a42fdcc6c8aed6887c5056498b1571d8245670fa


        courseSubContainer.classList.add('search-course-sub-container');
        searchCourseImageContainer.classList.add('search-course-img');
        searchCourseContent.classList.add('search-course-content');
        searchCourseNameContainer.classList.add('search-course-name-container');
        searchCourseDescriptionContainer.classList.add('search-course-description-container');
        description.classList.add('text-ellipses-2');
        plusContainer.classList.add('plus-course-container');

        courseSubContainer.appendChild(searchCourseImageContainer);
        courseSubContainer.appendChild(searchCourseContent);

        courseTitle.textContent = `${val.crn} ${val.name}`;
        searchCourseNameContainer.appendChild(courseTitle);
        searchCourseNameContainer.innerHTML += checkBox;
        // searchCourseNameContainer.appendChild(checkBox);

        searchCourseDescriptionContainer.appendChild(description);
        plusContainer.appendChild(plusIcon);
        searchCourseDescriptionContainer.appendChild(plusContainer);
        searchCourseContent.appendChild(searchCourseNameContainer);
        searchCourseContent.appendChild(searchCourseDescriptionContainer);

        searchCourseImage.setAttribute('src', "../assets/images/profile-placeholder.svg");
        searchCourseImageContainer.appendChild(searchCourseImage);

        description.textContent = val.description;

        searchCourseContainer.appendChild(courseSubContainer);
    });
}
=======
  searchCourseContainer.innerHTML = "";
  data.forEach((val) => {
    let courseSubContainer = document.createElement("div");
    let searchCourseImageContainer = document.createElement("div");
    let searchCourseImage = document.createElement("img");
    let searchCourseContent = document.createElement("div");
    let courseTitle = document.createElement("h4");
    let searchCourseNameContainer = document.createElement("div");
    // let checkBox = document.createElement('input');
    let searchCourseDescriptionContainer = document.createElement("div");
    let description = document.createElement("span");
    let plusContainer = document.createElement("div");
    let plusIcon = document.createElement("i");

    // checkBox.type = "checkbox";
    plusIcon.classList.add("fas", "fa-plus");
    let isTaken = selectedCourses.find((item) => item.crn === val.crn);
    let checkBox = `<input type='checkbox' ${isTaken ? 'checked' : null} onclick='selectCourse(${JSON.stringify(
      val
    )
      .split('"')
      .join("&quot;")})' />`;
    // checkBox. = isTaken ? "true" : "";
    courseSubContainer.classList.add("search-course-sub-container");
    searchCourseImageContainer.classList.add("search-course-img");
    searchCourseContent.classList.add("search-course-content");
    searchCourseNameContainer.classList.add("search-course-name-container");
    searchCourseDescriptionContainer.classList.add(
      "search-course-description-container"
    );
    description.classList.add("text-ellipses-2");
    plusContainer.classList.add("plus-course-container");

    courseSubContainer.appendChild(searchCourseImageContainer);
    courseSubContainer.appendChild(searchCourseContent);

    courseTitle.textContent = `${val.crn} ${val.name}`;
    searchCourseNameContainer.appendChild(courseTitle);
    searchCourseNameContainer.innerHTML += checkBox;
    // searchCourseNameContainer.appendChild(checkBox);

    searchCourseDescriptionContainer.appendChild(description);
    plusContainer.appendChild(plusIcon);
    searchCourseDescriptionContainer.appendChild(plusContainer);
    searchCourseContent.appendChild(searchCourseNameContainer);
    searchCourseContent.appendChild(searchCourseDescriptionContainer);

    searchCourseImage.setAttribute(
      "src",
      "../assets/images/profile-placeholder.svg"
    );
    searchCourseImageContainer.appendChild(searchCourseImage);

    description.textContent = val.description;

    searchCourseContainer.appendChild(courseSubContainer);
  });
};
>>>>>>> 8ec0a9751e64442d80e4c53b403a516b2e27f8a8

const searchCourses = (event) => {
  if (event.target.value.length === 0) {
    courseList = tempCourseList;
  } else {
    courseList = courseList.filter((item) => item.crn === event.target.value);
  }
  generateSearchCourseHTML(courseList);
};

const addCourseToUser = (courses) => {
<<<<<<< HEAD
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).doc().set({
                courses
            }).then(() => {
                alert("Courses added to user succesfully");
            }).catch(err => {
                console.log(err.message);
            })
        }
        else {
<<<<<<< HEAD
            // console.log('user is not signed in to add todos');
=======
            alert("Something went wrong!")
>>>>>>> a42fdcc6c8aed6887c5056498b1571d8245670fa
        }
    })
}
=======
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection(user.uid)
        .doc()
        .set({
          courses,
        })
        .then(() => {
          alert("Courses added to user succesfully");
          window.location = "add-drop-course.html";
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      window.location = '../components/auth/login.html';
    }
  });
};
>>>>>>> 8ec0a9751e64442d80e4c53b403a516b2e27f8a8

<<<<<<< HEAD
const selectCourse = (courseCrn) => {
  const index = selectedCourses.findIndex((crn) => crn == courseCrn);
  if (index === -1) {
      selectedCourses.push(courseCrn);
=======
const selectCourse = (courseItem) => {
  const index = selectedCourses.findIndex(
    (course) => course.crn === courseItem.crn
  );
  if (index === -1) {
<<<<<<< HEAD
      selectedCourses.push(courseItem);
>>>>>>> a42fdcc6c8aed6887c5056498b1571d8245670fa
=======
    selectedCourses.push(courseItem);
>>>>>>> 8ec0a9751e64442d80e4c53b403a516b2e27f8a8
  } else {
    selectedCourses.splice(index, 1);
  }
};

const submitCourseList = () => {
<<<<<<< HEAD
    addCourseToUser(selectedCourses);
}

<<<<<<< HEAD
=======
const homeCourseList = () => {
=======
  addCourseToUser(selectedCourses);
};
>>>>>>> 8ec0a9751e64442d80e4c53b403a516b2e27f8a8

const getCurrentCourseList = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection(user.uid).onSnapshot((snapshot) => {
        let val = snapshot.docChanges();
        val.forEach((data) => {
            if (data.doc) {
                selectedCourses = [...selectedCourses, ...data.doc.data().courses]
            }
        });
        getCourseList();
      });
    } else {
      window.location = '../components/auth/login.html';
    }
  });
};

<<<<<<< HEAD
>>>>>>> a42fdcc6c8aed6887c5056498b1571d8245670fa
=======
const homeCourseList = () => {};
getCurrentCourseList();
>>>>>>> 8ec0a9751e64442d80e4c53b403a516b2e27f8a8
// Fetch all the course list that exists
