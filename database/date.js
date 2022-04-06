const currentDate = new Date();

const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth(); // January is 0, not 1
const currentYear = currentDate.getFullYear();
const currentHour = currentDate.getHours();
const currentMinute =  currentDate.getMinutes();
const currentSecond =  currentDate.getSeconds();

const dateString = currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth + " " + currentHour + ":" + currentMinute + ":" + currentSecond;
// "2022-4-4 19:29:37"

module.exports = dateString;