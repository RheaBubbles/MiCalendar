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
        <div id="router">
          <router-link tag="div" to="/"><span>🏮</span>MiCalendar可以做什么？</router-link>
          <router-link tag="div" to="/school"><span>🏮</span>如何支持我的学校？</router-link>
          <router-link tag="div" to="/exchange"><span>🏮</span>什么是Exchange账号？</router-link>
          <router-link tag="div" to="/windows-10"><span>🏮</span>Windows10如何设置？</router-link>
          <router-link tag="div" to="/macos"><span>🏮</span>macOS如何设置？</router-link>
          <router-link tag="div" to="/miui"><span>🏮</span>MIUI如何设置？</router-link>
          <router-link tag="div" to="/emui"><span>🏮</span>EMUI如何设置？</router-link>
          <router-link tag="div" to="/ios"><span>🏮</span>iOS如何设置？</router-link>
          <router-link tag="div" to="/android"><span>🏮</span>Android如何设置？</router-link>
          <router-link tag="div" to="/google-calendar"><span>🏮</span>404Calendar如何设置？</router-link>
          <router-link tag="div" to="/contact"><span>🏮</span>联系我们</router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    path() {
      return this.$route.name;
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
  margin-top: 80px;
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

#router {
  /* background-color: white; */
  width: 200px;
  height: max-content;
}

#router div {
  position: relative;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 16px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  color: rgb(177, 177, 177);
  transition: all 300ms;
}

#router div:hover {
  color: white;
  background: rgb(211, 10, 10);
}

#router div span {
  opacity: 0;
  position: absolute;
  left: -24px;
  transition: all 300ms;
}

#router div:hover span {
  opacity: 1;
}

.page {
  background-color: white;
  margin-left: 16px;
  padding: 0px 16px 16px 16px;
  width: 552px;
  height: max-content;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

h1 {

}

h2 {

}

p {

}
</style>
