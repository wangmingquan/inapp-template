<template>
  <div class="container">

  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: {}
    }
  },
  created () {
    console.log(this.data)
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
