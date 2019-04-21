function getCalendar(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
X-WR-TIMEZONE: Asia/Shanghai

BEGIN:VTIMEZONE
TZID:China Standard Time
BEGIN:STANDARD
DTSTART:16010101T000000
TZOFFSETFROM:+0800
TZOFFSETTO:+0800
END:STANDARD
END:VTIMEZONE
\n` + events.join('\n\n') + `\nEND:VCALENDAR`;
}

function getDateFormat(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  year = `${year}`;
  if(month < 10) {
    month = `0${month}`;
  }
  if(day < 10) {
    day = `0${day}`;
  }
  return year + month + day;
}

function getEvent(course, start, end, date, week) {
  start = start.replace(":", "");
  end = end.replace(":", "");
  date = getDateFormat(date);
  start = date + "T" + start + "00";
  end = date + "T" + end + "00";
  return `BEGIN:VEVENT
UID: ${ course.name + start }
DTSTAMP: ${ start }
DTSTART;TZID="China Standard Time": ${ start }
DTEND;TZID="China Standard Time": ${ end }
LOCATION: 第${ week }周 ${ course.room + " " + course.teacher }
SUMMARY: ${ course.name }
END:VEVENT`;
}

function getCourseEvents(course, school, fday, week) {
  let events = [];
  for(let i = 0; i < course.weeks.length; i++) {
    let tday = new Date(fday.getTime());
    console.log(tday);
    console.log('add',(course.weeks[i] - 1) * 7 + week,'days');
    tday.setDate(tday.getDate() + (course.weeks[i] - 1) * 7 + week);
    console.log(tday);
    let start = school.schedule_time[course.start][0];
    let end = school.schedule_time[course.end][1];
    let event = getEvent(course, start, end, tday, course.weeks[i]);
    events.push(event);
  }
  return events;
}

export default function(courses, school, firstDay) {
  let events = [];
  let fday = new Date(firstDay.year, firstDay.month - 1, firstDay.day);
  for(let i = 0; i < courses.length; i++) {
    for(let j = 0; j < courses[i].length; j++) {
      let courseEvents = getCourseEvents(courses[i][j], school, fday, i);
      events = events.concat(courseEvents);
    }
  }
  return getCalendar(events);
}