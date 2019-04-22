<template>
  <div id="app">
    <div id="header">
      <div class="container">
        <img src="./assets/icon128.png" id="logo">
        <div id="label">MiCalendar</div>
      </div>
    </div>
    <div id="body">
      <div class="container">
        <div class="col" id="confirm">
          <div id="title">
            <img src="./assets/icon32.png">
            <div>请在右侧选择您的学校</div>
          </div>
          <div id="school">{{ chosen?chosen.name:"" }}</div>
          <div
            id="btn"
            v-on:click="confirm"
            v-bind:class="{'no-choose':!chosen}">确认</div>
        </div>
        <div class="col">
          <input
            id="filter"
            type="test"
            v-model="filter"
            placeholder="输入学校的部分名称来过滤学校列表">
          <div id="school-list">
            <school
              v-for="school in filterList"
              v-bind:key="school.name"
              v-bind:school="school"
              v-on:choose="choose"
              />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import School from './School.vue'
export default {
  name: 'app',
  components: {
    School
  },
  data () {
    return {
      filter: "",
      slist: [],
      chosen: null
    }
  },
  mounted: function() {
    // read data from chrome storage
    let that = this;
    if(typeof chrome.storage != "undefined") {
      // in chrome
      chrome.runtime.sendMessage({ msg: "initSchools" }, function(response) {
        that.$data.slist = response;
      });
    } else {
      // in dev
      that.$data.slist = [
        { "name": "哈尔滨工业大学" },
        { "name": "上海大学" },
        { "name": "浙江大学" },
        { "name": "清华大学" },
        { "name": "北京大学" },
        { "name": "华中科技大学" },
        { "name": "电子科技大学" },
        { "name": "上海交通大学" },
        { "name": "同济大学" },
        { "name": "复旦大学" }
      ];
    }
  },
  computed: {
    filterList: function() {
      if(this.filter.length == 0) {
        return this.slist;
      } else {
        let flist = [];
        for(let school of this.slist) {
          if(school.name.indexOf(this.filter) != -1) {
            flist.push(school);
          }
        }
        return flist;
      }
    }
  },
  methods: {
    choose(school) {
      // console.log(school);
      this.chosen = school;
    },
    confirm() {
      if(this.chosen) {
        if(typeof chrome.storage != "undefined") {
          // in chrome
          let chosen = this.chosen;
          chrome.storage.local.set({'school': chosen}, function() {
            chrome.browserAction.setPopup({popup: `parses/${ chosen.folder_name }/popup.html`});
            alert(`选择学校成功：${ chosen.name }`);
          });
        } else {
          // in dev
          console.log('Dev ' + this.chosen);
        }
      }
    }
  }
}
</script>

<style scoped>
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

.col {
  height: max-content;
  width: 376px;
  margin-right: 16px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
}

.col:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

#confirm {
  padding: 24px 16px;
}

#title {
  display: flex;
}

#title img {
  margin-top: 1px;
  width: 20px;
  height: 20px;
}

#title div {
  margin-left: 4px;
}

#school {
  height: 36px;
  margin-top: 12px;
  margin-bottom: 12px;
  background: rgb(250, 250, 250);
  border-radius: 4px;
  line-height: 36px;
  padding-left: 8px;
  font-weight: bolder;
}

#btn {
  color: white;
  width: 70px;
  text-align: center;
  padding: 6px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  background: rgb(232, 18, 36);
  transition: all 400ms;
}

#school-list {
  height: 400px;
  overflow-y: scroll;
  /* margin-top: 16px; */
  margin-bottom: 24px;
}

#filter {
  margin: 5%;
  padding-left: 12px;
  font-size: 14px;
  height: 32px;
  border: none;
  outline: none;
  width: 87%;
  background-color: rgb(250, 250, 250);
}

.no-choose {
  background: rgb(158, 158, 158) !important;
}
</style>

<style>

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgb(179, 179, 179);
}

/* 滚动条整体部分，可以设置宽度啥的 */
/* ::-webkit-scrollbar { } */
/* 滚动条两端的按钮 */
/* ::-webkit-scrollbar-button { } */
/* 外层轨道 */
/* ::-webkit-scrollbar-track { } */
/* 内层滚动槽 */
/* ::-webkit-scrollbar-track-piece { } */
/* 滚动的滑块 */
/* ::-webkit-scrollbar-thumb { } */
/* 边角 */
/* ::-webkit-scrollbar-corner { } */
/* 定义右下角拖动块的样式 */
/* ::-webkit-resizer { } */

</style>

