<template>
<!-- 公司详情 -->
  <div id="companyDetail"> 
    <!-- 家装公司基础信息 -->
    <div class="basicInfo">
      <div class="basicInfoTop">
        <div class="basic">
          <p class="status">
            <span>{{data.StatusName}}</span>
            <span>{{data.Name}}</span>
          </p>
          <p class="person">业务员 {{data.UName}}</p>
        </div>
        <div class="topIcon">
          <span @click="showMask(true)">
            <img src="./Settings.png" alt="">
          </span>
          <span>
            <img src="./common.png" alt="" v-if="!data.IsEmphasis" @click="Emphasis(false)">
            <img src="./collect.png" alt="" v-if="data.IsEmphasis"
            @click="Emphasis(true)">
          </span>
        </div>
        
      </div>
      <div class="basicInfoBottom">
        <p>
          <i><img src="./name.png" alt=""></i>
          <span>联系人</span>
          <span class="color">{{data.UserName}}</span>
           <i class="job"><img src="./job.png" alt=""></i>
          <span>岗位</span>
          <span class="color">{{data.JobName}}</span>
        </p>
        <p>
          <i><img src="./tel.png" alt=""></i>
          <span>联系方式</span>
          <span class="color">{{data.Mobile}}</span>
        </p>
        <p>
          <i><img src="./address.png" alt=""></i>
          <span>联系地址</span>
          <span class="color">{{data.UserAddress}}</span>
        </p>
        <p>
          <i><img src="./photo.png" alt=""></i>
          <span>门头照</span>
          <span class="color" @click="getImg(data.HeadImageUrl)">查看门头照</span>
        </p>
        <div v-if="isExpend" class="otherInfo">
          <p>
          <span>公司类型</span>
          <span class="color">{{data.CategoryName}}</span>
          </p>
          <p>
            <span>公司简称</span>
            <span class="color">{{data.ShortName}}</span>
          </p>
          <p>
            <span>公司地址</span>
            <span class="color">{{data.PCAName}}+{{data.Address}}</span>
          </p>
        </div>
        
        <p id="expend" @click="handleExpend"><span>{{expendWord}}</span></p>
      </div>

    </div>
    <!-- 跟进信息 -->
    <div class="followInfo">
      <div class="followDays">
        <p>当前已跟进<span>{{data.NowFollowDay}}</span>/{{data.FollowDay}}天</p>
        <a href="javascript:;" @click="approvalRecord(ID)">审批记录>></a>
      </div>
      <p class="uploadAuthorized">
        <span class="round" :class="{'active':btnActive}"><i :class="{'active':btnActive}">1</i></span>
        <span class="statusDetail" :class="{'active':btnActive}">洽谈成功，申请签约</span>
        <a href="javascript:;" class="applyBtn" :class="{'active':btnActive}" v-if="applyshou" @click="applyAuthorized(1)">申请授权</a>
        <a href = "javascript:;" class="applyBtn active"  v-if="!applyshou" @click="applyAuthorized(2)">查看授权凭证</a>
        <!-- <span class="applyStatus active" >审核通过</span> -->
      </p>
      <span class="line"></span>
      <p class="uploadContract">
        <span class="round" :class="{'active':btn2Active}"><i :class="{'active':btn2Active}">2</i></span>
        <span class="statusDetail" :class="{'active':btn2Active}">授权书照片</span>
        <a href="javascript:;" class="applyBtn" :class="{'active':btn2Active}" v-if="applyshu"  @click="uploadContract(1)">上传授权书</a>
        <a href = "javascript:;" class="applyBtn active" v-if="!applyshu" @click="getImg(data.AuthBookImage)" >查看授权书</a>
      </p>

      <!-- <p class="uploadContract">
        <span class="round"><i>2</i></span>
        <span class="statusDetail">授权书照片</span>
        <a href="javascript:;" class="applyBtn" v-if="applyshu">上传授权书</a>
        <a href="javascript:;" class="applyBtn active" v-if="!applyshu">查看授权书</a> -->
        <!-- <span class="applyStatus">审核通过</span> -->
      <!-- </p> -->
      <span class="line"></span>

      <p class="applyAuthorized">
        <span class="round" :class="{'active':btn3Active}"><i :class="{'active':btn3Active}">3</i></span>
        <span class="statusDetail" :class="{'active':btn3Active}" >上传签约合同</span>
        <a href="javascript:;" class="applyBtn" :class="{'active':btn3Active}" v-if="applyhe" @click="uploadContract(2)">上传签约合同</a>


        <a href = "javascript:;" class="applyBtn active" v-if="!applyhe" @click="getImg(data.ContractImage)" >查看合同</a>
      </p>
      <!-- <p class="applyAuthorized">
        <span class="round"><i>3</i></span>
        <span class="statusDetail">上传合同</span>
        <router-link to="/uploadContract" class="applyBtn" v-if="applyhe">上传签约合同</router-link>
         <a href="javascript:;" class="applyBtn active" v-if="!applyhe">查看授权书</a> -->
        
        <!-- <span class="applyStatus">审核通过</span> -->
      <!-- </p> -->
    </div>
    <!-- 跟单时间线 -->
    <div class="followTime">
      <div class="followTimeTop">
        <p>
          <span>跟单时间线</span>
          （{{timeList.length}}）
          <span class="upload" @click="addFollow" v-if="show">添加跟单行动</span>
        </p>
        
      </div>
      <div class="followTimeBottom">
        <div class="followTimeDetail" v-for="(item,index) in timeList" :key="index" v-show="index<isExtendTimeLine" >
          <p class="Date">
            <span>{{item.CreateDate}}</span>
            <span>跟进人：{{item.UserName}}</span>
            <i @click="deleteTimeLine(item.ID)"><img src="./delete.png" alt=""></i>
          </p>
          <p class="detail">{{item.Content}}</p>
          <div class="timeLineImg">
            <img :src="getImgHost()+item.Image1" alt="" v-if="item.Image1!=''" @click="getImg(item.Image1)">
            <img :src="getImgHost()+item.Image2" alt="" v-if="item.Image2!=''"
            @click="getImg(item.Image2)">
            <img :src="getImgHost()+item.Image3" alt="" v-if="item.Image3!=''"
            @click="getImg(item.Image3)"> 
          </div>
        </div>
        <div class="infoNull" v-if="timeList.length==0">
          信息为空
        </div>
        <p id="expend" @click="expendTimeLine" v-if="timeList.length>1"><span>{{timeLineWord}}</span></p>
      </div>

    </div>
    <!-- 竞品分析 -->
    <div class="competition">
      <div class="followDays">
        <p>竞品分析 <span class="month">{{complete.Month}}月</span></p>
        <a href="javascript:;" @click="allMonth">所有月份>></a>
      </div>
      <div class="competitionInfo" v-if="infoNull">
        <p>
          <span>竞品销量</span>
          <span>{{complete.SaleCount}}</span>
        </p>
         <p>
          <span>竞品开工数</span>
          <span>{{complete.WorkCount}}</span>
        </p>
         <p>
          <span>竞品出样量</span>
          <span>{{complete.SampleCount}}</span>
        </p>
      </div>
      <div class="competitionNum" v-if="infoNull">
        <p>门店数量&emsp;{{complete.ShopCount}}</p>
        <p>设计师数&emsp;{{complete.StylistCount}}</p>
      </div>
      <div class="infoNull" v-if="!infoNull">
          信息为空
      </div>
      <router-link to="/editCompete"  id="button" v-if="show">编辑当前月份数据</router-link>
    </div>
    <!-- 直营店信息 -->
    <div class="shopInfo">
      <div class="followDays">
        <p>直营门店信息</p>
        <span class="upload" v-if="busniessShopShow" @click="look">查看直营分店证明</span>
        <span class="upload" v-if="!busniessShopShow" @click="uploadContract(3)">上传直营分店证明</span>
        <!-- <span class="reUpload" v-if="busniessShopShow">重新上传</span> -->
      </div>
      <div class="ShopMsg" v-if="afterUpload">
        <p>合同签约成功后</p>
        <p>才可添加该模块信息</p>
      </div>
      <div class="ShopDetailInfo" v-if="ShopListShow">
        <p v-for="(item,index) in shopList" :key="index">{{item.Name}}<span>{{item.Address}}</span><i @click="deleteShopMask(true,item.ID)"><img src="./delete.png" alt="" v-if="show"></i></p>
      </div>
      <div class="followDays addShop">
        <span class="upload" v-if="ShopListShow" @click="addShop(true)">添加直营门店</span>
      </div>
    </div>

    <!-- 遮罩 -->
    <div id="mask" v-show="isShowMask">
      <div class="maskContain" v-if="nav">
        <a href="javascript:;" class="modifyPsd" @click="editCompany(ID)" v-if="edit">编辑公司信息</a>
        <a href="javascript:;" class="loginOut" @click="showGiveUp(true)" v-if="AccessId ==5 ">放弃跟进</a>
        <a href="javascript:;" class="delete" @click="showDelete(true)">删除</a>
        <a href="javascript:;" class="cancel" @click="showMask(false)">取消</a>
      </div>
      <div class="maskContain" v-if="giveUp">
        <p class="title">放弃跟进原因</p>
        <div class="textarea">
          <textarea name="" id="" cols="30" rows="6" v-model="giveUpReason"></textarea>
        </div>
        <div class="btn">
          <span class="cancel" @click="showGiveUp(false)">取消放弃</span>
          <span class="confirm" @click.stop="giveUpFollow">确认放弃</span>
        </div>
      </div>
      <div class="maskContain" v-if="isDelete">
        <div class="content">
          确认删除该家装公司？
        </div>
        <div class="btn">
          <span class="cancel" @click="showDelete(false)">取消</span>
          <span class="confirm" @click="confirmDelete">确认</span>
        </div>
      </div>
    </div>
    <div id="mask" v-show="isImgMask" @click="hideImgMask">
      <div class="img" v-if="isShowImg">
        <img :src="getImgHost()+src" alt="">
      </div>
    </div>
    <!--  -->
    <div id="mask" v-show="addShopMask">
       <div class="maskContain">
        <p class="title">添加直营门店</p>
         <div class="input">
           <span>直营门店名称<i>*</i></span>
           <input type="text" placeholder="请输入直营门店名称" v-model="shopName">
         </div>
         <div class="input">
           <span>门店地址<i>*</i></span>
           <input type="text" placeholder="请输入直营门店地址" v-model="shopAdress">
         </div>
        <div class="btn">
          <span class="cancel" @click="addShop(false)">取消</span>
          <span class="confirm" @click.stop="comfirmAddShop">确认</span>
        </div>
      </div>
    </div>
    <div id="mask" v-show="deleteShopWarn">
      <div class="maskContain">
        <div class="content">
          确认删除吗？
        </div>
        <div class="btn">
          <span class="cancel" @click="deleteShopMask(false)">取消</span>
          <span class="confirm" @click="deleteShop">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import axios from "axios";
import {mapGetters, mapMutations } from 'vuex'
export default {
  data(){
    return{
      shopID:'',
      deleteShopWarn:false,
      shopName:'',
      shopAdress:'',
      giveUpReason:'',
      isShowMask:false,
      isImgMask:false,
      nav:false,
      giveUp:false,
      isDelete:false,
      ID:-1,
      styleId:-1,
      data:{
        Status:'',
        StatusName:'',
        Name:'',
        IsEmphasis:'',
        UName:'',
        UserName:'',
        JobName:'',
        Mobile:'',
        UserAddress:'',
        HeadImageUrl:'',
        FollowDay:'',
        NowFollowDay:'',
        AuthBookImage:'',
        ContractImage:'',
        IsShowLook:false,
        ProveImage:''
      },
      isShowImg:false,
      src:'',
      isExpend:false,
      expendWord:"展开",
      applyshou:true,
      applyshu:true,
      applyhe:true,
      btnActive:false,
      btn2Active:false,
      btn3Active:false,

      timeList:[],
      timeLineWord:'展开',
      isExtendTimeLine:1,
      complete:{
        Month:'',
        SaleCount:'',
        WorkCount:'',
        SampleCount:'',
        ShopCount:'',
        StylistCount:'',
      },
      infoNull:false,
       //show业务员独有的部分
      show:false,
      busniessShopShow:false,
      ShopListShow:false,
      heShow:false,
      shopList:[],
      edit:false,
      afterUpload:true,
      addShopMask:false
    }
  },
  created(){
    localStorage.removeItem("companyId")
    this.ID = this.$route.query.id
    this.showModel()
    this.getTimeLine(this.ID)
    this.getComplete(this.ID)   
  },
  computed: {
    ...mapGetters([
      'AccessId'
    ])
  },
  methods:{
    deleteShop(){
      axios({
        url:this.getHost()+'/Company/DelShopById', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:this.shopID
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.deleteShopMask(false)
          this.getToast("删除成功",'correct')
          this.getShop(this.ID)
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
    deleteShopMask(bool,ID){
      this.deleteShopWarn = bool;
      this.shopID = ID||""
    },
    comfirmAddShop(){
      if (!this.shopName) {
        this.getToast("请输入直营店名字")
        return
      }else if (!this.shopAdress) {
        this.getToast("请输入直营店地址")
        return
      }
      axios({
        url:this.getHost()+'/Company/ShopSave', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          CompanyID:this.ID,
          Name:this.shopName,
          Address:this.shopAdress
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.addShop(false)
          this.getToast("添加直营店成功",'warn')
          this.getShop(this.ID)
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
    addShop(bool){
      this.addShopMask = bool
    },
    look(){
      if (!this.data.ProveImage) {
        this.getToast("合同上传后才能查看",'warn')
      }else{
        this.getImg(this.data.ProveImage)
      }
    },
    //判断是否为业务员
    showModel(){
      if (this.AccessId==5) {
        //show业务员独有的部分
        this.show = true
      }else{
        this.show=false
      }
      this.getInfo(this.ID)
    },
    //判断直营店模块
    // showShopModel(){

    // },
    // 菜单弹层
    showMask(bool){
      this.isShowMask = bool;
      this.nav = bool;
      this.giveUp = false;
      this.isDelete = false;
    },
    // 放弃跟进
    showGiveUp(bool){
      console.log(bool);
      
      this.isShowMask = bool;
      this.giveUp = bool;
      this.nav = false;
      this.isDelete = false;
    },
    // 删除
    showDelete(bool){
      this.isShowMask = bool;
      this.isDelete = bool;
      this.nav = false;
      this.giveUp = false;
    },
    //跳转添加跟单行动
    addFollow(){
      this.$router.push({
        path: '/action',
        // query: {
        //   id: num
        // }
      })
    },
    //获取基础信息
    getInfo(ID){
      axios({
        url:this.getHost()+'/Company/CompanyDetailById', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:ID
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.data = res.data.Data
          console.log(this.data.Status);
          //公司状态
          // 是否为已签约
          if (this.data.Status==3) {
            //已签约是否有证明
            if (this.data.ProveImage) {
              //查看直营店按钮
              this.busniessShopShow = true
              this.ShopListShow=true
              this.afterUpload = false
              this.getShop(this.ID)
            }else{
              console.log(this.show);
              
              if (this.show) {
                this.busniessShopShow = false
              }else{
              this.busniessShopShow = true
              }
            }
          }else{
            //上传提醒
            this.afterUpload = true
            this.busniessShopShow = true
          }
          
          //   if (this.data.Status==3) {
          //     if (this.show) {
          //       if (this.data.ProveImage) {
          //         this.getShop(this.ID)
          //         this.ShopListShow=true
          //       }else{
          //         this.busniessShopShow = true
          //       } 
          //   } 
          // }else{
          //    this.lookShop = true
          // }
          //业务员
          if (this.AccessId ==5 ||this.AccessId==-1){
            this.edit = true
          }
          if (this.AccessId ==5) {
             if (this.data.IsShowLook) {
              this.applyshou = false
            }else{
              this.applyshou = true
              this.btnActive = true
            }
            
            if (this.data.ContractImage) {
              
              this.applyhe = false
            }else{
              this.applyhe = true
              this.btn3Active = true
            }
          }else{
            if (this.data.IsShowLook) {
              this.applyshou = false
            }else{
              this.applyshou = true
              this.btnActive = false
            }

             if (this.data.ContractImage) {
              this.applyhe = false
            }else{
              this.applyhe = true
              this.btn3Active = false
            }
          }
        //区域经理
          if (this.AccessId ==3) {
             if (this.data.AuthBookImage) {
              this.applyshu = false
            }else{
              this.applyshu = true
              this.btn2Active = true
            }
          }else{
            if (this.data.AuthBookImage) {
              this.applyshu = false
            }else{
              this.applyshu = true
              this.btn2Active = false
            }
          }


        }else if (res.data.Status<0) {
          this.getToast(res.data.Message,'warn')
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
    //获取跟单时间线信息
    getTimeLine(ID){
      axios({
        url:this.getHost()+'/Company/CompanyDocList', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:ID
        })
      })
      .then(res=>{
        // console.log(res)
        if (res.data.Status===1) {
          this.timeList = res.data.Data.list
          // console.log(this.timeList)
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
    //获取竞品信息
    getComplete(ID){
      axios({
        url:this.getHost()+'/Company/CompanyAnalyzeByYM', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Year:'',
          Month:'',
          CompanyID:ID
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
           this.complete=res.data.Data
          if (this.complete.Code ==1) {
           this.infoNull = true
          }else{
            this.infoNull = false
          }
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
    //获取直营门店
    getShop(ID){
      axios({
        url:this.getHost()+'/Company/ShopList', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          id:ID
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
           this.shopList=res.data.Data.list
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
    //跳转编辑公司
    editCompany(id){
      this.$router.push({
        path:'/editCompany',
        query:{id:id}
      })
    },
    getImg(src){
      this.src = src
      console.log(this.src);
      this.isImgMask = true
      this.isShowImg = true
    },
    hideImgMask(){
      this.isImgMask = false
    },
    handleExpend(){
      this.isExpend = !this.isExpend
      this.expendWord=this.isExpend?"收起":"展开"
    },
    expendTimeLine(){
      this.isExtendTimeLine = this.isExtendTimeLine==1?this.timeList.length:1
      
      if (this.timeList.length==1) {
        this.timeLineWord = ""
      }else{
        this.timeLineWord =  this.isExtendTimeLine==1?"展开":"收起"
      }
    },
    //删除时间线
    deleteTimeLine(id){
      axios({
        url:this.getHost()+'/Company/DelDocumentary', 
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
          this.getToast("删除成功",'correct')
          this.getTimeLine(this.ID)
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
    allMonth(){
      this.$router.push({
        path:'/competeProduct',
        query:{
          id:this.ID
        }
      })
    },
    approvalRecord(ID){
      localStorage.setItem("companyId",ID)
       this.$router.push({
        path:'/approvalRecord'
      })
      
    },
    //申请授权
    //num==1 申请
    //num==2 查看
    applyAuthorized(num){
      console.log('this.btnActive'+this.btnActive);
      
      if (this.btnActive ||!this.applyshou) {
        this.$router.push({
          path:'/applyAuthorized',
          query:{
            id:this.ID,
            lookStyle:num
          }
        })
      }
    },
    //上传合同
    //1授权书
    //2合同
    uploadContract(num){
      if (this.btn3Active||this.btn2Active) {
        this.$router.push({
          path:'/uploadContract',
          query:{
            id:this.ID,
            style:num
          }
        })
      }
    },
    //放弃跟进
    giveUpFollow(){
      console.log(this.giveUpReason);
      
      if (!this.giveUpReason) {
        this.getToast("请输入放弃跟进的原因",'warn')
        return
      }
      axios({
        url:this.getHost()+'/Company/AbandonCompanyById', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:this.ID,
          AbandonReason:this.giveUpReason
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.getToast("放弃跟进成功",'warn')
          setTimeout(() => {
            this.$router.push({
              path:'/home'
            })
          }, 2000);
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
    confirmDelete(){
      axios({
        url:this.getHost()+'/Company/DelCompanyById', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:this.ID
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.getToast("删除成功",'warn')
          setTimeout(() => {
            this.$router.push({
              path:'/home'
            })
          }, 2000);
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
    //重点关注
    Emphasis(bool){
      this.data.IsEmphasis = !this.data.IsEmphasis
      axios({
        url:bool?this.getHost()+'/Company/CancelEmphasisById':this.getHost()+'/Company/SetEmphasisById', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:this.ID
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          
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
    ...mapMutations({
      setAccessId: 'SET_ACCESSID'
    }),
  }
}
</script>
<style scoped>
@import '../../common/mask.css';
@import '../../common/input.css';

#mask .img{
  width: 80%;
}
#mask .img img{
  width: 100%;
}
/* .maskContain{
  padding: 15px 0;
} */
.btn{
  margin-top: 15px;
}
.title{
  margin-bottom: 15px;
}
.otherInfo{
  margin-top: 15px;
  border-top: 1px solid #f0f0f0;
}
.otherInfo p{
  margin-bottom: 10px;
  height: 25px;
}
.basicInfoBottom .otherInfo p :nth-child(2){
  width: auto;
}
#companyDetail{
  padding: 15px;
  box-sizing: border-box;
}
/* 基础信息 */
.basicInfo,.followInfo,.followTime,.competition,.shopInfo{
  background-color: #fff;
  width: 100%;
  border-radius: 4px;
  padding:0 15px 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
.basicInfoTop{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #f0f0f0;
}
.basic{
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 0;
  flex: 1;

}
.status{
  margin-bottom: 15px;
}
.status span:first-child{
  padding: 0 10px;
  background-color: #F6EAD4;
  color: #BB9F61;
  border-radius: 4px;
  height: 20px;
  display: inline-block;
  line-height: 20px;
}
.status span:nth-child(2){
  font-size: 16px;
  font-weight: 600;
  margin-left: 5px;
}
.person{
  color: #999999;
  font-size: 12px;
}
.topIcon{
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topIcon span{
  flex: 1;
}
.topIcon span img{
  width: 33px;
}

.basicInfoBottom{
  margin-top: 15px;
  font-size: 12px;
  color: #666666;
  min-height: 120px;
}
.basicInfoBottom p{
  display: flex; 
  align-items: center;
  margin-bottom: 5px;
}
.basicInfoBottom p i img{
  width: 16px;
}
.basicInfoBottom p i{
  margin-right: 5px;
  display: flex; 
  align-items: center;
  height: 100%;
}
.job{
  margin-left: 35px;
}
.job img{
  width:12px !important;
}

.basicInfoBottom p span{
  display: inline-block;
  margin-right: 10px;
}
.basicInfoBottom p :nth-child(2){
  display: flex;
  width: 60px;
}
.color{
  color: #4d4d4d;
}
#expend{
  display: flex;
  align-items: center;
  margin-top: 10px;
}
#expend span{
  width: 0;
  flex-grow: 1;
  text-align: right;
  color: #4d4d4d;
  font-size: 12px;
}

/* 跟进信息 */
.followInfo{
  padding-bottom: 15px;
}
.followDays{
  display: flex;
  align-items: center;
  padding: 15px 0;
}
.followDays  p{
  width: 0;
  flex-grow: 1;
  font-size: 16px;
  font-weight: 500;
  color: #4d4d4d;
  display: flex;
  align-items: center;
}
.followDays  p span{
  font-size: 20px;
  color: #BB9F61;
}
.followDays  a{
  color: #BB9F61;
}
.applyAuthorized,.uploadAuthorized,.uploadContract{
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #ccc;
}
.round{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border: 1px solid #CCC;
  margin-right: 10px;
}
.round i{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #ccc;
  color: #fff;
}
.round.active{
  border: 1px solid #BB9F61;
}
.round i.active{
  background-color: #BB9F61;
}
.applyBtn{
  width: 85px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}
.applyStatus{
  width: 0;
  flex-grow: 1;
  text-align: right;
}
.line{
  display: flex;
  height: 32px;
  width: 10px;
  border-left: 1px dotted #ccc;
  margin-left: 11px;
}
.applyBtn.active{
  border: 1px solid #BB9F61;
  color: #BB9F61;
}
.statusDetail{
  width: 108px;
}
.statusDetail.active,.applyStatus.active{
  color: #666;
}
/* 跟单时间线 */

.followTimeTop,.competitionNum{
  display: flex;
  align-items: center;
  padding-top: 10px;
  margin-bottom: 10px;
}

.followTimeTop p{
  width: 0;
  flex-grow: 1;
  color: #4d4d4d;
}
.followTimeTop p span{
  font-size: 16px;
}
.followTimeTop p span:nth-child(2){
  float: right;
}
.followTimeDetail{
  border: 1px solid #BB9F61;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
}
.followTimeDetail .Date{
  margin-bottom: 10px;
  color:#666;
  display: flex;
  align-items: center;
}
.followTimeDetail .Date span:nth-child(2){
  width: 0;
  flex-grow: 1;
  margin-left: 5px;
}
.followTimeDetail .Date i{
  display: flex;
  justify-content: center;
}
.followTimeDetail .Date i img{
  width: 40px;
  height: 27px;
}
.followTimeDetail .detail{
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #999;
}
.timeLineImg{
  display: flex;
  justify-content: center;
  align-items: center
}
.timeLineImg img{
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

/* 竞品分析 */

.followDays .month{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #F6EAD4;
  border-radius: 4px;
  padding:0 10px;
  height: 20px;
  margin-left: 10px;
}
.competitionInfo{
  display: flex;
  padding: 10px;
  border-top: 4px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.competitionInfo p{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  border-right: 1px solid #f0f0f0;
}
.competitionInfo p:last-child{
  border: none;
}
.competitionInfo p span:first-child{
  margin-bottom: 10px;
}
.competitionNum{
  padding: 10px 0;
}
.competitionNum p{
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.competitionNum p:first-child{
  border-right: 1px solid #f0f0f0;
}
#button{
  background-image: none;
  border: 1px solid #BB9F61;
  color: #BB9F61;
}

/* 直营店信息 */
.shopInfo .followDays{
  border-bottom: 1px solid #f0f0f0;
}
.shopInfo .followDays span,.followTimeTop span:nth-child(2){
  font-size: 12px;
  padding:5px 10px;
  border-radius: 4px;
}
.upload{
  background-color: #E2C78F;
  color: #fff;
  margin-right: 10px;
}
.reUpload{
  color: #E2C78F;
  border: 1px solid #E2C78F;
}
.ShopMsg{
  height: 140px;
  font-size: 28px;
  color: #ccc;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* <div class="ShopDetailInfo">
        <p>直营门店1<span>门店地门店地址门店地址址门店地址</span><i><img src="./delete.png" alt=""></i></p>
        <p>直营门店2<span>门店地门店地址门店地址址门店地址</span> <i><img src="./delete.png" alt=""></i></p>
      </div> */
.ShopDetailInfo p{
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  height: 45px;
}
.ShopDetailInfo p span{
  width: 0;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
  color: #a7a7a7;
}
.ShopDetailInfo p i{
  display: flex;
  justify-content: center;
  align-items: center;
}
.ShopDetailInfo p img{
  width: 40px;
}
.addShop{
  justify-content: center;
  border: none !important;
}

.infoNull{
  color: #ccc;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-top: 4px solid #f0f0f0;
}
</style>


