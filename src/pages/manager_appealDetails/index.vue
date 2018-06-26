<template>
  <div class="appealDetails">
    <div class="details">
      <ul>
        <li>
          <p>申诉类型</p>
          <span>{{data.TypeName}}</span>
        </li>
        <li>
          <p>家装公司全称</p>
          <span>{{data.CompanyName}}</span>
        </li>
        <li>
          <p>公司类型</p>
          <span>{{data.CategoryName}}</span>
        </li>
        <li>
          <p>公司实际地址</p>
          <span>{{data.PCAName}}{{data.Address}}</span>
        </li>
        <li>
          <p>延期申诉天数</p>
          <span>{{data.Day}}</span>
        </li>
      </ul>
    </div>
    <div class="reason">
      <div class="title">
        <P>申诉人</P>
        <span>{{data.UserName}}</span>
      </div>
      <h5>申诉原因</h5>
      <textarea v-model="data.SateReason"></textarea>

    </div>
    <div class="voucher">
      <h5>相关凭证</h5>
      <ul>
        <li>
          <img :src="data.TypeName" alt="">
        </li>
      </ul>
    </div>

    <div class="message">
      <ul>
        <li>
          <p>现跟进信息</p>
        </li>
        <li>
          <p>经销商：{{data.DealerName}}</p>
        </li>
        <li>
          <p>业务员：{{data.SaleName}}</p>
        </li>

      </ul>

    </div>
    <div class="progress">
      <ul>
        <li>
          <span></span>
          <p>xxxx公司正在接洽中</p>
          <i></i>
        </li>
        <li>
          <span></span>
          <p>洽谈中</p>
          <i></i>
        </li>
        <li>
          <span></span>
          <p>洽谈成功</p>
          <i></i>
        </li>
        <li>
          <span></span>
          <p>签约中</p>
        </li>
      </ul>


    </div>

    <div class="record">
      <h5>申诉记录</h5>
      <ul>
        <li v-for="(item,index) in data.List" :key="index">
          <span>{{item.Date}}</span>
          <p>{{item.JobName}}{{item.UserName}}</p>
          <b>{{item.StatusName}}</b>
        </li>
      </ul>
    </div>
    <div class="recordNull">
      <h5>申诉记录</h5>
      <p>该申诉还未审核</p>
    </div>

  </div>
</template>

<script>

import qs from 'qs'
import axios from "axios";
export default {
    name: 'appealDetails',
    data(){
      return{
        data:{
          ID:'',
          TypeName:'',
          Status:'',
          CompanyName:'',
          CategoryName:'',
          PCAName:'',
          Address:'',
          UserName:'',
          Day:'',
          SateReason:'',
          SateImage:'',
          CompanyStatus:'',
          DealerName:'',
          SaleName:'',
          List:'',
        }
      }
    },
    created(){
      this.Id = this.$router.query.id
      this.getInfo()
    },
    methods:{
      getInfo(){
        axios({
        url:this.getHost()+'/Approval/GetSateDetailById', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token'),
          Id:this.Id
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.data = res.data.Data
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
  .appealDetails {
    width: 100%;
    overflow: hidden;
    padding-top: 14px;
  }

  .details {
    width: 94%;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 10px #f3efe9;
    margin-bottom: 10px;

  }

  .details ul {
    width: 100%;
    overflow: hidden;
  }

  .details ul li {
    width: 94%;
    margin: 0 auto;
    border-top: 1px solid #B1B1B1;
    overflow: hidden;
  }

  .details ul li:nth-child(1) {
    border: none;
  }

  .details ul li p {
    float: left;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;

  }

  .details ul li span {
    float: right;
    width: 50%;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }

  .reason {
    width: 94%;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 10px #f3efe9;
    margin-bottom: 10px;

  }

  .reason .title {
    width: 94%;
    margin: 0 auto;
    border-bottom: 1px solid #B1B1B1;
    overflow: hidden;
  }

  .reason .title p {
    float: left;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;
  }

  .reason .title span {
    float: right;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;
  }

  .reason h5 {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 34px;
    font-weight: normal;
    padding-left: 12px;
  }

  .reason textarea {
    display: block;
    width: 93%;
    margin: 0 auto;
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
    padding-bottom: 20px;
    height: 60px;
  }

  .voucher {
    width: 94%;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 10px #f3efe9;
    margin-bottom: 10px;
    padding-bottom: 26px;
    padding-top: 6px;


  }

  .voucher h5 {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 34px;
    font-weight: normal;
    padding-left: 12px;
    line-height: 38px;
  }

  .voucher ul {
    width: 94%;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .voucher ul li {
    overflow: hidden;
    margin-bottom: 10px;

  }

  .voucher ul li img {
    display: block;
    width: 76px;
    height: 76px;
    background: rgba(242, 242, 242, 1);
  }

  .message {
    width: 94%;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 10px #f3efe9;
    margin-bottom: 10px;

  }

  .message ul li {
    width: 94%;
    margin: 0 auto;
    border-top: 1px solid #B1B1B1;
    overflow: hidden;
  }

  .message ul li:nth-child(1) {
    border: none;

  }

  .message ul li:nth-child(1) p {
    font-size: 16px;
    color: #595959;
  }

  .message ul li p {
    font-size: 14px;
    color: #666666;
    line-height: 42px;

  }

  .progress {
    width: 94%;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 10px #f3efe9;
    margin-bottom: 10px;
    padding-bottom: 20px;
    padding-top: 20px;

  }

  

  .progress ul li span {
    float: left;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid rgba(226, 199, 143, 1);
    position: relative;
    margin-bottom: 2px;

  }

  .progress ul li span::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(226, 199, 143, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .progress ul {
    width: 94%;
    margin: 0 auto;
    overflow: hidden;
  }

  .progress ul li {
    width: 100%;
    overflow: hidden;
    margin-bottom: 2px;
  }

  .progress ul li p {
    float: left;
    font-size: 14px;
    color: #666666;
    line-height: 16px;
    padding-left: 12px;
  }

  .progress ul li i {
    clear: both;
    display: block;
    height: 34px;
    border-left: 2px dotted #e2c78f;
    margin-left: 8px;
   

  }

  .record {
    width: 94%;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 10px #f3efe9;
    margin-bottom: 10px;
    padding-bottom: 26px;
    padding-top: 6px;

  }

  .record h5 {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 34px;
    font-weight: normal;
    padding-left: 12px;
    line-height: 38px;
  }

  .record ul {
    width: 94%;
    border-top: 1px solid #e2c78f;
    border-left: 1px solid #e2c78f;
    border-right: 1px solid #e2c78f;
    margin: 0 auto;
  }

  .record ul li {
    width: 94%;
    margin: 0 auto;
    border-bottom: 1px solid #B1B1B1;
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 12px;
  }

  .record ul li:last-child {
    border: none;
  }

  .record ul li span {
    float: left;
    font-size: 12px;
    color: white;
    background: #dfdedd;
    line-height: 20px;
    text-align: center;
    padding: 0 10px;
    border-radius: 2px;
    margin-bottom: 12px;
  }

  .record ul li p {
    clear: both;
    float: left;
    font-size: 14px;
    color: #666666;
    margin-right: 26px;
  }

  .record ul li b {
    float: left;
    font-size: 14px;
    color: #e2c78f;
  }

  .recordNull {
    width: 94%;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 10px #f3efe9;
    margin-bottom: 10px;
    padding-bottom: 26px;
    padding-top: 6px;

  }

  .recordNull h5 {
    width: 88%;
    margin: 0 auto;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 34px;
    font-weight: normal;
    line-height: 38px;
    border-bottom: 1px solid #B1B1B1;

  }

  .recordNull p {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(204, 204, 204, 1);
    margin: 0 auto;
    padding: 32px 0 48px 0;
  }

</style>
