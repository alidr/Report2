<template>
<!-- 我的小组 -->
  <div id="myGroup">
    <p class="title">
      <span>当前小组共××人，组长为我／×××。</span>
      <span @click="memberCompany">查看跟进公司</span>
    </p>
    <div class="groupList">
      <div class="name">
        <i></i>
        <span>组员姓名1</span>
      </div>
      <div class="teamMemberInfo">
        <p>手机号 12158479029</p>
        <p>跟进20家装，10家已签约</p>
      </div>
      <div class="icon">
        <span>组长</span>
      </div>
      <i class="topIcon">01</i>
    </div>
   <a href="javascript:;" id="button">解散小组</a>
  </div>
</template>

<script>
export default {
  name: 'myGroup',
  data(){
    return{

    }
  },
  methods:{
    memberCompany(){
      this.$router.push({path:'/CompanyFollow'})
    }
  }
}
</script>

<style scoped>
#myGroup{
  padding: 15px;
  box-sizing: border-box;
}
.title{
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 12px;
}
.title span{
  display: flex;
  height: 100%;
  align-items: center;
}
.title span:first-child{
  background-color: #DFDEDD;
  width: 0;
  flex-grow: 1;
  padding-left: 10px;
}
.title span:nth-child(2){
  background-color: #D4A667;
  padding:0 10px;
  margin-left: 10px;
  border-radius: 4px;
}
.groupList{
  background-color: #fff;
  margin-top: 10px;
  border-radius: 4px;
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  position: relative;
}
.name{
  width: 100px;
  border-right: 1px solid #f0f0f0;
  margin-right: 15px;
  font-size: 14px;
}
.name i{
  width: 6px;
  height: 6px;
  background-color: #ccc;
  border-radius: 3px;
  display: inline-block;
  margin-right: 5px;
}
.teamMemberInfo{
  width: 0;
  flex-grow: 1;
}
.teamMemberInfo p:first-child{
  margin-bottom: 10px;
}
.teamMemberInfo p:nth-child(2){
  color: #999;
}
.icon{
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px  solid #E2C78F;
  color: #E2C78F;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topIcon{
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius:4px 0px 14px;
  background-color: #D4A667;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
#button{
  width: calc(100% - 80px);
  margin: 30vh auto;
  background-image: linear-gradient(#ccc);
}
</style>
