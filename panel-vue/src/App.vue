<template>
  <div id="app">
    <div id="header">
      <div class="container">
        <img src="./assets/icon128.png" id="logo">
        <div id="label">MiCalendar</div>
        <div id="export">开始导出</div>
      </div>
    </div>
    <div id="body">
      <div class="container">
        <div class="col">
          <week/>
          <div id="btn-group">
            <div v-on:click="changeWeek(1)">周一</div>
            <div v-on:click="changeWeek(2)">周二</div>
            <div v-on:click="changeWeek(3)">周三</div>
            <div v-on:click="changeWeek(4)">周四</div>
            <div v-on:click="changeWeek(5)">周五</div>
            <div v-on:click="changeWeek(6)">周六</div>
            <div v-on:click="changeWeek(7)">周日</div>
          </div>
          <div class="interval">1 - 2</div>
          <course
            v-for="course in startOfCourse(0)"
            v-bind:key="course.name + courses.start"
            v-bind:course="course"
            />
          <div class="interval">3 - 4</div>
          <course
            v-for="course in startOfCourse(1)"
            v-bind:key="course.name + courses.start"
            v-bind:course="course"
            />
          <div class="interval">5 - 6</div>
          <course
            v-for="course in startOfCourse(2)"
            v-bind:key="course.name + courses.start"
            v-bind:course="course"
            />
          <div class="interval">7 - 8</div>
          <course
            v-for="course in startOfCourse(3)"
            v-bind:key="course.name + courses.start"
            v-bind:course="course"
            />
          <div class="interval">9 - 10</div>
          <course
            v-for="course in startOfCourse(4)"
            v-bind:key="course.name + courses.start"
            v-bind:course="course"
            />
          <div class="interval">11 - 12</div>
          <course
            v-for="course in startOfCourse(5)"
            v-bind:key="course.name + courses.start"
            v-bind:course="course"
            />
        </div>
        <div class="col">
          <first-day/>
          <daily-time/>
          <parse-info/>
          <img src="https://i.loli.net/2019/04/19/5cb97f8a17d28.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Course from './Course'
import Week from './Week'
import FirstDay from './FirstDay'
import DailyTime from './DailyTime'
import ParseInfo from './ParseInfo'
export default {
  name: 'app',
  components: {
    Course,
    Week,
    FirstDay,
    DailyTime,
    ParseInfo
  },
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
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
      ]
    }
  },
  methods: {
    changeWeek(week) {
      this.week = week;
    },
    startOfCourse(start) {
      let temp = [];
      for(let i = 0; i < this.courses[this.week - 1].length; i++) {
        if(this.courses[this.week - 1][i].start == start * 2 + 1) {
          temp.push(this.courses[this.week - 1][i]);
        }
      }
      this.starts[start] =  temp;
      return temp;
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
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 300ms;
}

#btn-group > *:hover {
  background: rgb(226, 226, 226);
}

.interval {
  box-shadow: none !important;
  text-align: center;
  padding: 4px 0px;
  font-weight: bolder;
  font-size: 18px;
  background: rgb(226, 226, 226);
}
</style>