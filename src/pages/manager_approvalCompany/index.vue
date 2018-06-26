<template>
  <!-- 公司待跟进 -->
  <div class="CompanyFollow">
    <div class="top">
      <div class="search">
        <input type="text" placeholder="请搜索公司名称关键词">
        <span>搜索</span>
      </div>
      <div class="classList">
        <ul>
          <li>
            <p>全部类型</p>
            <span></span>
          </li>
          <li>
            <p>全部类型</p>
            <span></span>
          </li>
          <li>
            <p>所有状态</p>
            <span></span>
          </li>

        </ul>

      </div>
    </div>
    <div class="companyList">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <a href="javascript:;">
            <div class="listMid">
              <span :class="{active:checkBoxs[index]}" @click="check(index,item.ID)"></span>
              <button type="button">{{item.StatusName}}</button>
              <p>{{item.Name}}</p>
            </div>
            <div class="listBottom">
              <i @click="showListMask(true,item.ID)">查看相似公司</i>
              <!-- 
              <p>{{item.Content}}</p>
              <b>小A</b> -->
              <p>{{item.UserName}}于{{item.CreateDate}}新建</p>
            </div>
          </a>

        </li>
      </ul>
    </div>

    <footer>
      <span :class="{active:checkAllBox}" @click="checkAll(list)"></span>
      <p>已选择
        <b>{{idList.length}}</b>个家装公司</p>
      <button type="button" @click="distribution">审批通过</button>
      <button type="button" @click="noAllow(true)" class="noAllow">审批不通过</button>
    </footer>

        <!-- 遮罩 -->
    <div id="mask" v-if="isShowMask">
      <div class="maskContain">
        <p class="title">审批不通过原因</p>
        <div class="textarea">
          <textarea name="" id="" cols="30" rows="6" v-model="giveUpReason"></textarea>
        </div>
        <div class="btn">
          <span class="cancel" @click="noAllow(false)">取消</span>
          <span class="confirm" @click.stop="giveUpFollow">确认</span>
        </div>
      </div>
    </div>

        <!-- 遮罩 -->
    <div id="mask" v-if="listmask" @click="showListMask(false)">
      <div class="maskContain">
        <ul>
          <li>
            <span class="name">公司名称 </span>
            <span>相似度</span>
          </li>
          <li v-for="(item,index) in similadList" :key="index">
            <span class="name">{{item.Name}} </span>
            <span>{{item.Rate}}%</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import axios from "axios";
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'CompanyFollow',
    data(){
      return{
        list:[],
        checkBoxs:[],
        checkAllBox:false,
        idList:[],
        isShowMask:false,
        giveUp:false,
        giveUpReason:'',
        similadList:'',
        listmask:false
      }
    },
    created(){
      localStorage.removeItem("CompanyID")
      this.getList()
    },
    methods:{
      showListMask(bool,id){
        this.listmask = bool
        if (bool) {
          console.log(id);
          
          this.getSimilarList(id)
        }
      },
      getSimilarList(id){
        axios({
        url:this.getHost()+'/Approval/GetLikeness', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          CompanyID:id
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.similadList = res.data.Data
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
      giveUpFollow(){
        if (!this.giveUpReason) {
          this.getToast("请输入审核理由",'warn')
        }else{
          axios({
          url:this.getHost()+'/Approval/AuditCompany', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            List:this.idList,
            Agree:false,
            AuditReason:this.giveUpReason
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.getToast("审批成功",'correct')
            this.getList()
            this.noAllow(false)
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
      },
      noAllow(bool){
         if (this.idList.length==0) {
          this.getToast("请选择要审核的公司",'warn')
          return
        }else{
          
          this.isShowMask = bool
        }
        
      },
      getList(){
        axios({
          url:this.getHost()+'/Approval/GetAuditCompanyList', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            DealerID:'',
            SaleID:'',
            Sort:'',
            Keyword:''
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.list  = res.data.Data.list
            for (let i = 0; i < this.list.length; i++) {
              this.checkBoxs.push(false)
              
            } 
            console.log(this.checkBoxs);
                      
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
      },
      check(index,id){
        console.log(index)
        if (this.checkBoxs[index]) {
          this.checkBoxs[index]=false
          this.checkAllBox = false
          for (let i = 0; i <  this.idList.length; i++) {
          if (this.idList[i]==id) {
            this.idList.splice(i)
            }
          }

          for (let i = 0; i < this.checkBoxs.length; i++) {
          if (this.checkBoxs[i]) {
             this.checkAllBox = true
          }
        }
          
        }else{
          this.checkBoxs[index]=true
          this.idList.push(id)
          this.checkAllBox = true
        } 

        this.idList = this.idList.slice()
        this.checkBoxs = this.checkBoxs.slice()
        console.log(this.idList);
        

      },
      checkAll(list){
        
        if (this.checkAllBox) {
          console.log(111)
          this.checkAllBox =false
          console.log(this.checkBoxs);
          this.idList = this.idList.splice()
          for (let i = 0; i <list.length; i++) {
            this.checkBoxs[i]= false
          }
          this.checkBoxs = this.checkBoxs.slice()
        }else{
          console.log(222);
          
          this.checkAllBox = true
          for (let i = 0; i < list.length; i++) {
            this.checkBoxs[i] = true
            this.idList.push(list[i].ID)
          }
           this.checkBoxs = this.checkBoxs.slice()
           this.idList = this.idList.slice()
           console.log(this.checkBoxs);
        }
        console.log(this.idList);

      },
      distribution(){
        if (this.idList.length==0) {
          this.getToast("请选择要审核的公司",'warn')
        }else{
          axios({
          url:this.getHost()+'/Approval/AuditCompany', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            List:this.idList,
            Agree:true,
            AuditReason:''
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.getToast("审批成功",'correct')
            this.getList()
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
      },
      ...mapMutations({
      setAccessId: 'SET_ACCESSID'
    })
    }
  }

</script>

<style scoped>
@import '../../common/mask.css';
  .maskContain li{
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
  }
  .maskContain li:last-child{
    border-bottom: none;
  }
  .name{
    width: 0;
    flex-grow: 1;
  }
  .CompanyFollow {
    width: 100%;
    overflow: hidden;
  }

  .top {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 20px;
    background: white;
    padding-bottom: 16px;
    margin-bottom: 12px;
  }

  .top .search {
    width: 92%;
    height: 44px;
    margin: 0 auto;
    position: relative;

  }

  .top .search input {
    width: 80%;
    height: 96%;
    border: none;
    background: none;
    padding-left: 14px;
    border: 1px solid rgba(208, 208, 208, 1);
    border-radius: 4px;

  }

  .top .search span {
    display: block;
    width: 18%;
    height: 44px;
    background: rgba(182, 160, 121, 1);
    border-radius: 0px 4px 4px 0px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    text-align: center;
  }

  .top .classList {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 22px;
  }

  .top .classList ul {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between
  }

  .top .classList ul li {
    width: 40%;
    height: 24px;
    overflow: hidden;
    position: relative;
  }

  .top .classList ul li p {
    display: block;
    width: 74%;
    height: 22px;
    border: 1px solid rgba(182, 160, 121, 1);
    ;
    border-radius: 4px;
    font-size: 12px;
    line-height: 22px;
    padding-left: 6px;

  }

  .top .classList ul li span {
    width: 20%;
    height: 24px;
    position: absolute;
    top: 0;
    right: 2px;
    background: rgba(182, 160, 121, 1);
    border-radius: 0px 4px 4px 0px;
  }

  .top .classList ul li span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
  }

  .companyList {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    padding-bottom: 50px;
  }

  .companyList ul {
    width: 100%;
    overflow: hidden;
  }

  .companyList ul li {
    width: 100%;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .companyList ul li a {
    display: block;
    width: 100%;
    overflow: hidden;

  }

  .companyList ul li a .listTop {
    width: 100%;
    overflow: hidden;
  }

  .companyList ul li a .listTop span {
    display: block;
    width: 26px;
    height: 24px;
    background: rgba(242, 111, 83, 1);
    border-radius: 6px 0;
    float: left;
    position: relative;

  }

  .companyList ul li a .listTop span img {
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .companyList ul li a .listTop b {
    float: right;
    font-size: 12px;
    color: rgba(242, 111, 83, 1);
    font-weight: normal;
    padding-top: 10px;
    margin-right: 4px;
  }

  .companyList ul li a .listMid {
    overflow: hidden;
    width: 88%;
    padding-top: 16px;
    margin: 0 auto;
    padding-bottom: 14px;
    border-bottom: 1px solid #F0F0F0;
    /* margin-bottom: 12px; */
  }

  .companyList ul li a .listMid span {
    float: left;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-left: 6px;
    border: 1px solid #ccc;
    position: relative;
    margin-right: 14px;
  }
  .companyList ul li a .listMid span.active{
    border: 1px solid rgba(226, 199, 143, 1);
  }
  .companyList ul li a .listMid span.active::before{
    background: rgba(226, 199, 143, 1);
  }
  .companyList ul li a .listMid span::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ccc;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;


  }

  .companyList ul li a .listMid button {
    display: block;
    float: left;
    width: 22%;
    height: 20px;
    background: rgba(207, 207, 207, 1);
    border-radius: 3px;
    font-size: 10px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
    text-align: center;
    margin-right: 12px;
  }

  .companyList ul li a .listMid p {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
  }

  .companyList ul li a .listBottom {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    padding: 10px 0;
  }

  .companyList ul li a .listBottom i {
    float: left;
    font-size: 10px;
    color: rgb(230, 76, 16);
    font-style: normal;
    margin-right: 16px;
    padding-left: 23px;
  }

  .companyList ul li a .listBottom p {
    float: left;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(102, 102, 102, 1);
  }

  .companyList ul li a .listBottom b {
    float: right;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    margin-right: 15px;
  }

  footer {
    width: 100%;
    height: 55px;
    background: #636770;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  footer span {
    float: left;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-left: 6px;
    border: 1px solid #ccc;
    position: relative;
    margin-top: 19px;
    margin-left: 10px;
    margin-right: 10px;
  }
  footer span.active{
     border: 1px solid rgba(226, 199, 143, 1);
  }
  footer span.active::before{
    background: rgba(226, 199, 143, 1);
  }
  footer span::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: absolute;
    background: #ccc;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;


  }

  footer p {
    float: left;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 55px;
    margin-right: 8px;
  }

  footer button {
    float: right;
    height: 40px;
    /* background: rgba(212, 212, 212, 1); */
    border-radius: 4px;
    background: #E2C78F;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    text-align: center;
    margin-top: 8px;
    padding: 0 8px;
    margin-right: 8px;
  }
   footer .noAllow{
     background-color: #f0f0f0;
     color: #ccc;
   }

</style>
