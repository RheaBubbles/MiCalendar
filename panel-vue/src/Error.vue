<template>
  <div class="card" id="error">
    <div id="title">😝见鬼！！！</div>
    <div id="desc">如果你能看到我，一定是解析代码出现了问题。</div>
    <div id="desc">错误信息：{{ error }}。</div>
    <div id="desc">请及时联系代码作者或者在群里向我们反馈。</div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>


<style scoped>
#error {
  background: rgb(255, 200, 61);
}

#title {
  font-size: 20px;
}

#desc {
  margin-top: 12px;
  font-size: 16px;
}
</style>
