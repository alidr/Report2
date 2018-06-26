<template>
    <div>
      <div class="contentList" v-for="(item,index) in list" :key="index" @click="jump(item.ID)">
        <div class="contentListTop">
          <p class="firstLine">
            <span>{{item.StatusName}}</span>
            <span>剩余保护期:{{item.EndDate}}天</span>
          </p>
          <p class="twoLine">
            <span>{{item.Name}}</span>
            <span @click.stop="action(item.ID)" v-if="Action">+行动</span>
          </p>
          <i v-if="item.IsEmphasis||IsEmphasis"></i>
        </div>
        <div class="contentListBottom">
          <span>{{item.CreateDate}}</span>
          <span>{{item.Content}}</span>
          <span>{{item.UserName}}</span>
        </div>
      </div>
    </div> 
</template>
  

<script>
export default {
  props:["list","Action","IsEmphasis"],
  data(){
    return{
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
    },
    action(num){
      this.$router.push({
          path: '/action',
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
.contentList{
  padding: 15px 22px 0;
}
.contentListTop {
    margin-left: 0;
}
.contentListBottom{
  margin-left: 0;
}
.contentListBottom span:nth-child(1){
  margin-left: 4px;
}
.contentListBottom span:nth-child(3){
  margin-right: 4px;
}
.firstLine span{
  margin-left: 14px;
}

</style>


