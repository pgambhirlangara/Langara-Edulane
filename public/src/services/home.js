/* Get the current username and show on the top bar */
const getCurrentUserDoc = async (userId)=> {
  const userRef = db.collection('users').doc(userId)
  const userDoc = await userRef.get();
    if (userDoc.exists) {
      const currentUserName = userDoc.data().nickName
      userName.innerHTML = `Hi, ${currentUserName} !`;
      username.innerHTML = `${currentUserName} !`;
    } else {
      console.log('user not find')
    }
}

/* Get the current user photo and show on the top bar */
const getCurrentUserPic = async (userId)=> {
  const imgInHeading = document.getElementById('home-inside-container-img')
  const imgInHamburgerMenu = document.getElementById('imgInHamburgerMenu')
  /* const bucketName = "langara-edu.appspot.com";
  const userPic = storage.ref(`profilePics/${userId}.jpg`).name; */
  const userPic = storage.ref().child(`profilePics/${userId}.jpg`)
  userPic.getDownloadURL().then((url)=> {
    console.log(url);
    imgInHeading.src = url;
    imgInHeading.style.borderRadius = "50%"
    imgInHamburgerMenu.src = url;
    imgInHamburgerMenu.style.borderRadius = "50%"
  })
}

const getCurrentCourseList = () => {
  homeCourseList.innerHTML = '<div class="loader"></div>';
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user, "user");
      const currentUserId = user.uid
      getCurrentUserDoc(currentUserId);
      getCurrentUserPic(currentUserId);
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


/* Script to toggle the hamburger menu: configured by Tainara on Nov. 25 */
function openNav() {
        document.getElementById("myNav").style.height = "100%";
        document.getElementById("menuToggle").style.display = "none";
        document.getElementById("closeBtn").style.display = "block";
        }

        function closeNav() {
        document.getElementById("myNav").style.height = "0%";
        document.getElementById("menuToggle").style.display = "block";
        document.getElementById("closeBtn").style.display = "none";
        }
