const getCurrentCourseList = () => {
  homeCourseList.innerHTML = '<div class="loader"></div>';
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user, "user");
      userName.innerHTML = `Hi, ${user.email}`;
      currentDate.innerHTML = `${new Date().toLocaleDateString()}`;
      db.collection(user.uid).onSnapshot((snapshot) => {
        let val = snapshot.docChanges();
        homeCourseList.innerHTML = "";
        generateHomeHTML(val);
        console.log(val);
      });
    } else {
      window.location = '../components/auth/login.html';
    }
  });
};

const generateHomeHTML = (data) => {
  if (data.length === 0) {
    homeCourseList.innerHTML = "You currently have no courses";
  } else {
    data.forEach((val) => {
      val.doc.data().courses.forEach((courseVal) => {
        let html = `
                <div class="home-courses-list-item">
                    <div class="home-courses-list-item-img">
                        <img src="../assets/images/profile-placeholder.svg">
                    </div>
                    <div class="home-courses-content">
                        <h4>${courseVal.crn} ${courseVal.name}</h4>
                        <div class="home-courses-date">
                            <span class="home-courses-intake">${courseVal.inTake}</span>
                            <span>Ends on ${courseVal.endDate}</span>
                        </div>
                        <div>20% Completed</div>
                    </div>
                </div>
                `;

        homeCourseList.innerHTML += html;
      });
    });
  }
};

getCurrentCourseList();
