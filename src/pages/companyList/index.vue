<template>
  <!-- 家装公司列表 -->
  <div id="companyList" :class="{active:Mask}">
    <div class="companyTop">
      <div class="companyInfo" v-if="admin">
        <span class="inNegotiate">洽谈中 300</span>
        <span class="inContract">签约中 200</span>
        <span class="success">已签约 20</span>
      </div>
      <div class="search">
        <input type="text" placeholder="请输入公司名称关键词">
        <span>搜索</span>
      </div>
      <div class="FilterConditions">
        <div class="filter">
            <span class="filterResult">{{statusSelect}}</span>
            <span class="iconfont icon-xiaosanjiao icon" @click="maskStatus(0)"></span>
        </div>
        <div class="filter">
            <span class="filterResult">{{styleSelect}}</span>
            <span class="iconfont icon-xiaosanjiao icon" @click="maskStatus(1)"></span>
        </div>
        <div class="filter">
            <span class="filterResult">{{personSelect}}</span>
            <span class="iconfont icon-xiaosanjiao icon" @click="maskStatus(2)"></span>
        </div>
      </div>
      <ul class="selectListStatus" v-show="hasMask[0]">
        <li v-for="(item,index) in Status" :key="index" :class="{active:index==statusHasActive}" @click="statusListActive(index,item.name)">{{item.name}}</li>
        <div class="mask"></div>
      </ul>
      <ul class="selectListStyle" v-show="hasMask[1]">
        <li v-for="(item,index) in Style" :key="index" :class="{active:index==styleHasActive}" @click="styleListActive(index,item.name)">{{item.name}}</li>
        <div class="mask"></div>
      </ul>
      <ul class="selectListPerson" v-show="hasMask[2]">
        <li v-for="(item,index) in Person" :key="index" :class="{active:index==personHasActive}" @click="personListActive(index,item.name)">{{item.name}}</li>
        <div class="mask"></div>
      </ul>
    </div>
    <div class="list">
      <companyFilter v-if="admin" :list="List"></companyFilter>
      <focusList v-if="!admin" :list = "List"></focusList>
      <empty v-if='emptyFlag'></empty>
    </div>
    <div class="bottom" v-if="admin">
      <span class="round"><b></b></span>
      <span class="content">已选择3个家装公司</span>
      <span class="btn">分配业务员</span>
    </div>
  </div>
</template>

<script>
import companyFilter from '../../components/companyFilter';
import focusList from '../../components/focusList';

import qs from 'qs'
import axios from "axios";
import empty from '../../components/empty'

export default {
  name: 'companyList',
  components:{
    focusList,
    companyFilter,
    empty
  },
  data(){
    return{
      admin:false,
      List:[],
      emptyFlag:false,
      Mask:false,
      // 公司状态列表
      Status:[{
        id:'',
        name:'全部状态'
      },{
        id:1,
        name:'洽谈中'
      },{
        id:2,
        name:'签约中'
      },{
        id:3,
        name:'已签约'
      }],
      // 公司类型列表
      Style:[{
        id:1,
        name:'传统公司'
      },{
        id:2,
        name:'整装公司'
      },{
        id:3,
        name:'地产家装'
      },{
        id:4,
        name:'家装'
      }],
      // 业务员
      Person:[{
        id:1,
        name:'小明'
      },{
        id:2,
        name:'小红'
      },{
        id:3,
        name:'小绿'
      },{
        id:4,
        name:'小黄'
      }],
      hasMask:[false,false,false],
      // hasStatusMask:false,
      // hasStyleMask:false,
      // hasPersonMask:false,
      statusHasActive:0,
      statusSelect:"全部状态",
      personHasActive:0,
      personSelect:"全部类型",
      styleHasActive:0,
      styleSelect:"全部组员",

      keyword:'',
      StatusID:'',
      TypeID:'',
      SaleID:'',
    }
  },
  created(){
    this.getList()
  },
  methods:{
    maskStatus(index){
      if (this.hasMask[index] == true) {
          this.hasMask[index] = false   
        }else{
            
            this.hasMask[index] = true
          }
        for (let i = 0; i < this.hasMask.length; i++) {
          console.log(i)
          if (index==i) {
            continue
          }
          this.hasMask[i] = false
        }
        this.Mask = this.hasMask[index]?true:false
    },
    // maskStatus(){
    //   this.hasStatusMask = !this.hasStatusMask
    //   this.hasMask = this.hasStatusMask?true:false
    //   this.hasStyleMask = false
    //   this.hasPersonMask = false

    // },
    // maskStyle(){
    //   this.hasStyleMask = !this.hasStyleMask
    //   this.hasMask = this.hasStyleMask?true:false
    //   this.hasStatusMask = false
    //   this.hasPersonMask = false
    // },
    // maskPerson(){
    //   this.hasPersonMask = !this.hasPersonMask
    //   this.hasMask = this.hasPersonMask?true:false
    //   this.hasStyleMask = false
    //   this.hasStatusMask = false
    // },
    statusListActive(index,name){
      this.statusHasActive = index
      this.statusSelect = name
    },
    styleListActive(index,name){
      this.styleHasActive = index
      this.styleSelect = name
    },
    personListActive(index,name){
      this.personHasActive = index
      this.personSelect = name
    },
    getList(){
      axios({
        url:this.getHost()+'/Company/CompanyList', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          keyword:this.keyword,
          StatusID:this.StatusID,
          TypeID:this.TypeID,
          SaleID:this.SaleID,
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.List = res.data.Data.list
          if (this.list == '') {
                this.emptyFlag = true
              } else {
                this.emptyFlag = false
              }
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
  @import '../../common/search.css';
  @import '../../common/filter.css';
  
  .companyTop{
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
    position: relative;
  }
  .companyInfo{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #F0F0F0;
  }
  .companyInfo span{
    flex: 1;
    border-radius: 4px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }
  .companyInfo .inNegotiate{
    background-color: #F6EAD4;
    color: #BB9F61;
  }
  .companyInfo .inContract{
    background-color: #FBC1B4;
    color: #F26F53;
  }
  .companyInfo .success{
    background-color: #ccc;
    color: #fff;
    margin: 0
  }
 

  /* 筛选条件 */
  .FilterConditions{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
  }
  .FilterConditions .filter:last-child{
     margin: 0;
  }
  .list {
    padding: 0 15px;
    box-sizing: border-box;
  }
  .companyTop ul{
    position: absolute;
    left: 0;
    z-index: 10;
    width: 100%;
 }
  .companyTop ul li{
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding-left: 15px;
    box-sizing: border-box;
 }
 .companyTop ul li.active{
   color: #BB9F61;
 }
 .companyTop ul li:last-child{
   border-bottom: none;
 }
 .mask{
    width: 100%;
    height: 80vh;
    background-color: rgba(0,0,0,.3);
  }
  #companyList.active{
    height: 100vh;
    overflow: hidden;
  }


  /* 底部 */
  .bottom{
    width: 100%;
    height: 55px;
    background: #3F434F;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 60px;
    padding-right: 15px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .bottom .content{
    flex: 1;
    width: 0;
    font-size: 16px;
    color: #fff;
  }
  .bottom .btn{
    width: 110px;
    height: 40px;
    background-image: linear-gradient(to right,#E2C78F,#D5AE61);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .bottom .round{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    border: 1px solid #ccc;
    margin-right: 15px;
  }
  .bottom .round.active{
    border:1px solid #E2C78F;
  }
  .bottom .round b{
    display: flex;
    width: 16px;
    height: 16px;
    border-radius: 8px;
  }
  .bottom .round b.active{
    background-color: #E2C78F;
  }
</style>
