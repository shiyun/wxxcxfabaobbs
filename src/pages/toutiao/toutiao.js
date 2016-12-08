import apiUrl from '../../const/const';
import {get} from '../../utils/request';
import {timeConvert} from '../../utils/util';

const app = getApp();

Page({
  data: {    
    data: [],
    loadHidden: true,
    modalHidden: true,
    timeStamp: Date.now().toString().substr(0,10),
    wHeight: 0
  },
  
  onLoad() {
    let that = this;
    that._getData();
    if(app.globalData.deviceInfo){
      that.setData({wHeight: app.globalData.deviceInfo.windowHeight, wWidth: app.globalData.deviceInfo.windowWidth});
    }else{
      app.getDeviceInfo(data => that.setData({wHeight: data.windowHeight, wWidth: data.windowWidth})); 
    }
  },

  _getData(){
    let that = this;
    console.log(that.data.timeStamp);
    let url = `http://www.toutiao.com/api/pc/feed/?category=funny&utm_source=toutiao&widen=1&max_behot_time=${that.data.timeStamp}&max_behot_time_tmp=${that.data.timeStamp}&as=A1259804C83F235&cp=58480F1243858E1`;
    get(url,{})
      .then(res=>{
        console.log(JSON.stringify(res));
        let arr = [];
        res.data.map(item=>{
          let behot_time = timeConvert(item.behot_time);
          let obj = Object.assign({}, item, {behot_time});
          arr.push(obj);
        });
        let dataArr = arr.concat(that.data.data);
        console.log(dataArr);
        that.setData({data: dataArr, timeStamp: res.next.max_behot_time});
      })
      .catch(err=>console.log(err));
  }  
})
