<template>
  <div class="card">
    <div id="title">第一周的开始日期</div>
    <input id="year" type="text" class="input">
    <input id="month" type="text" class="input">
    <input id="day" type="text" class="input">
  </div>
</template>

<script>
export default {
  
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
}

#year {
  width: 100px;
}

#month, #day {
  width: 50px;
}
</style>
