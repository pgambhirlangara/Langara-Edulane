const addCourseToCollege = (e) => {
    e.preventDefault();
      return db.collection("courses").doc().set({
        name: courseName.value,
        department: courseDepartment.value,
        inTake: courseIntake.value,
        startDate: courseStartDate.value,
        crn: courseCRN.value,
        endDate: courseEndDate.value,
    }).then(() => {
        alert("Course succesfully Created");
        // window.location = "login.html";
    });

}
