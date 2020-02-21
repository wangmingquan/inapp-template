<template>
  <div class="container">
    <a href="tel:110">110</a>
    <button @click="call110">110</button>

    <div class="text-box">这里是一段乱七八糟的文字，没有设置line-height，各位瞅瞅</div>
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
  },
  methods: {
    call110 () {
      location.href = 'tel:110'
    }
  }
}
</script>

<style lang="less" scoped>
.text-box{
  padding: 10px;
  width: 100px;
  border: #ccc 1px solid;
}
.page{
  display:flex;
  padding: 10px 20px;
  flex-wrap: wrap;
  // zoom: 0.75;
  .phone{
    border: #ccc 1px solid;
    width: 375px;
    height: 812px;
    overflow-y: auto;
    margin: 10px;
  }
}
</style>
