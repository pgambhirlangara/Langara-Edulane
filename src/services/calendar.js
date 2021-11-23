

function calendar(params) {
    const days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let days_in_month = getDaysInMonth(params.month, params.year),
        first_day_date = new Date(params.year, params.month, 1),
        first_day_weekday = first_day_date.getDay();

    let prev_month = params.month == 0 ? 11 : params.month - 1,
        prev_year = prev_month == 11 ? params.year - 1 : params.year,
        prev_days = getDaysInMonth(prev_month, prev_year);

    // calendar header
    let html = `
                <div class="calendar-add-container__top">
                <i class="fas fa-chevron-left"></i>
                <div class="date">
                    <span class="day"> 
                        20th
                    </span>
                    <span class="month"> 
                        September
                    </span>
                    <span class="year">
                        2021
                    </span>
                </div>
                <i class="fas fa-chevron-right"></i>
            </div>
    `;


    function getDaysInMonth(month, year) {
        // 0 = last day of the previous month
        return new Date(year, month + 1, 0).getDate();
    }

    // calendar content
    html += '<table class="calendar-table">';

    // week days labels
    html += '<tr class="week-days">';
    for (let i = 0; i <= 6; i++) {
        html += '<td class="day">';
        html += days_labels[i];
        html += '</td>';
    }
    html += '</tr>';

    let w = 0; // week day
    let n = 1; // next days date
    let c = 1; // current date

    // dates loop
    for (let i = 0; i < 6 * days_labels.length; i++) {
        if (w == 0) {
            // first week's day
            html += '<tr class="week">';
        }

        if (i < new Date(params.year, params.month, 1).getDay()) {
            // previous month's day
            html += '<td class="day other-month">' + (prev_days - first_day_weekday + i + 1) + '</td>';
        } else if (c > days_in_month) {
            // next month's day
            html += '<td class="day other-month">' + n + '</td>';
            n++;
        } else {
            // current month's day
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };
            let display_date = new Date(params.year, params.month, c);
            html += '<td class="day" title="' + display_date.toLocaleDateString('en-GB', options) + '">' + c + '</td>';
            c++;
        }

        if (w == days_labels.length - 1) {
            // last week's day
            html += '</tr>';
            w = 0;
        } else {
            w++;
        }
    }

    html += '</tr>';
    return html;
}

let now = new Date();
let params = {
    month: now.getMonth(),
    year: now.getFullYear()
};
document.getElementById('calendar').innerHTML = calendar(params);