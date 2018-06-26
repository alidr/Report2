<template>
<!-- 消息中心 -->
  <div id="messageCenter">
    
      <div class="contentList" v-for="(item,index) in list" :key="index">
        <div class="contentListTop">
          <p class="firstLine">
            <span class="status">{{item.TagName}}</span>
            <span>{{item.CreateDate}}</span>
          </p>
          <p class="twoLine">
            <span>{{item.JobName}}{{item.Content}}</span>
            <!-- <span>撤销申诉</span> -->
          </p>
        </div>
        <!-- <div class="contentListBottom">
          <span>待审批／审批中不可撤销</span>
        </div> -->
        <div class="contentListBottom">
          <p class="person">
            审批人：{{item.UserName}}
          </p>
          <p><a href="javascript:;" to="/companyDetail" @click="companyDetail(item.SourceID)">点击进入公司详情页>></a></p>
        </div>
      </div>
      <!-- <div class="lookMore">
        <a href="javascript:;">查看全部</a>
      </div> -->
    </div>

</template>

<script>
import qs from 'qs'
import axios from "axios";
import appealHisList from "../../components/appealHisList";
export default {
  name: 'messageCenter',
  data(){
    return{
        list:[]
      }
  },
  components:{
    appealHisList
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      axios({
        url:this.getHost()+'/UserInfo/GetMessageList', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token')
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.list = res.data.Data.list
        }else if (res.data.Status<0) {
          this.getToast("登录失效，请重新登录",'warn')
          setTimeout(() => {
            this.delCookie("UserId")
            this.delCookie("token")
            this.setAccessId('')
            location.replace('/')
          }, 2000);
        }
        else{
          this.getToast(res.data.Message,'warn')
        }
      })
    },
    companyDetail(id){
      this.$router.push({
        path:"/companyDetail",
        query:{
          id:id
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../common/focusList.css';
#messageCenter{
  padding: 15px;
  box-sizing: border-box;
}
.contentListTop,.contentListBottom{
  margin-left: 15px;
}
.firstLine .status{
  position: absolute;
  left: 0px;
  border-radius: 0px 15px 15px 0 !important;
}
.contentListTop .twoLine span{
  font-size: 14px;
  font-weight: normal;
}
.contentListBottom .person{
  color: #F26F53;
  width: 0;
  flex-grow: 1;
}
.contentListBottom a{
  color: #4d4d4d;
}
</style>
