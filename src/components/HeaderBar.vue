<template>
<el-row class="headerbar">
  <el-col class="content-left" :span="16">
    <span class="title"> 测试系统 </span>
  </el-col>
  <el-col class="content-right" :span="8">
    <span class="userInfo"> 您好 </span>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: 'HeaderBar'
}
</script>

<style lang="scss" scoped>
.headerbar{
  height: 100px;
  line-height: 100px;
  background: #0d3268;
  color: #ffffff;
  padding: 0 50px;
  overflow: hidden;
  display: flex;
  .content-left{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title{
      font-size:36px;
      letter-spacing:1px;
    }
  }
  .content-right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    .userInfo{
      padding-right: 30px
    }
  }
}
</style>

