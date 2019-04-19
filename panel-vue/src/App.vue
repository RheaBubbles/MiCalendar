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
          <img src="https://i.loli.net/2019/04/19/5cb97f8a17d28.jpg">
          <first-day/>
          <daily-time/>
          <parse-info/>
        </div>
        <div class="col">
          <course/>
          <course/>
          <course/>
          <course/>
          <course/>
          <course/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Course from './Course'
import FirstDay from './FirstDay'
import DailyTime from './DailyTime'
import ParseInfo from './ParseInfo'
export default {
  name: 'app',
  components: {
    Course,
    FirstDay,
    DailyTime,
    ParseInfo
  },
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
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
</style>