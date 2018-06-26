<template>
<!-- 编辑竞品信息 -->
  <div id="EditCompete">
    <div class="input title">
       <span>4月竞品数据</span>
     </div>
     <div class="input">
       <span>竞品销量</span>
       <input type="text" placeholder="请输入竞品销量">
       个
     </div>
     <div class="input">
       <span>竞品开工数</span>
       <input type="text" placeholder="请输入竞品开工数">
       个
     </div>
     <div class="input">
       <span>竞品出样量</span>
       <input type="text" placeholder="请输入竞品出样量">
       个
     </div>
     <div class="input">
       <span>门店数量</span>
       <input type="text" placeholder="请输入门店数量">
       个
     </div>
     <div class="input">
       <span>设计师数量</span>
       <input type="text" placeholder="请输入设计师数量">
       个
     </div>
     <router-link to="/competeProduct" id="button">保存</router-link>
  </div>
</template>

<script>
export default {
  name: 'EditCompete'
}
</script>

<style scoped>
@import '../../common/input.css';
#EditCompete{
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
}
.input{
 padding-right: 10px;
 box-sizing: border-box;
}
.title{
  font-weight: 600;
}
input{
  margin: 0 !important;
}
#button{
  width: calc(100% - 80px);
  margin:40vh auto;
}
</style>
