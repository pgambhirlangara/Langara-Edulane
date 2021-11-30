//---------------------------------------------------- 
// Add event screen logic
//----------------------------------------------------  

let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');
const calendarDeleteBtn = document.getElementById('calendar-delete');
const modalWindow = document.getElementById('calendar-modal');
const calendarAddBtn = document.getElementById('calendar-add');
const calendarConfirmDelete = document.getElementById('calendar-confirm-delete');
const calendarDeleteCancel = document.getElementById('calendar-cancel');

function openModal(date) {
    clicked = date;
    console.log(clicked);
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}



function initButtons() {
    nextButton.addEventListener('click', () => {
        nav++;
        load();
    });

    backButton.addEventListener('click', () => {
        nav--;
        load();
    });

}
if (nextButton && backButton) {
    initButtons();
    load();
}





//---------------------------------------------------- 
// Delete event logic
//----------------------------------------------------  
if (calendarDeleteBtn) {
    calendarDeleteBtn.addEventListener('click', () => {
        modalWindow.style.display = 'block';
    });
}

//---------------------------------------------------- 
// Add event logic
//----------------------------------------------------  
if (calendarAddBtn) {
    calendarAddBtn.addEventListener('click', () => {
        console.log(window.location);
        if (window.location.pathname == '/public/src/components/home.html') {
            window.location = '../components/calendar/calendar-add.html';
        } else {
            window.location = '../calendar/calendar-add.html';
        }

    });
}

// if (window.location.pathname == '/public/src/components/home.html' || window.location.pathname == '/public/src/components/calendar/calendar.html') {


//     const calendarSmall = document.getElementById('calendarSmall');

//     const monthSmall = document.getElementById('monthSmall');
//     let monthNumber = monthSmall.value;


//     monthSmall.addEventListener('change', function () {
//         monthNumber = this.value;
//     });


//     function loadSmall() {
//         const dt = new Date();

//         const day = dt.getDate();
//         const month = dt.getMonth();
//         const year = dt.getFullYear();

//         const firstDayOfMonth = new Date(year, monthNumber, 1);
//         console.log(firstDayOfMonth);
//         const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
//         console.log(daysInMonth);
//         const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'numeric',
//             day: 'numeric',
//         });
//         const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

//         //   document.getElementById('monthSmallDisplay').innerText = 
//         //     `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

//         calendarSmall.innerHTML = '';

//         for (let i = 1; i <= paddingDays + daysInMonth; i++) {
//             const daySquare = document.createElement('div');
//             daySquare.classList.add('day');

//             const dayString = `${month + 1}/${i - paddingDays}/${year}`;

//             if (i > paddingDays) {
//                 daySquare.innerText = i - paddingDays;

//                 if (i - paddingDays === day && nav === 0) {
//                     daySquare.id = 'currentDay';
//                 }

//             } else {
//                 daySquare.classList.add('padding');
//             }

//             calendarSmall.appendChild(daySquare);
//         }
//     }

//     const nextSmallButton = document.getElementById('nextButtonSmall');
//     const backSmallButton = document.getElementById('backButtonSmall');

//     function initSmallButtons() {
//         nextSmallButton.addEventListener('click', () => {
//             nav++;
//             loadSmall();
//         });

//         backSmallButton.addEventListener('click', () => {
//             nav--;
//             loadSmall();
//         });

//     }
//     if (nextSmallButton && backSmallButton) {
//         initSmallButtons();
//         loadSmall();
//     }
// }