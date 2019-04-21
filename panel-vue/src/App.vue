<template>
  <div id="app">
    <div id="header">
      <div class="container">
        <img src="./assets/icon128.png" id="logo">
        <div id="label">MiCalendar</div>
        <div id="export" v-on:click="outPut()">开始导出</div>
      </div>
    </div>
    <div id="body">
      <div class="container">
        <div class="col">
          <week/>
          <div id="btn-group">
            <div v-on:click="changeWeek(1)" v-bind:class="{ now: week == 1 }">周一</div>
            <div v-on:click="changeWeek(2)" v-bind:class="{ now: week == 2 }">周二</div>
            <div v-on:click="changeWeek(3)" v-bind:class="{ now: week == 3 }">周三</div>
            <div v-on:click="changeWeek(4)" v-bind:class="{ now: week == 4 }">周四</div>
            <div v-on:click="changeWeek(5)" v-bind:class="{ now: week == 5 }">周五</div>
            <div v-on:click="changeWeek(6)" v-bind:class="{ now: week == 6 }">周六</div>
            <div v-on:click="changeWeek(7)" v-bind:class="{ now: week == 7 }">周日</div>
          </div>
          <div class="interval">1 - 2</div>
          <course
            v-for="course in startOfCourse(0)"
            v-bind:key="course.name + course.start"
            v-bind:course="course"
            />
          <div class="interval">3 - 4</div>
          <course
            v-for="course in startOfCourse(1)"
            v-bind:key="course.name + course.start"
            v-bind:course="course"
            />
          <div class="interval">5 - 6</div>
          <course
            v-for="course in startOfCourse(2)"
            v-bind:key="course.name + course.start"
            v-bind:course="course"
            />
          <div class="interval">7 - 8</div>
          <course
            v-for="course in startOfCourse(3)"
            v-bind:key="course.name + course.start"
            v-bind:course="course"
            />
          <div class="interval">9 - 10</div>
          <course
            v-for="course in startOfCourse(4)"
            v-bind:key="course.name + course.start"
            v-bind:course="course"
            />
          <div class="interval">11 - 12</div>
          <course
            v-for="course in startOfCourse(5)"
            v-bind:key="course.name + course.start"
            v-bind:course="course"
            />
        </div>
        <div class="col">
          <error v-if="error.length != 0" v-bind:error="error"/>
          <first-day v-bind:firstDay="firstDay"/>
          <daily-time v-if="school" v-bind:school="school" v-on:changeTimeCheck="(check) => { this.timeCheck = check }"/>
          <parse-info v-if="school" v-bind:school="school"/>
          <img src="https://i.loli.net/2019/04/19/5cb97f8a17d28.jpg">
        </div>
      </div>
    </div>
    <a id="download"></a>
  </div>
</template>

<script>
import Course from './Course'
import Week from './Week'
import Error from './Error'
import FirstDay from './FirstDay'
import DailyTime from './DailyTime'
import ParseInfo from './ParseInfo'
import tools from './tools'
export default {
  name: 'app',
  components: {
    Course,
    Week,
    Error,
    FirstDay,
    DailyTime,
    ParseInfo
  },
  data () {
    return {
      week: 0,
      courses: [
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      starts: [
        [],
        [],
        [],
        [],
        [],
        []
      ],
      school: null,
      firstDay: {
        year: '',
        month: '',
        day: ''
      },
      timeCheck: true,
      error: ""
    }
  },
  methods: {
    changeWeek(week) {
      this.week = week;
    },
    startOfCourse(start) {
      let temp = [];
      if(this.week != 0) {
        for(let i = 0; i < this.courses[this.week - 1].length; i++) {
          if(this.courses[this.week - 1][i].start == start * 2 + 1) {
            temp.push(this.courses[this.week - 1][i]);
          }
        }
        this.starts[start] = temp;
      }
      return temp;
    },
    outPut() {
      if(this.error.length == 0) {
        let date = new Date(this.firstDay.year, this.firstDay.month, this.firstDay.day);
        console.log(date);
        if(date.getDate() == this.firstDay.day) {
          if(this.timeCheck) {
            let url = window.webkitURL || window.URL || window.mozURL || window.msURL;
            let a = document.getElementById('download');
            a.download = `MiCalendar-${Date.parse(new Date())}.ics`;
            let content = tools(this.courses, this.school, this.firstDay);
            // console.log(content);
            let blob = new Blob(
              [ content ],
              { type : "text/plain;charset=utf-8" }
            );
            a.href = url.createObjectURL(blob);
            a.dataset.downloadurl = ['ics', a.download, a.href].join(':');
            a.click();
          } else {
            alert("课程开始时间为填完，请完成开始时间的填写。");
          }
        } else {
          alert("开始日期填写错误，请填写合法的日期。");
        }
      } else {
        alert("解析代码出现错误，错误信息为：" + this.error + "，请及时联系我们。");
      }
    }
  },
  mounted() {
    // load data
    let that = this;
    if(typeof chrome.storage != "undefined") {
      // in chrome
      chrome.storage.local.get(['courses'], function(result) {
        that.$data.courses = result.courses;
      });
      chrome.storage.local.get(['school'], function(result) {
        that.$data.school = result.school;
      });
      chrome.storage.local.get(['error'], function(result) {
        that.$data.error = result.error;
      });
    } else {
      that.$data.courses = [
        [
          {"name":"工科数学分析","teacher":"王洪滨","room":"BX14","weeks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"start":1,"end":2},
          {"name":"[考试]中级英语阅读(提高)","teacher":"","room":"","weeks":[18],"start":3,"end":4},
          {"name":"高级语言程序设计II","teacher":"赵玲玲","room":"BX12","weeks":[1,3,5,7,9],"start":3,"end":4},
          {"name":"电路IV","teacher":"由佳欣","room":"B617","weeks":[1,2,3,4,5,6,7,8,9,10,11,12],"start":5,"end":6},
          {"name":"形势与政策","teacher":"闫金红","room":"B51","weeks":[1,2,3,4,5],"start":7,"end":8}
        ],
        [
          {"name":"中国近现代史纲要","teacher":"霍跃","room":"BX24","weeks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14],"start":1,"end":2},
          {"name":"[考试]工科数学分析","teacher":"","room":"B712","weeks":[18],"start":3,"end":4},
          {"name":"大学物理II","teacher":"袁承勋","room":"B51","weeks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"start":3,"end":4},
          {"name":"[考试]电路IV","teacher":"","room":"B22","weeks":[15],"start":7,"end":8},
          {"name":"集合论与图论","teacher":"刘峰","room":"B721","weeks":[1,2,3,4,5,6,7,8,9,10,11,12],"start":7,"end":8},
          {"name":"大学生创业基础","teacher":"吴严","room":"B512","weeks":[2,3,4,5,6,7,8],"start":9,"end":10},
          {"name":"大学生创业基础","teacher":"吴严","room":"B512","weeks":[2,3,4,5,6,7,8],"start":11,"end":12}
        ],
        [
          {"name":"高级语言程序设计II","teacher":"苏小红,赵玲玲","room":"BX12","weeks":[1,2,3,4,5,6,7,8,9,10],"start":1,"end":2},
          {"name":"工科数学分析","teacher":"王洪滨","room":"BX14","weeks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"start":3,"end":4},
          {"name":"[考试]集合论与图论","teacher":"","room":"B12","weeks":[14],"start":7,"end":8},
          {"name":"电路IV","teacher":"齐超,杨旭强,由佳欣","room":"B617","weeks":[1,2,3,4,5,6,7,8,9,10,11,12],"start":7,"end":8},
          {"name":"希腊神话欣赏","teacher":"陈喜辉","room":"B31","weeks":[2,3,4,5,6,7,8],"start":9,"end":10},
          {"name":"希腊神话欣赏","teacher":"陈喜辉","room":"B31","weeks":[2,3,4,5,6,7,8],"start":11,"end":12}
        ],
        [
          {"name":"大学物理II","teacher":"袁承勋","room":"B51","weeks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"start":1,"end":2},
          {"name":"中级英语阅读(提高)","teacher":"金晓玲","room":"B804","weeks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"start":3,"end":4},
          {"name":"[考试]中国近现代史纲要","teacher":"","room":"B507","weeks":[17],"start":7,"end":8}
        ],
        [
          {"name":"工科数学分析","teacher":"王洪滨","room":"BX14","weeks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"start":1,"end":2},
          {"name":"[考试]大学物理II","teacher":"","room":"B601","weeks":[18],"start":3,"end":4},
          {"name":"大学物理II","teacher":"袁承勋","room":"B51","weeks":[2,4,6,8,10,12,14,16],"start":3,"end":4},
          {"name":"集合论与图论","teacher":"刘峰","room":"B721","weeks":[1,2,3,4,5,6,7,8,9,10,11,12],"start":5,"end":6}
        ],
        [],
        [
          {"name":"高级语言程序设计II(实验)","teacher":"赵玲玲","room":"B8502","weeks":[5,6,7,8,9,10],"start":5,"end":6}
        ]
      ];
      that.$data.school = {
        "name": "哈尔滨工业大学",
        "author": "YuMi",
        "email": "augbubbles@foxmail.com",
        "commit_date": "2019/04/22",
        "max_weeks": 19,
        "schedule_time": {
          "1": ["08:00", "08:45"],
          "2": ["08:55", "09:45"],
          "3": ["10:00", "10:45"],
          "4": ["10:55", "11:45"],
          "5": ["13:45", "14:30"],
          "6": ["14:40", "15:30"],
          "7": ["15:45", "16:30"],
          "8": ["16:40", "17:30"],
          "9": ["18:30", "19:15"],
          "10": ["19:25", "20:15"],
          "11": ["20:30", "21:15"],
          "12": ["21:25", "22:15"]
        }
      };
    }
    this.$data.week = 1;
  }
}
</script>

<style>
#app {
  font-family: "Segoe UI", Arial, "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#header {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgb(89, 89, 89);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 0px 6px rgba(0,0,0,0.23);
}

#body {
  position: relative;
  top: 16px;
}

.container {
  position: relative;
  margin: 0 auto;
  width: 768px;
  height: max-content;
  text-align: left;
  display: flex;
}

#logo {
  margin-top: 4px;
  width: 40px;
  height: 40px;
}

#label {
  position: absolute;
  top: 0px;
  margin-left: 48px;
  color: white;
  font-size: 20px;
  line-height: 46px;
}

#export {
  position: absolute;
  top: 6px;
  right: 0px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  background: rgb(245, 36, 36);
}

.col {
  height: max-content;
  width: 376px;
  margin-right: 16px;
}

.col > * {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
}

.col > *:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.card {
  width: 352px;
  padding: 18px 12px;
  height: max-content;
  background: white;
}

#btn-group {
  display: flex;
  box-shadow: none;
}

#btn-group > * {
  flex-grow: 1;
  text-align: center;
  padding-top: 6px;
  padding-bottom: 4px;
  cursor: pointer;
  /* border-radius: 4px; */
  border-bottom: solid rgba(226, 226, 226, 0) 3px;
  transition: all 300ms;
}

#btn-group > *:hover {
  background: rgb(226, 226, 226);
  border-bottom: solid rgba(226, 226, 226) 3px;
}

.interval {
  box-shadow: none !important;
  text-align: center;
  padding: 4px 0px;
  font-weight: bolder;
  font-size: 18px;
  background: rgb(226, 226, 226);
}

.now {
    border-bottom: solid rgb(245, 36, 36) 3px !important;
}
</style>

<style>
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius:0px;
}

#download {
  display: hidden;
}
</style>

