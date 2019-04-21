<template>
  <div class="card">
    <div id="title">1-12节课程的开始时间</div>
    <div id="daily">
      <div
        class="time"
        v-for="(value, key, index) in school.schedule_time"
        v-bind:key="key">
        <div>{{ key }}</div>
        <input
        type="text"
        v-bind:class="{ error: !checkTime(school.schedule_time[key][0], key, index) }"
        v-model="school.schedule_time[key][0]"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyTime',
  props: ['school', 'timeCheck'],
  data() {
    return {
      check: true
    }
  },
  methods: {
    checkTime(time, key, index) {
      if(index == 0) {
        this.check = true;
      }
      time = time.replace("：", ":");
      this.school.schedule_time[key][0] = time;
      let regex = new RegExp("^[0-9]{1,2}[\:]{1}[0-9]{1,2}$");
      if(regex.test(time)) {
        let [hour, mine] = time.split(":");
        hour = parseInt(hour);
        mine = parseInt(mine);
        if(hour >= 0 && hour <=23 && mine >= 0 && mine <=59) {
          this.check = true;
          return true;
        } else {
          this.check = false;
          return false;
        }
      } else {
        this.check = false;
        return false;
      }
    }
  },
  watch: {
    check() {
      this.$emit('changeTimeCheck', this.check);
    }
  }
}
</script>

<style scoped>
#title {
  font-size: 20px;
}

#daily {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.time {
  position: relative;
  margin-top: 12px;
  margin-right: 6px;
}

.time div{
  position: absolute;
  margin-top: 4px;
  width: 17px;
  text-align: center;
}

.time input{
  margin-left: 24px;
  border: none;
  outline: none;
  width: 40px;
  text-align: center;
  padding: 4px 8px;
  font-size: 16px;
  border-radius: 4px;
  color: rgb(128, 128, 128);
  background: rgb(238, 238, 238);
  font-family: "Segoe UI", Arial, "Microsoft Yahei", sans-serif;
  transition: all 300ms;
}

.error {
  color: rgb(255, 255, 255) !important;
  background: rgb(224, 14, 14) !important;
}
</style>
