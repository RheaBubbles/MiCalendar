<template>
  <div class="card">
    <div id="title">1-12节课程的开始时间</div>
    <div id="daily">
      <div class="time">
        <div>1</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>2</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>3</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>4</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>5</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>6</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>7</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>8</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>9</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>10</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>11</div>
        <input type="text"/>
      </div>
      <div class="time">
        <div>12</div>
        <input type="text"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyTime',
  data () {
    return {
      time: []
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
  background: rgb(238, 238, 238);
  font-family: "Segoe UI", Arial, "Microsoft Yahei", sans-serif;
}
</style>
