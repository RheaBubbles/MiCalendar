<template>
  <div class="card">
    <p>当前选择学校 🏮 <span>{{ school.name }}</span></p>
    <p>课表解析代码作者 🏮 <span>{{ school.author }}</span></p>
    <p>邮箱 🏮 <span>{{ school.email }}</span></p>
    <p>课表解析代码更新时间 🏮 <span>{{ school.commit_date }}</span></p>
    <p>用户反馈QQ群 🏮 <span>723431351</span></p>
  </div>
</template>

<script>
export default {
  name: 'ParseInfo',
  props: ['school']
}
</script>

<style scoped>
p {
  margin-top: 8px;
  margin-bottom: 8px;
}

p:first-child {
  margin-top: 0px;
}

p:last-child {
  margin-bottom: 0px;
}
</style>
