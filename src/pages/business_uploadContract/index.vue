<template>
  <!-- 上传合同 -->
  <div id="uploadContract">
      <span class="mission_img">
        <span class="mui-icon mui-icon-plusempty file">
          <div class="vue-upload-img-multiple">
          <div v-if="image!=''">
            <ul>
              <img class="img" :src="image"  />
              <a href="javascript:void(0);" >
                <span id="close" @click='delImage'>X</span>
              </a>
            </ul>
          </div>
          <div class="unloadImgCon">
            <div v-if="!image" class="unloadImg">
              <input type="file" @change="onFileChange">
              <i>+</i>
            </div>
          </div>
        </div>
        </span>
    </span>

    <div class="btn">
      
      <a href="javascript:;" id="button"  class="confirm" @click="upload">确认上传</a>
      <a href="javascript:;" class="cancel" id="button" @click="cancel">取消上传</a>
    </div>
    <div class="msg">
      <p>1、签约合同在审核失败的时候可以重新上传 </p>
      <p>2、凭证多次重新上传</p>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from "axios";

export default {
  data() {
    return {
      CompanyID:0,
      files: [],
      image: ""
    }
  },
  created(){
    this.CompanyID = this.$route.query.id
    this.style = this.$route.query.style
  },
  methods: {

    upload(){
      if (this.style==2) {
        axios({
        url:this.getHost()+'/Company/ContractImageSave', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          CompanyID:this.CompanyID,
          ContractImage:this.image
        })
      }).then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.getToast("上传成功",'warn')
          setTimeout(() => {
            this.$router.push({
            path:'/companyDetail',
            query:{
              id:this.CompanyID
            }
        })
          }, 2000);
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
      }else if (this.style==1){
        axios({
        url:this.getHost()+'/Company/AuthBookImageSave', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          CompanyID:this.CompanyID,
          AuthBookImage:this.image
        })
      }).then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.getToast("上传成功",'warn')
          setTimeout(() => {
            this.$router.push({
            path:'/companyDetail',
            query:{
              id:this.CompanyID
            }
        })
          }, 2000);
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
      }else if (this.style==3){
        axios({
        url:this.getHost()+'/Company/ProveImageSave', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:this.CompanyID,
          ProveImage:this.image
        })
      }).then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.getToast("上传成功",'warn')
          setTimeout(() => {
            this.$router.push({
            path:'/companyDetail',
            query:{
              id:this.CompanyID
            }
        })
          }, 2000);
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
      }
      
      
    },
    cancel(){
       this.$router.push({
          path:'/companyDetail',
          query:{
            id:this.CompanyID
          }
      })
    },
    onFileChange:function (e) {
        var dom=e.currentTarget;
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;
        this.createImage(files);
          
    },
    createImage (file) {
          var vm = this;
          var reader = null;
            reader = new window.FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = function (e) {
                    vm.image=e.target.result;
                    console.log(e.target.result)
            }
    },
    delImage() {
          this.image = "";
    }
  }
}
</script>

<style scoped>
#uploadContract{
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
}
.unloadImgCon{
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.unloadImg{
  width: 100%;
  height: 60vh;
  position: relative;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
  font-size: 60px;
}
.unloadImg>input{
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
}
.btn{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  position: absolute;
  bottom: 60px;
  width: 100%;
}

#button{
  width: calc(100% - 60px);
}

#button.cancel{
  background-image:linear-gradient(#ccc,#ccc);
  margin-top: 25px;
}

.msg{
  width: 100%;
  height: 50px;
  background-color: #fff5e7;
  color:#d3b488;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
}
#close{
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
  border-radius: 15px;
  font-size: 20px;
}
.mission_img {
  width: 100%;
  height: 60vh;
  display: inline-block;
  padding: 15px;
  box-sizing: border-box;
}
.mission_img .img{
  width: 100%;
}
</style>
