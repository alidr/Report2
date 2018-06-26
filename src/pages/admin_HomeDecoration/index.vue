<template>
  <!-- 家装公司管理 -->
  <div class="HomeDecoration companyTop" :class="{active:Mask}">
    <!-- 上部 -->
    <div class="top">
      <div class="topBtn">
        <button type="button">洽谈中
          <span>{{count.Negotiation}}</span>
        </button>
        <button type="button">签约中
          <span>{{count.Progressive}}</span>
        </button>
        <button type="button">已签约
          <span>{{count.Complete}}</span>
        </button>
      </div>
      <div class="search">
        <input type="text" placeholder="请搜索公司名称关键词">
        <span>搜索</span>
      </div>
      <div class="FilterConditions " >
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
   <!-- 公司列表 -->
   <div class="comList">
      <focusList :list="List" id="list"></focusList>
   </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import axios from "axios";
  import focusList from "../../components/focusList";
  export default {
    name: 'HomeDecoration',
    data(){
      return{
        keyword:'',
        StatusID:'',
        TypeID:'',
        SaleID:'',
        count:{
          Negotiation:'',
          Progressive:'',
          Complete:''
        },

        List:[1,1,1,1],
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
      }
      
    },
    components:{
    focusList,
    },
    created(){
      this.getList()
      this.getTotalData()
    },
    methods:{
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
      getTotalData(){
        axios({
          url:this.getHost()+'/Company/Count', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token')
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.count = res.data.Data
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
      maskStatus(index){
        if (this.hasMask[index] == true) {
          
          this.hasMask[index] = false   
        }else{
            
            this.hasMask[index] = true

          }
        for (let i = 0; i < this.hasMask.length; i++) {
          
          if (index==i) {
            continue
          }
          this.hasMask[i] = false
        }
        this.Mask = this.hasMask[index]?true:false
      },
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
      }
    }
  }

</script>

<style scoped>
 @import '../../common/filter.css';
  .FilterConditions{
    padding: 0 10px;
  }
  .HomeDecoration {
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

  .top .topBtn {
    width: 92%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F0F0F0;
    padding-bottom: 14px;
    margin: 0 auto;
    margin-bottom: 12px;
  }

  .top .topBtn button {
    width: 29%;
    height: 38px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
  }

  .top .topBtn button:nth-child(1) {
    width: 29%;
    height: 38px;
    background: rgba(246, 234, 212, 1);
    border-radius: 6px;
    font-size: 14px;
    color: rgba(187, 159, 97, 1);
    line-height: 38px;
    text-align: center;
  }

  .top .topBtn button:nth-child(2) {
    width: 29%;
    height: 38px;
    background: rgba(251, 193, 180, 1);
    border-radius: 6px;
    font-size: 14px;
    color: #F26F53;
    line-height: 38px;
    text-align: center;
  }

  .top .topBtn button:nth-child(3) {
    width: 29%;
    height: 38px;
    background: rgba(207, 207, 207, 1);
    border-radius: 6px;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 38px;
    text-align: center;
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
    width: 30%;
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
    content:'';
    position: absolute;
    top: 0;left: 0;bottom: 0;right: 0;margin: auto;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
  }

  .companyList {
    width: 88%;
    overflow: hidden;
    margin: 0 auto;
  }

  .companyList ul {
    width: 100%;
    overflow: hidden;
  }

  .companyList ul li {
    width: 100%;
    overflow: hidden;
    height: 116px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin-bottom: 15px;
  }
  .comList{
    width: 92%;
    margin: 0 auto;
  }
  

</style>
