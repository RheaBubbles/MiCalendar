<template>
  <div class="card">
    <div id="title">选择第一周的开始日期</div>
    <input
      id="year"
      type="text"
      class="input"
      v-bind:class="{ error: !checkYear() }"
      v-model="firstDay.year">年
    <input
      id="month"
      type="text"
      class="input"
      v-bind:class="{ error: !checkMonth() }"
      v-model="firstDay.month">月
    <input
      id="day"
      type="text"
      class="input"
      v-bind:class="{ error: !checkDay() }"
      v-model="firstDay.day"
      placeholder="请输入">日
  </div>
</template>

<script>
export default {
  name: 'FirstDay',
  props: ['firstDay'],
  mounted() {
    let date = new Date();
    this.firstDay.year = date.getFullYear();
    this.firstDay.month = date.getMonth() + 1;
  },
  methods: {
    checkYear() {
      let regex = new RegExp("^[0-9]{4}$");
      if(regex.test(this.firstDay.year)) {
        return true;
      } else {
        return false;
      }
    },
    checkMonth() {
      let regex = new RegExp("^[0-9]{1,2}$");
      if(regex.test(this.firstDay.month)) {
        let month = parseInt(this.firstDay.month);
        if(month >= 1 && month <= 12) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    checkDay() {
      let regex = new RegExp("^[0-9]{1,2}$");
      if(regex.test(this.firstDay.day)) {
        let day = parseInt(this.firstDay.day);
        if(day >= 1 && day <= 31) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
}
</script>

<style scoped>
#title {
  font-size: 20px;
}

.input {
  margin-top: 12px;
  margin-right: 4px;
  height: 24px;
  text-align: center;
  padding: 4px 12px;
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 4px;
  background: rgb(238, 238, 238);
  font-family: "Segoe UI", Arial, "Microsoft Yahei", sans-serif;
  transition: all 300ms;
}

.input::placeholder {
  font-size: 14px;
  background: rgb(238, 238, 238);
  transition: all 300ms;
}

#year {
  width: 60px;
}

#month, #day {
  width: 60px;
}

.error {
  color: rgb(255, 255, 255) !important;
  background: rgb(224, 14, 14) !important;
}

.error::placeholder {
  color: rgb(255, 255, 255) !important;
  background: rgb(224, 14, 14) !important;
}
</style>
