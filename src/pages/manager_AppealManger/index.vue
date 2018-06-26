<template>
  <!-- 申诉审批 -->
  <div class="appeal">
    <div class="btn">
      <button type="button" :class="{active:style==1}" @click="active(1)">授权审批</button>
      <button type="button" :class="{active:style==2}" @click="active(2)">合同审批</button>
    </div>
    <div class="appealList">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="applyDetail(item.ID)">
          <span>{{item.TypeName}}</span>
          <i>提交日期 {{item.Date}}</i>
          <div class="up">
            <p>{{item.CompanyName}} </p>
            <b>业务员{{item.UserName}}</b>
            <div class="upBtn">
              <button type="button" class="no" @click.stop="isAllow(false,item.ID)">不通过</button>
              <button type="button" class="yes" @click.stop="isAllow(true,item.ID)">审批通过</button>
            </div>
          </div>
          <div class="down">
            <i>查看相似公司</i>
            <a href="javascript:;">
              <span>查看申诉详情>></span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import axios from "axios";
  export default {
    name: 'appeal',
    data() {
      return {
        list:[],
        style:1
      }
    },
    created(){
      this.getList(1)
    },
    methods:{
      getList(TypeID){
        axios({
        url:this.getHost()+'/Approval/GetFollowList', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          TypeID:TypeID,
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
      active(style){
        console.log(style);
        
        this.style = style
        this.getList(style)
      },
      isAllow(bool,id){
        axios({
        url:bool?this.getHost()+'/Approval/AgreeFollow':this.getHost()+'/Approval/CancelFollow', 
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
            this.getList("")
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
      applyDetail(id){
        this.$router.push({
          path:'/appealDetails',
          query:{
            id:id
          }
        })
      }

    }

  }

</script>

<style scoped>

.btn {
    width: 58%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
  }

  .btn button {
    display: black;
    height: 29px;
    border-radius: 4px;
    padding: 0 22px;
    line-height: 29px;
    text-align: center;
    font-size: 14px;
    
    
    
  }

  .btn button.active {
    background: #E2C78F;
    color: rgba(255, 255, 255, 1);
    border: none;

  }

  .btn button {
    color: rgba(179, 179, 179, 1);
    border: 1px solid #959595;
    background: none;

  }
  .appealList {
    width: 94%;
    margin: 0 auto;
    overflow: hidden;
  }

  .appealList ul li {
    overflow: hidden;
    background: white;
    padding-top: 12px;
    margin-bottom: 9px;
    padding-bottom: 20px;
    border-radius:4px;
  }
  .appealList ul li>span {
    display: inline-block;
    background: rgba(246, 234, 212, 1);
    border-radius: 0px 10px 10px 0px;
    padding: 0 14px;
    margin-bottom: 6px;
    font-size: 10px;
    font-family: PingFangSC-Regular;
    color: rgba(187, 159, 97, 1);
    line-height: 20px;
    text-align: center;
    margin-right: 140px;
  }
  .appealList ul li>i {
    font-style: normal;
    font-size: 12px;
    color:rgba(76,76,76,1);
    line-height: 20px;
  }

  .appealList ul li .up {
    width: 92%;
    overflow: hidden;
    margin: 0 auto; 
    border-bottom: 1px solid rgba(177, 177, 177, 1);
    padding-bottom: 8px;
    margin-bottom: 14px;
    margin-left:20px;
    position: relative;
    
  }

  .appealList ul li .up .name {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(77, 77, 77, 1);
    line-height: 28px;
    border:none;
    margin-right: 0;
  }

  .appealList ul li .up .salesman {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(77, 77, 77, 1);
    line-height: 28px;
    margin-left: 4px;
    border:none;
    margin-right: 0;
    padding: 0;
  }


  .appealList ul li .up .upBtn {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 40%;
    position: absolute;
    right: 0;
    top: 0;
  }

  .appealList ul li .up .upBtn button {
    display: inline-block;
    border-radius: 3px;
    padding: 0 10px;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
  }

  .appealList ul li .up .upBtn button:nth-child(1) {
    background: rgba(228, 228, 228, 1);
    color: rgba(178, 178, 178, 1);
  }

  .appealList ul li .up .upBtn button:nth-child(2) {
    background: rgba(226, 199, 143, 1);
    color: rgba(255, 255, 255, 1);
  }

  .appealList ul li .down {
    width: 90%;
    overflow: hidden;
    margin-left: 20px;

  }

  .appealList ul li .down i {
    font-style: normal;
    font-size: 12px;
    color: rgba(242, 111, 83, 1);
    margin-right:80px;
  }

  .appealList ul li .down a {
    font-size: 12px;
    color: rgba(128, 128, 128, 1);
  }


</style>
