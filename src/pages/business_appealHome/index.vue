<template>
<!-- 我要申诉 -->
  <div id="business_appealHome">
    <div class="appealTop">
      <div class="input">
        <span>家装公司全称<i>*</i></span>
        <input type="text" placeholder="请输入家装公司全称" v-model="name">
      </div>
      <div class="next">
        <a href="javascript:;"  id="button" @click="nextStep">下一步</a>
      </div>
    </div>
    <div class="input inputTitle">
      <span class="title">申诉历史</span>
    </div>
    <div class="appealHis">
      <!-- <appealHisList :historyData="applyHistoryList" v-on:cancel="cancel"></appealHisList> -->
      <div class="home_content">
      <div class="contentList" v-for="(item,index) in applyHistoryList" :key="index">
        <div class="contentListTop">
          <p class="firstLine">
            <span class="status">{{item.TypeName}}</span>
            <span>申诉日期:{{item.CreateDate}}</span>
          </p>
          <p class="twoLine">
            <span>{{item.CompanyName}}</span>
            <span v-if="item.Status == 0" @click="cancel(item.ID)">撤销申诉</span>
          </p>
        </div>
        <!-- <div class="contentListBottom">
          <span>待审批／审批中不可撤销</span>
        </div> -->
        <div class="contentListBottom">
          <p>
            <span v-if="item.Status==-1">{{item.ResultDate}}</span>
            <span class="appealStatus" v-if="item.Status == 0">待审批</span>
            <span class="appealStatus" v-if="item.Status == 1">审批中</span>
          </p>
          <p v-if="item.Status==-1">原因:&emsp;{{item.Result}}</p>
        </div>
      </div>
      <!-- <div class="lookMore">
        <a href="javascript:;">查看全部</a>
      </div> -->
    </div>

    </div>
  </div>
</template>

<script>
import appealHisList from "../../components/appealHisList";
import axios from "axios"
import qs from "qs";
export default {
  name: 'business_appealHome',
  components:{
    appealHisList
  },
  data () {
   
    return {
      test: '111',
      data:null,
      name:'',
      applyHistoryList: [
        // {
        //   ID: '1',
        //   CompanyName: '交换机',
        //   Status: '1',
        //   Result: '1',
        //   ResultDate: '20180203',
        //   CreateDate: '111',
        //   TypeName: '777'
        // },
        //  {
        //    ID: '2',
        //   CompanyName: '换个号',
        //   Status: '0',
        //   Result: '1',
        //   ResultDate: '20180503',
        //   CreateDate: '111',
        //    TypeName: '777'
        // },
        //  {
        //    ID: '3',
        //   CompanyName: '是的',
        //   Status: '1',
        //   Result: '0',
        //   ResultDate: '20180330',
        //   CreateDate: '111',
        //    TypeName: '777'
        // },
        //  {
        //    ID: '4',
        //   CompanyName: '苟富贵',
        //   Status: '1',
        //   Result: '1',
        //   ResultDate: '20180203',
        //   CreateDate: '111',
        //    TypeName: '777'
        // },
      ]
    }
  },
  created () {
    this.getData();
  },
 
  methods: {
    nextStep () {
      if (!this.name) {
        this.getToast("请输入公司名称",'warn')
        return
      }
      axios({
        url:this.getHost()+'/Approval/GetCompanyByName', 
        method:'post',
        data:qs.stringify({
          // 拿到用户id和token
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Name: this.name
        })
      })
      .then(res=>{
        
        if (res.data.Status===1) {
          console.log(res);
          
          this.data = res.data.Data
          this.$router.push({path: '/appealStyle', query: {
            id: this.data.CategoryID,
          }});
          sessionStorage.setItem("companyName",this.name)
          sessionStorage.setItem("ID",this.data.ID)
          sessionStorage.setItem("Address",this.data.Address)
          sessionStorage.setItem("CategoryName",this.data.CategoryName)
        }else if (res.data.Status<0) {
          this.delCookie("UserId")
          this.delCookie("token")
          this.setAccessId('')
          location.replace('/')
        }
        else{
          this.getToast(res.data.Message,'warn')
        }
      })
      .catch(res=>{
        this.getToast(res.data.Message,'warn')
      })
      
    },
    getData () {
      axios({
        url:this.getHost()+'/Approval/ApplyHistory', 
        method:'post',
        data:qs.stringify({
          // 拿到用户id和token
          UserId:getCookie('UserId'),
          token:getCookie('token')
        })
      })
      .then(res=>{
        
        if (res.data.Status===1) {
          console.log(res)
          this.applyHistoryList = res.data.Data.list;
        }else if (res.data.Status<0) {
          this.delCookie("UserId")
          this.delCookie("token")
          this.setAccessId('')
          location.replace('/')
        }
        else{
          this.getToast(res.data.Message,'warn')
        }
      })
      .catch(res=>{
        this.getToast(res.data.Message,'warn')
      })
    },
    cancel(id){
      axios({
        url:this.getHost()+'/Approval/CancelApply', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:id
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.getToast("操作成功",'warn')
          this.getData()
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
    }
  }
}
</script>

<style scoped>
@import '../../common/input.css';
@import '../../common/focusList.css';
.contentList{
  padding-left: 20px;
}
.contentListTop,
.contentListBottom{
  margin-left: 0;
}
.contentListBottom{
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.contentListBottom p{
  display: flex;
}
.contentListBottom p>span,
.contentListBottom .appealStatus{
  width: auto !important;
  flex-grow: 1;
}
.contentListBottom .appealStatus{
  font-weight: 600;
  font-size: 14px;
}
.home_content{
  padding-top: 10px;
}
.firstLine .status{
  background-color: #fff !important;
  border:1px solid #BB9F61;
  color: #BB9F61;
  margin-left: 5px !important;
}
.appealTop{
  padding: 20px 0 0;
}
.next{
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
}
#button{
  width: 100%;
}
.input.inputTitle{
  height: 50px;
}
.input .title{
  color: #4D4D4D;
  font-size: 18px;
  font-weight: 600;
}

</style>
