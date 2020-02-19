<template>
  <div class="container" v-html="data">
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.5);
  transform: translate(0,0);
}
</style>
