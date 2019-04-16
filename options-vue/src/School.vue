<template>
  <div id="box">
    {{ school.name }}
  </div>
</template>

<script>
export default {
  name: 'School',
  props: ['school'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#box {
  margin-left: 20px;
  margin-right: 10px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 6px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 300ms;
}
#box:hover {
  background: rgb(240, 240, 240);
}
</style>
