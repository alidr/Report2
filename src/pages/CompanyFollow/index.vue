<template>
  <!-- 公司待跟进 -->
  <div class="CompanyFollow">
    <div class="top">
      <div class="search">
        <input type="text" placeholder="请搜索公司名称关键词">
        <span>搜索</span>
      </div>
      
      <div class="classList">
        <div class="filter">
          <span class="filterResult">全部类型</span>
          <span class="iconfont icon-xiaosanjiao icon"></span>
        </div>
        <div class="filter">
          <span class="filterResult">所有状态</span>
          <span class="iconfont icon-xiaosanjiao icon"></span>
        </div>
        <div class="filter">
          <span class="filterResult">组员</span>
          <span class="iconfont icon-xiaosanjiao icon"></span>
        </div>
      </div>
    </div>
    <div class="companyList">
      <ul>
        <li>
            <router-link to="/">
              <div class="listTop">
                <span><img src="./guanzhu_03.png" alt=""></span>
                <b>剩余保护期：5天</b>
              </div>
              <div class="listMid">
                <span></span>
                <button type="button">已删除</button>
                <p>家装公司名称</p>
              </div>
              <div class="listBottom">
                <i>2018/11/01</i>
                <p>到公司拜访了一下王经理</p>
                <b>小A</b>
              </div>
            </router-link>
        </li>
        <li>
            <router-link to="/">
              <div class="listTop">
                <span><img src="./guanzhu_03.png" alt=""></span>
                <b>剩余保护期：5天</b>
              </div>
              <div class="listMid">
                <!-- <span></span> -->
                <button type="button">已删除</button>
                <p>家装公司名称</p>
              </div>
              <div class="listBottom">
                <i>2018/11/01</i>
                <p>到公司拜访了一下王经理</p>
                <b>小A</b>
              </div>
            </router-link>
        </li>
      </ul>
    </div>

    <!-- <footer>
      <span></span>
      <p>已选择<b></b>个家装公司</p>
      <button type="button">分配业务员</button>
    </footer> -->
  </div>
</template>

<script>
  export default {
    name: 'CompanyFollow'
  }

</script>

<style scoped>
@import '../../common/filter.css';
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
  padding: 22px 0 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border: 1px solid rgba(182, 160, 121, 1);;
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
.companyList ul li a{
  display: block;
  width: 100%;
  overflow: hidden;
}
.companyList ul li a .listTop{
  width: 100%;
  overflow: hidden;
}
.companyList ul li a .listTop span{
  display: block;
  width:26px;
  height:24px;
  background:rgba(242,111,83,1);
  border-radius:6px 0;
  float: left;
  position: relative;
}
.companyList ul li a .listTop span img{
  display: block;
  width:12px;
  height:12px;
  position: absolute;
  top: 0;bottom: 0;left: 0;right: 0;
  margin: auto;
}
.companyList ul li a .listTop b{
  float: right;
  font-size:12px;
  color:rgba(242,111,83,1);
  font-weight: normal;
  padding-top: 10px;
  margin-right: 4px;
}
.companyList ul li a .listMid{
  overflow: hidden;
  width: 88%;
  padding-top: 16px;
  margin: 0 auto;
  padding-bottom: 14px;
  border-bottom:1px solid #F0F0F0;
  margin-bottom: 12px;
} 
.companyList ul li a .listMid span{
  float: left;
  display: block;
  width:16px;
  height:16px;
  border-radius: 50%;
  margin-left: 6px;
  border:1px solid rgba(226,199,143,1);
  position: relative;
  margin-right: 14px;
}
.companyList ul li a .listMid span::before{
  content:'';
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background:rgba(226,199,143,1);
  position: absolute;
  top: 0;bottom: 0;left: 0;right: 0;
  margin: auto;
}
.companyList ul li a .listMid button{
  display: block;
  float: left;
  width:22%;
  height:20px;
  background:rgba(207,207,207,1);
  border-radius:3px;
  font-size:10px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  line-height:18px;
  text-align: center;
  margin-right: 12px;
}

.companyList ul li a .listMid p{
  float: left;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  line-height:20px;
}
.companyList ul li a .listBottom{
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.companyList ul li a .listBottom i{
  float: left;
  font-size:10px;
  color:rgba(102,102,102,1);
  font-style: normal;
  margin-right: 16px;
  padding-left: 23px;
}
.companyList ul li a .listBottom p{
  float: left;
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(102,102,102,1);
}
.companyList ul li a .listBottom b{
  float: right;
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  margin-right: 7px;
}
footer{
  width: 100%;
  height: 55px;
  background: #636770;
  position: fixed;bottom: 0;left: 0;
}
footer span{
  float: left;
  display: block;
  width:16px;
  height:16px;
  border-radius: 50%;
  margin-left: 6px;
  border:1px solid rgba(226,199,143,1);
  position: relative;
  margin-right: 14px;
  margin-top: 19px;
  margin-left: 36px;
}
footer span::before{
  content:'';
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background:rgba(226,199,143,1);
  position: absolute;
  top: 0;bottom: 0;left: 0;right: 0;
  margin: auto;
}
footer p{
  float: left;
  font-size:16px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  line-height: 55px;
}
footer button{
  float: right;
  display: block;
  width:115px;
  height:40px;
  background:rgba(212,212,212,1);
  border-radius:4px;
  background: linear-gradient(left,#E2C78F,#D5AE61);
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  line-height: 40px;
  text-align: center;
  margin-right: 24px;
  margin-top: 8px;
}
</style>
