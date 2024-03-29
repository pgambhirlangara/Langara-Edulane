let courseList = [];
let tempCourseList = [];
let selectedCourses = [];
let currentUser;
let currentUserDOCID = null;
let selectedDays = [];

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
      instructor: instructorName.value,
      section: courseSection.value,
      timing: classTiming.value,
      days: selectedDays
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

const generateSearchCourseHTML = (data) => {
   searchCourseContainer.innerHTML = "";

  data.forEach((val) => {
    searchCourseContainer.innerHTML += `
    <!-- The Modal -->
 <div id="${val.crn}" class="modal">
 
   <!-- Modal content -->
   <div class="modal-content">
     <span style="float:right" class="close" id="courseOverviewClose" onclick="closeDialog(document.getElementById(${val.crn}))">&times;</span>
     <h3>
         ${val.crn} ${val.name}
     </h3>
     <div>
         <div class="courseOverviewContainer">
             <h4>Hours</h4>
             <span>${val.days}</span>
         </div>
         <div class="courseOverviewContainer">
             <h4>Teacher</h4>
             <span>${val.instructor}</span>
         </div>
         <p>${val.description}</p>
     </div>
    </div>
 
 </div>
    `;
  
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
    // let plusIcon = document.createElement("i");

    // checkBox.type = "checkbox";
    // plusIcon.classList.add("fas", "fa-plus");
    let isTaken = selectedCourses.find((item) => item.crn === val.crn);
    let plusIcon = `<i class="fas fa-plus" onclick="openCourseOverviewDialog(document.getElementById(${val.crn}))"></i>`;
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
    plusContainer.innerHTML = plusIcon;

    courseSubContainer.appendChild(searchCourseImageContainer);
    courseSubContainer.appendChild(searchCourseContent);

    courseTitle.textContent = `${val.crn} ${val.name}`;
    searchCourseNameContainer.appendChild(courseTitle); 
    searchCourseNameContainer.innerHTML += checkBox;

    searchCourseDescriptionContainer.appendChild(description);
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
}

const openCourseOverviewDialog = (id) => {
  console.log(id, "ID");
  id.style.display = "block";
}

const closeDialog = (id) => {
  id.style.display = "none";
}

const searchCourses = (event) => {
  if (event.target.value.length === 0) {
    courseList = tempCourseList;
  } else {
    courseList = courseList.filter((item) => item.crn === event.target.value);
  }
  generateSearchCourseHTML(courseList);
};

const addCourseToUser = (courses) => {
    auth.onAuthStateChanged((user) => {
    if (user) {
      if (currentUserDOCID) {
        db.collection(user.uid)
        .doc(currentUserDOCID)
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
      }
    } else {
      window.location = '../components/auth/login.html';
    }
  })
}

const selectCourse = (courseItem) => {
  const index = selectedCourses.findIndex(
    (course) => course.crn === courseItem.crn
  );
  if (index === -1) {
    courseItem.completed = 0;
    selectedCourses.push(courseItem);
  } else {
    selectedCourses.splice(index, 1);
  }
};

const submitCourseList = () => {
    addCourseToUser(selectedCourses);
}

const homeCourseList = () => {
  addCourseToUser(selectedCourses);
};

const getCurrentCourseList = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection(user.uid).onSnapshot((snapshot) => {
        let val = snapshot.docChanges();
        currentUserDOCID = val.length > 0 ? val[0].doc.id: "";
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


const setDays = (e) => {
  selectedDays = Array.from(courseDays.selectedOptions).map(({ value }) => value);
}



getCurrentCourseList();

// Fetch all the course list that exists
