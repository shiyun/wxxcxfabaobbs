import apiUrl from '../../const/const';
import api from '../../api/api';

const app = getApp();

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
    navData: [],
    navOn: true,
    addnav: false, 
    curNav: 0,  
    curNavId: '',
    sid: '',
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

    api.fetch(apiUrl.BBS_TABNAV, {})
      .then(data=>{
        that.setData({navData: data.result.tabs, curNavId: data.result.tabs[0].id});
        
        return data.result.tabs[0].id;
      })
      .then(id=>{
        api.fetch(apiUrl.BBS_LIST, {sid: id, pageSize: that.data.pageSize, pageNumber: that.data.pageNumber})
          .then(data=>{
            let pageNumber = that.data.pageNumber + 1;
            that.setData({
              loadHidden: true,
              dataList: that.data.dataList.concat(that.getTopic(data.result.topics)),
              pageNumber: pageNumber
            });  
          })
          .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
  },

  changeNav(e){
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    let id = e.currentTarget.dataset.id;
    this.setData({
      curNav: index,
      curType: type,
      curNavId: id,
      pageNumber: 1,
      dataList: []
    });   
    this.loadData();
  },

  loadData(e){
    let that = this,
        interUrl,
        postData;

    that.setData({loadHidden: false});

    if(that.data.curType === -1){
      interUrl = apiUrl.BBS_SEARCH;
      postData = {q: that.data.inpTxt, pageNumber: that.data.pageNumber, pageSize: that.data.pageSize};
    }else{
      interUrl = apiUrl.BBS_LIST;
      postData = {sid: that.data.curNavId, pageNumber: that.data.pageNumber, pageSize: that.data.pageSize};
    }

    api.fetch(interUrl, postData)
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

    that.setData({curType: -1, loadHidden: false, dataList: [], pageNumber: 1, isSearch: true});
    that.loadData();
    /*api.fetch(apiUrl.BBS_SEARCH, {q: that.data.inpTxt, pageSize: 10, pageNumber: that.data.pageNumber})
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
      });*/
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

  choseNav(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    that.data.navData.map((v,k)=>{
      if(k == 1 || k == 2){
        that.data['choseNav'+k] = true;
      }else{
        that.data['choseNav'+k] = false;
      }
    }); 
    //if(that.data['choseNav'+index])
  }

})
