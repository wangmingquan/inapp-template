<template>
  <div class="container">
    <div class="page">
      <div v-for="item of data" :key="item.id" class="phone">
        <InApp :data="util.data2dom(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import data from '../../json/template.json'
import InApp from './InApp.vue'
import util from './util.js'

export default {
  components: {
    InApp
  },
  data () {
    return {
      data,
      util
    }
  }
}
</script>

<style lang="less" scoped>
.page{
  display:flex;
  padding: 20px;
  zoom: 0.75;
  .phone{
    border: #ccc 1px solid;
    width: 375px;
    height: 812px;
    overflow-y: auto;
    margin: 0 10px;
  }
}
</style>
