const apiUrl = require('../../const/const');
let data_list = require('../../api/data_list.js');
let api = require('../../api/api');
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
    isSearch: false,
    loadHidden: true,
    dataListWrap: [],
    dataList: [],
    wHeight: 0,
    pageNumber: 1,
    pageSize: 10,
    modalHidden: true,
    errInfo: '接口请求错误',
    inpTxt: ''
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

    wx.getSystemInfo({
      success: function(data){
        that.setData({wHeight: data.windowHeight})
      },
      fail: function(err){
        console.log(err)
      }
    });

    that.setData({loadHidden: false});
    api.queryRequest(apiUrl.BASE_URL + apiUrl.BBS_LIST, {sid: '100101', pageSize: 10, pageNumber: that.data.pageNumber}, (data)=>{
      console.log(data.result.topics);
      let pageNumber = that.data.pageNumber + 1;
      that.setData({
        loadHidden: true,
        dataList: that.data.dataList.concat(that.getTopic(data.result.topics)),
        pageNumber: pageNumber
      });  
    },(err)=>{
      console.log(err);
    });
  },

  changeShow(){
    let that = this;
    that.setData({
      isShow: !that.data.isShow
    });   
  },

  loadData(e){
    let that = this;

    that.setData({loadHidden: false});

    api.queryRequest(apiUrl.BASE_URL + apiUrl.BBS_LIST, {sid: '100101', pageSize: 10, pageNumber: that.data.pageNumber}, (data)=>{
      if(data.status.code != '1') return;
      let pageNumber = that.data.pageNumber + 1;
      that.setData({
        loadHidden: true,
        dataList: that.data.dataList.concat(that.getTopic(data.result.topics)),
        pageNumber: pageNumber
      });  
    },(err)=>{
      console.log(err);
      this.setData({modalHidden: false, loadHidden: true});
    });
  },

  search(){
    let that = this;

    that.setData({loadHidden: false, dataList: [], pageNumber: 1, isSearch: true});

    api.queryRequest(apiUrl.BASE_URL + apiUrl.BBS_SEARCH, {q: that.data.inpTxt, pageSize: 10, pageNumber: that.data.pageNumber}, (data)=>{
      if(data.status.code != '1') return;
      let pageNumber = that.data.pageNumber + 1;
      console.log(pageNumber);
      that.setData({
        loadHidden: true,
        dataList: that.data.dataList.concat(that.getTopic(data.result.topics)),
        pageNumber: pageNumber
      });  
    },(err)=>{
      console.log(err);
      this.setData({modalHidden: false, loadHidden: true});
    });
  },

  getTopic(data){
    let arr = [];

    data.map((data)=>{
      arr.push(data.topic);
    })

    return arr;
  },

  modalChange() {
    this.setData({modalHidden: true});
  },

  getInpTxt(e){
    this.setData({inpTxt: e.detail.value});
  },

  cancelSearch(){
    this.setData({isSearch: false, inpTxt: ''});
  }
})
