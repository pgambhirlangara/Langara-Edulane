// //---------------------------------------------------- 
// // Add event screen logic
// //----------------------------------------------------  

let nav = 1;
let clicked = null;

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendarDeleteBtn = document.getElementById('calendar-delete');
const calendarConfirmDelete = document.getElementById('calendar-confirm-delete');
const calendarDeleteCancel = document.getElementById('calendar-cancel');
const calendar = document.getElementById('calendar');
const daysArea = document.getElementById('days');
const next = document.getElementById("next");
const back = document.getElementById("back");
const month = document.getElementById('month');
let monthNumber = month.value;


//---------------------------------------------------- 
// Delete event logic
//----------------------------------------------------  
if (calendarDeleteBtn) {
    calendarDeleteBtn.addEventListener('click', () => {
        modalWindow.style.display = 'block';
    });
}




document.querySelectorAll('.day').forEach(item => {
    item.addEventListener('click', event => {
        console.log('clicked');
    })
})

month.addEventListener('change', function () {
    monthNumber = this.value;
    load();
});



function load() {
    const dt = new Date();
    const day = dt.getDate();
    const year = dt.getFullYear();
    const datesArr = [];
    datesArr.push('');

    const firstDayOfMonth = new Date(year, monthNumber, 1);
    const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    daysArea.innerHTML = ``;


    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

        } else {
            daySquare.classList.add('padding');
        }

        datesArr.push(daySquare);
    }
    for (let i = 1; i <= 7; i++) {
        daysArea.appendChild(datesArr[nav + i]);
    }

}


function initButtons() {
    next.addEventListener('click', () => {
        if (nav < 28) {
            nav += 7;
            load();
        } else {
            nav = 0;
            load();
        }

    });

    back.addEventListener('click', () => {
        if (nav >= 7 && nav < 28) {
            nav -= 7;
            load();
        } else {
            nav = 0;
            load();
        }
    });

}
load();
initButtons();