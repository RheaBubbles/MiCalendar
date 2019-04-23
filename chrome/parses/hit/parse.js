// console.log("Inject codes.");

if (typeof iframe == "undefined") {
  var iframe = {};
}
if (typeof iframeWindow == "undefined") {
  var iframeWindow = {};
}

iframe = document.getElementsByTagName("iframe");
if(iframe.length > 0) {
  iframeWindow = iframe[0].contentWindow;
  let container = iframeWindow.document.getElementsByClassName("xfyq_con");
  if(container.length > 0) {
    container = container[0];
    let courses = HitParser(container.children[0]);
    // console.log(JSON.stringify(courses));
    // console.log(courses);
    window.courses = courses;
    // 通知background
    chrome.runtime.sendMessage({
      msg: "openPanelPage",
      courses,
      error: ""
    });
  } else {
    console.log("No Container.");
    chrome.runtime.sendMessage({
      msg: "openPanelPage",
      courses: [[],[],[],[],[],[],[]],
      error: "No Container."
    });
  }
} else {
  console.log("No iframe element.");
  chrome.runtime.sendMessage({
    msg: "openPanelPage",
    courses: [[],[],[],[],[],[],[]],
    error: "No iframe element."
  });
}

// HitParser(table)
// 通过课表的DOM元素，依次解析课程
// 传入参数 课表DOM
// 返回参数 课程数组
function HitParser(table) {
  let courses = [[], [], [], [], [], [], []];
  let tbody = table.children[0];
  for(let i = 1; i <= 6; i++) {
    let tr = tbody.children[i];
    for(let j = 2; j <= 8; j++) {
      let td = tr.children[j];
      let innerHTML = td.innerHTML;
      innerHTML = innerHTML.replace(/\s*/g, "");
      innerHTML = innerHTML.replace(new RegExp("，","gm"), ',');
      if(innerHTML != "&nbsp;") {
        let row = innerHTML.split('<br>');
        if(row.length != 0) {
          row = Simplify(row);
          for(let k = 0; k + 1 < row.length; k+=2) {
            // console.log(`day:${j - 1}, time:${i * 2 - 1}-${i * 2}`,
            //  row[k], row[k+1]);
            let course = CourseParser(row[k], row[k+1]);
            course.start = i * 2 - 1;
            course.end = i * 2;
            courses[j - 2].push(course);
          }
        }
      }
    }
  }
  return courses;
}

function isWeeksLine(line) {
  if(line.indexOf(']周') != -1) {
    return true;
  } else if(line.indexOf(']单周') != -1) {
    return true;
  } else if(line.indexOf(']双周') != -1) {
    return true;
  } else {
    return false;
  }
}

// Simplify
// 将特殊的三行课程情况简化为两行
function Simplify(row) {
  let res = [];
  for(let i = 0; i < row.length; i++) {
    if(i + 1 < row.length) {
      if(!isWeeksLine(row[i]) && !isWeeksLine(row[i + 1])) {
        res[res.length - 1] += row[i];
      } else {
        res.push(row[i]);
      }
    } else if(i == row.length - 1 && !isWeeksLine(row[i])) {
      res[res.length - 1] += row[i];
    } else {
      res.push(row[i]);
    }
  }
  return res;
}

// CourseParser
// 通过字符串解析出课程信息
// 传入参数 第1行数据 和 第2行数据
// 返回参数 标准的课程+时间安排的数据格式
function CourseParser(first, second) {
  // 第1行一般是考试或者课程名
  // 第2行一般是 老师名[周数-周数，周数]周地点的格式
  // 第2行有些特殊规则，记得处理
  let name = first;
  name = name.replace(new RegExp("&lt;","gm"), '<');
  name = name.replace(new RegExp("&gt;","gm"), '>');
  let teacher = "";
  let room = "";
  if(second[second.length - 1] != '周') {
    // 有教室
    let begin = second.lastIndexOf('周') + 1;
    room = second.slice(begin, second.length);
    second = second.slice(0, begin);
  }
  let intervals = second.split('周,');
  for(let i = 0; i < intervals.length; i++) {
    intervals[i] = intervals[i].replace(new RegExp("周","gm"), '');
    if(intervals[i][0] != '[') {
      let end = intervals[i].indexOf('[');
      if(teacher.length == 0) {
        teacher = intervals[i].slice(0, end);
      } else {
        teacher += (',' + intervals[i].slice(0, end));
      }
      intervals[i] = intervals[i].slice(end, intervals[i].length);
    }
  }
  let weeks = WeeksParser(intervals);
  weeks.sort((a, b) => { return a - b });
  // console.log(name, teacher, room, weeks.join(','));
  return {
    name,
    teacher,
    room,
    weeks,
  };
}

// WeeksParser
// 解析周数数组，返回标准格式的周数数组
// 传入参数 intervals 可能分段的周数数组
// 返回参数 标准格式的周数数组
function WeeksParser(intervals) {
  let weeks = [];
  for(let i = 0; i < intervals.length; i++) {
    let week = intervals[i];
    if(week[week.length - 1] == ']') {
      // [x-x]
      week = NormalWeekParser(week);
    } else if(week[week.length - 1] == '单') {
      // [x-x]单
      week = FlagWeekParser(week, 1);
    } else if(week[week.length - 1] == '双') {
      // [x-x]双
      week = FlagWeekParser(week, 0);
    }
    weeks = weeks.concat(week);
  }
  return weeks;
}


// NormalWeekParser
// 解析周数，返回标准格式的周数数组
// 传入参数 week
// 返回参数 标准格式的周数数组
function NormalWeekParser(week) {
  // 可能还存在内部是单双的情况
  let res = [];
  week = week.slice(1, week.length - 1);
  week = week.split(',');
  for(let i = 0; i < week.length; i++) {
    let wtow = week[i];
    let begin, end;
    let flag;
    if(wtow[wtow.length - 1] == '单') {
      wtow = wtow.slice(0, wtow.length - 1);
      flag = 1;
    } else if(wtow[wtow.length - 1] == '双') {
      wtow = wtow.slice(0, wtow.length - 1);
      flag = 0;
    }
    wtow = wtow.split('-');
    begin = parseInt(wtow[0]);
    end = parseInt(wtow[1]);
    if(wtow.length > 1) {
      for(let j = begin; j <= end; j++) {
        if(typeof flag != "undefined") {
          if(j % 2 == flag) {
            res.push(j);
          }
        } else {
          res.push(j);
        }
      }
    } else {
      if(typeof flag != "undefined") {
        if(begin % 2 == flag) {
          res.push(begin);
        }
      } else {
        res.push(begin);
      }
    }
  }
  return res;
}

// FlagWeekParser
function FlagWeekParser(week, flag) {
  // 内部不再有单双的分情况
  let res = [];
  week = week.slice(1, week.length - 1);
  week = week.split(',');
  for(let i = 0; i < week.length; i++) {
    let wtow = week[i];
    let begin, end;
    wtow = wtow.split('-');
    begin = parseInt(wtow[0]);
    end = parseInt(wtow[1]);
    if(wtow.length > 1) {
      for(let j = begin; j <= end; j++) {
        if(j % 2 == flag) {
          res.push(j);
        }
      }
    } else {
      if(begin % 2 == flag) {
        res.push(begin);
      }
    }
  }
  return res;
}