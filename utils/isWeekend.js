import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function isWeekend (date) {
    const dayOfWeek = date.format('dddd');
    if (dayOfWeek === "Sunday" || dayOfWeek === "Saturday") return true; 
    return false;
}

export default isWeekend;