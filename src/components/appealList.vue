<template>
   <div class="home_content" v-if="list.length">
      <div class="focus">
       最新申诉({{list.length}})
      </div>
      <div class="contentList" v-for="(item,index) in list" :key="index" v-if="index<maxHeight">
        <div class="contentListTop">
          <p class="firstLine">
            <span class="status">{{item.SateID}}</span>
            <span>申诉日期：{{item.CreateDate}}</span>
          </p>
          <p class="twoLine twoLineInfo">
            <span>{{item.CompanyName}}</span>
            <span>不通过</span>
            <span>审批通过</span>
          </p>
          <i></i>
        </div>
        <div class="contentListBottom">
          <span>业务员{{item.UserName}}</span>
          <span class="lookDetail">查看申诉详情>></span>
        </div>
      </div>
       <div class="lookMore" v-if="list.length >2">
        <a href="javascript:;" @click="lookMore">{{words}}</a>
      </div>
    </div>
</template>
  

<script>
export default {
  props:["list"],
  data(){
    return{
      words:"查看全部",
      maxHeight:1
    }
  },
  methods:{
    lookMore(){
      if (this.maxHeight<2) {
        this.words = "查看全部"
        this.maxHeight = this.list.length
      }else{
        this.words = "收起"
        this.maxHeight = 1
      }
    },
  }
}
</script>
<style scoped>
@import '../common/focusList.css';
/* 最新申诉 */
.firstLine .status{
  background-color: #fff !important;
  border:1px solid #BB9F61;
  color: #BB9F61;
}
.twoLine.twoLineInfo span:nth-child(1){
  font-size: 16px;
}
.twoLine.twoLineInfo span:nth-child(2){
  background-color: #ccc;
  margin: 0 5px;
}
.lookDetail{
  text-align: right;
}
</style>


