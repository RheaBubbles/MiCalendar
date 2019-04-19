<template>
  <div class="card">
    <div id="title">汇编语言程序设计</div>
    <div class="event">
      <div class="desc">周三 第7节-第8节 史先俊 G712</div>
      <div class="weeks">
        <div class="week">1</div>
        <div class="week">2</div>
        <div class="week">3</div>
        <div class="week">4</div>
        <div class="week">5</div>
        <div class="week">6</div>
        <div class="week">7</div>
        <div class="week">8</div>
        <!-- <div class="week">9</div>
        <div class="week">10</div>
        <div class="week">11</div>
        <div class="week">12</div>
        <div class="week">13</div>
        <div class="week">14</div>
        <div class="week">15</div>
        <div class="week">16</div>
        <div class="week">17</div>
        <div class="week">18</div>
        <div class="week">19</div>
        <div class="week">20</div> -->
      </div>
    </div>
    <div class="event">
      <div class="desc">周五 第9节-第10节 史先俊 G712</div>
      <div class="weeks">
        <!-- <div class="week">1</div>
        <div class="week">2</div>
        <div class="week">3</div>
        <div class="week">4</div>
        <div class="week">5</div>
        <div class="week">6</div>
        <div class="week">7</div>
        <div class="week">8</div>
        <div class="week">9</div>
        <div class="week">10</div>
        <div class="week">11</div>
        <div class="week">12</div> -->
        <div class="week">13</div>
        <div class="week">14</div>
        <div class="week">15</div>
        <div class="week">16</div>
        <div class="week">17</div>
        <div class="week">18</div>
        <div class="week">19</div>
        <div class="week">20</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
#title {
  font-size: 18px;
}

.event {
  margin-top: 12px;
}

.event .desc {
  color: rgb(87, 87, 87);
}

.weeks {
  display: flex;
  flex-wrap: wrap;
}

.week {
  cursor: pointer;
  width: 24px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  margin-top: 12px;
  margin-right: 11px;
  border-radius: 50%;
  text-align: center;
  color: rgb(255, 255, 255);
  background: rgb(255, 18, 18);
}
</style>
