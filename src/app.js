//app.js
App({
  onLaunch() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('list') || []
    wx.setStorageSync('logs', logs)    
  },

  getUserInfo(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },

  getDeviceInfo(cb){
    let that = this;
    if(that.globalData.deviceInfo){
      cb && cb(that.globalData.deviceInfo);
    }else{
      wx.getSystemInfo({
        success(res){
          that.globalData.deviceInfo = res;
          cb && cb(that.globalData.deviceInfo);
        }
      })
    }
  },

  globalData:{
    userInfo  : null,
    deviceInfo: null
  }
})
