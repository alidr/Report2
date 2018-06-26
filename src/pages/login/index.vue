<template>
  <!-- 登录 -->
  <div id="login">
    <p class="login_name">家装报备工具</p>
    <div class="login_content">
      <div class="input">
        <span></span>
        <input type="text" placeholder="请输入您的账户" v-model="name">
      </div>
      <div class="input">
        <span></span>
        <input type="password" placeholder="请输入您的密码" v-model="psd">
      </div>
      <a href="javascript:;" id="button" @click="login()">欢迎登录</a>
    </div>


  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from "axios"
import qs from "qs";

export default {
  name: 'Login',
  data(){
    return{
      name:'',
      psd:'',
      AccessId:''
    }
  },
  methods: {
    login(){
      if (!this.name) {
        this.getToast("请输入用户名",'warn')
        return
      }else if(!this.psd){
        this.getToast("请输入密码",'warn')
        return
      }
      axios({
        url:this.getHost()+'/Login/Login', 
        method:'post',
        data:qs.stringify({
          LoginName: this.name,
          Password: this.psd
        })
      })
      .then(res=>{
        if (res.data.Status == 1) {
          this.AccessId = res.data.Data.JobID
          this.setAccessId(this.AccessId)
          let cookie = res.data.Data.Token
          let id = res.data.Data.ID
          let Name = res.data.Data.Name
          let Organization = res.data.Data.Organization
          this.addCookie('token',cookie,1)
          this.addCookie('UserId',id,1)
          this.addCookie('Name',Name,1)
          this.addCookie('Organization',Organization,1)
          if (this.AccessId == -1) {
            this.$router.push({path: '/adminIndex'})
          }else{
            this.$router.push({path:'/home'})
          }
        }else if (res.data.Status == 0) {
          const toast = this.$createToast({
            txt: res.data.Message,
            mask: true,
            type:'warn',
            maskClosable:true,
            time: 1000,
          })
          toast.show()
          return
        }
      })
    },
    // login(AccessId) {
    //   this.setAccessId(AccessId)
    //   this.$router.push({path:'/home'})
    // },
    ...mapMutations({
      setAccessId: 'SET_ACCESSID'
    })
  }
}
</script>

<style scoped>
#login{
  width: 100%;
  height: 100%;
  background-color: #f5f4f3;
  background-image: url(/static/login_bg.jpg);
  background-repeat: no-repeat;
  background-size: contain;
}
/* 登录名称 */
.login_name{
  width: 100%;
  height: 26vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #e0c799;
}
/* 登录内容 */
.login_content{
  width: 100%;
  height: 58vh;
  padding: 20px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.input{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: #fbfbfb;
}
.input span{
  display: inline-block;
  width: 25px;
  height: 25px;
  margin: 0 10px;
}
.input input{
  width: 0;
  flex: 1;
  height: 100%;
  background-color: #fbfbfb;
}
.input:nth-child(1) span{
  background: url(./user.png) no-repeat center/cover;
}
.input:nth-child(2) span{
  background: url(./psd.png) no-repeat center/cover;
}
.login_content #button{
  width: 100%;
  margin-top: 20vh;
}



</style>
