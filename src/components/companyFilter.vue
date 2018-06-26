<template>
    <div>
      <div class="contentList" v-for="(item,index) in msgList" :key="index" @click="jump(1)">
        <div class="contentListTop">
          <p class="firstLine">
            <span>洽谈中</span>
            <span>剩余保护期:5天</span>
          </p>
          <p class="twoLine">
            <a href="javascript:;" class="round"><b></b></a>
            <a href="javascript:;" class="name">家装公司名称</a>
            <!-- <a href="javascript:;" class="btn">+行动</a> -->
          </p>
          <i></i>
        </div>
        <div class="contentListBottom">
          <span>2018/11/11</span>
          <span>到公司拜访了一下王经理 拷贝</span>
          <span>小A</span>
        </div>
      </div>
    </div> 
</template>
  

<script>
export default {
  data(){
    return{
      msgList:[1,1,1,1,1],
    }
  },
  methods:{
    jump(num){
      this.$router.push({
        path: '/companyDetail',
        query: {
          id: num
        }
      })
    }
  }
}
</script>
<style scoped>
@import '../common/focusList.css';
.twoLine .round{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border: 1px solid #ccc;
  margin-right: 15px;
}
.twoLine .round.active{
  border:1px solid #E2C78F;
}
.twoLine .round b{
  display: flex;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #fff;
}
.twoLine .round b.active{
  background-color: #E2C78F;
}
</style>


