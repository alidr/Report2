<template>
        <div class="companyContract">
            <div class="top">
                <img src="./images/111_03.png" alt="">
                <p>该公司曾被放弃跟进，请确认是否继续跟进！确认后公司将进入到您的跟进列表！</p>
            </div>
            <div class="btn">
                <button type="button" class="giveUp">放弃，返回首页</button>
                <button type="button" class="sure">确认添加，并进入公司详情页</button>
            </div>
        </div>
      </template>
      
      <script>
      export default {
        name: 'companyContract'
      }
      </script>
      
      <style scoped>
          .companyContract{
              width: 100%;
              overflow: hidden;
          }
          .top{
              background: #fff5e7;
              padding: 12px 22px;
              position: fixed;
              top: 0;left: 0;
          }
          .top img{
              float: left;
              display: block;
              width: 22px;
              height: 22px;
              margin-right: 14px;
          }
          .top p{
              font-size: 14px;
              color: #f07058;
          }
          .btn{
              width: 80%;
              position: fixed;
              bottom: 0;left: 0;right: 0;margin: auto;
              padding-bottom: 38px;
          }
          .btn button{
              width: 100%;
              height: 40px;
              border-radius: 20px;
              margin-bottom: 12px;
              
          }
          .btn .giveUp{
              background: #d4d4d4;
              font-size: 14px;
              color: white;
              text-align: center;
              line-height: 40px;
              box-shadow: 0px 6px 10px #ebeae9;
          }
          .btn .sure{
              background: #d4d4d4;
              font-size: 14px;
              color: white;
              text-align: center;
              line-height: 40px;
              background: linear-gradient(left,#E2C78F,#D5AE61);
              box-shadow: 0px 6px 10px rgba(223, 174, 72, 0.2);
          }
          
      </style>