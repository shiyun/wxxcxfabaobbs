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
    wWidth: 0,
    pageNumber: 1,
    pageSize: 10,
    modalHidden: true,
    errInfo: '接口请求错误',
    inpTxt: '',
    curType: 3,
    navData: ['推荐', '最新'],
    navOn: true,
    shownav: true,    
    imgArr: ['http://fbimages.oss.aliyuncs.com/lawyercard/2016/06/29/C76C7D49A6E70D83988981EC130C8DBA.png', 'http://fbimages.oss.aliyuncs.com/lawyercard/2016/06/29/A59DCA6258FC40435ABF91C39E1C81EB.jpg', 'http://fbimages.oss.aliyuncs.com/lawyercard/2016/06/27/C2F09FED1C331ABD9B13E9064D1D12C2.jpg']
  },
  
  onLoad() {
    var that = this;
    if(app.globalData.userInfo){
       that.setData({
        userInfo:app.globalData.userInfo
      })
      //that.update()
    }else{
      app.getUserInfo(function(userInfo){
        that.setData({
          userInfo:userInfo
        })
        //that.update()
      }); 
    }   

    if(app.globalData.deviceInfo){
      that.setData({wHeight: app.globalData.deviceInfo.windowHeight, wWidth: app.globalData.deviceInfo.windowWidth});
    }else{
      app.getDeviceInfo(data => that.setData({wHeight: data.windowHeight, wWidth: data.windowWidth})); 
    }

    that.setData({loadHidden: false});
    api.queryRequest(apiUrl.BASE_URL + apiUrl.BBS_LIST, {sid: '100101', pageSize: 10, pageNumber: that.data.pageNumber})
      .then(data=>{
        let pageNumber = that.data.pageNumber + 1;
        that.setData({
          loadHidden: true,
          dataList: that.data.dataList.concat(that.getTopic(data.result.topics)),
          pageNumber: pageNumber
        });  
      })
      .catch(err=>console.log(err));
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

    api.queryRequest(apiUrl.BASE_URL + apiUrl.BBS_LIST, {sid: '100101', pageSize: 10, pageNumber: that.data.pageNumber})
      .then(data=>{
        if(data.status.code != '1') return;        
        let pageNumber = that.data.pageNumber + 1;
        that.setData({
          loadHidden: true,
          dataList: that.data.dataList.concat(that.getTopic(data.result.topics)),
          pageNumber: pageNumber
        });  
      })
      .catch(err=>{
        console.log(err);
        this.setData({modalHidden: false, loadHidden: true});
      });
  },

  search(){
    let that = this;

    that.setData({loadHidden: false, dataList: [], pageNumber: 1, isSearch: true});

    api.queryRequest(apiUrl.BASE_URL + apiUrl.BBS_SEARCH, {q: that.data.inpTxt, pageSize: 10, pageNumber: that.data.pageNumber})
      .then(data=>{
        if(data.status.code != '1') return;
        let pageNumber = that.data.pageNumber + 1;
        console.log(pageNumber);
        that.setData({
          loadHidden: true,
          dataList: that.data.dataList.concat(that.getTopic(data.result.topics)),
          pageNumber: pageNumber
        });  
      })
      .catch(err=>{
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
  },

  changeNav(){

  }
})
