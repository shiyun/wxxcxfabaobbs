//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getList: function(){
    wx.request({
      url: 'http://mobileaccess.alpha.pocketlawyer.cn/wxapi/testapi',
      data: {
        
      },
      header:{
          "Content-Type":"application/json"
      },
      success: function(res) {
        //var data = res.data;
        console.log(res);
      }
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  }
})
