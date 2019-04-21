<template>
  <div class="card">
    <div id="title">{{ course.name }}</div>
    <div id="desc">{{ course.teacher }} {{ course.room }}</div>
    <div class="event">
      <div class="weeks">
        <div
          class="week"
          v-bind:class="{ have: have(week) }"
          v-for="week in weeks"
          v-bind:key="week">
          {{ week }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['course'],
  data() {
    return {
      weeks: 20
    }
  },
  methods: {
    have(week) {
      return this.course.weeks.indexOf(week) != -1;
    }
  }
}
</script>

<style scoped>
#title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(110, 110, 110);
}

#desc {
  margin-top: 4px;
  font-size: 16px;
  color: rgb(141, 141, 141);
}

.weeks {
  display: flex;
  flex-wrap: wrap;
  width: 360px;
}

.week {
  /* cursor: pointer; */
  width: 24px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
  text-align: center;
  color: rgb(153, 153, 153);
  background: rgb(235, 235, 235);
}

.week:last-child {
  margin-right: 0px;
}

.have {
  color: rgb(255, 255, 255);
  background: rgb(255, 106, 106);
}
</style>
