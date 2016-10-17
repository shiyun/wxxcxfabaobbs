var data_list = require('../../api/data_list.js');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {    
    userInfo: {},
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: ['red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'],
    iconType: [
      'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'
    ],
    isShow: true,
    dataListWrap: data_list.result.topics,
    dataList: [],
    wHeight: 0
  },
  
  onLoad() {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    });

    that.data.dataListWrap.map((data)=>{
        that.data.dataList.push(data.topic);
    });

    wx.getSystemInfo({
      success: function(data){
        that.setData({wHeight: data.windowHeight})
      },
      fail: function(err){
        console.log(err)
      }
    });
  },

  changeShow(){
    let that = this;
    that.setData({
      isShow: !that.data.isShow
    });   
  },

  upper(e){
    console.log(e)
  },

  lower(e){
    console.log(e);
  }
})
