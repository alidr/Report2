<template>
<!-- 完善信息 -->
  <div id="completeInformation">
    <div class="infoTop">
      恭喜，该公司未被录入，请完善商户信息！
    </div>
    <div class="infoBottom">
       <div class="input">
       <span>家装公司简称</span>
       <input type="text" placeholder="请输入家装公司简称" v-model="companyEasyName">
     </div>
     <div class="input" @click="showPicker">
       <span>公司所在地<i>*</i></span>
       <input type="text" placeholder="省市区" v-model="area">
       <i class="arrow"></i>
     </div>
     <div class="input">
       <span>详细地址<i>*</i></span>
       <input type="text" placeholder="请输入公司详细地址" v-model="detailArea">
     </div>
      <div class="input">
        <span>公司联系人姓名</span>
        <input type="text" placeholder="请输入公司联系人姓名" v-model="companyPerson">
      </div>
      <div class="input">
        <span>联系人职位</span>
        <input type="text" placeholder="请输入联系人职位" v-model="comPersonJob"> 
      </div>
      <div class="input">
        <span>联系人手机号码</span>
        <input type="text" placeholder="请输入联系人手机号码" v-model="comPersonTel"> 
      </div>
      <div class="input">
        <span>联系人地址</span>
        <input type="text" placeholder="请输入联系人地址" v-model="comPersonArea">
      </div>
      <div class="input">
        <span>备注说明</span>
        <input type="text" placeholder="请输入备注说明" v-model="other"> 
      </div>
      <div class="input uploadImg">
        <span>门头照</span>
        <div class="img"><cube-upload
            action="//jsonplaceholder.typicode.com/photos/"
            max=1
            :simultaneous-uploads="1"
            @files-added="filesAdded" />
        </div>   
      </div>
    </div>
    <a href="javascript:;" id="button" @click="commitInfo">完成添加</a>
  </div>
</template>

<script>
import qs from 'qs'
import axios from "axios";
import json from "./area.json";
import { mapGetters } from 'vuex'
export default {
  name: 'completeInformation',
  data(){
    return{
      companyEasyName:'',
      area:'',
      detailArea:'',
      companyPerson:'',
      comPersonJob:'',
      comPersonTel:'',
      comPersonArea:'',
      other:'',
      areaId:''
    }
  },
   computed: {
    ...mapGetters([
      'AccessId'
    ])
  },
  mounted () {
    this.initPicker()
  },
  methods:{
    //上传图片
    filesAdded(files) {
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >1M files'
      }).show()
    },
    //配置分类picker
    initPicker(){
      this.picker = this.$createCascadePicker({
        title: '省市区',
        data: json.provincelist,
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          this.LastInfo = ""
          this.area = selectedText
          this.areaId = selectedVal
        },
        onCancel: () => {
          this.getToast("取消选择",'correct')
        }
      })
    },
    //显示分类picker
    showPicker () {
      this.picker.show()
    },
    //提交信息
    commitInfo(){
      if (!this.area) {
        this.getToast("请选择公司地址",'warn')
      }else if (!this.detailArea) {
         this.getToast("请输入公司详细地址",'warn')
      }else{
        axios({
          url:this.getHost()+'/Company/CompanySave', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            ID:0,
            CategoryID:localStorage.getItem("companyStyle"),
            Name:localStorage.getItem("companyName"),
            ShortName:this.companyEasyName,
            Area:this.areaId,
            Address:this.detailArea,
            Status:0,
            UserName:this.companyPerson,
            JobName:this.comPersonJob,
            Mobile:this.comPersonTel,
            UserAddress:this.comPersonArea,
            Remark:this.other,
            HeadImageUrl:'',
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.getToast("添加成功,跳转首页",'correct')
            setTimeout(() => {
              if (this.AccessId==-1) {
                this.$router.push({path:"/adminIndex"})
              }else{
                this.$router.push({path:"/home"})
              }
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
        .catch(res=>{
          this.getToast(res.data.Message,'warn')
        })
      }
    }
  }
}
</script>

<style scoped>
  @import '../../common/input.css';
  #completeInformation{
    /* height: 100%;
    overflow: hidden; */
    position: relative;
  }
  .infoTop{
    width: 100%;
    height: 45px;
    background-color: #fff;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #C2A977;
    font-size: 18px;
    font-weight: bold;
  }
  .infoBottom{
    background-color: #fff;
    height: calc(100vh - 60px)
  }
  #button{
    width: calc(100% - 80px);
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
  .uploadImg{
    height: 100px;
    position: relative;
  }
  .img{
    position: absolute;
    right: 10px;
  }
  
</style>
