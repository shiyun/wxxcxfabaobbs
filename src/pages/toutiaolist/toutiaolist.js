import apiUrl from '../../const/const';
import {get} from '../../utils/request';
import {timeConvert} from '../../utils/util';

const app = getApp();

Page({
  data: {   
    data: {}, 
    loadHidden: true,
    modalHidden: true
  },
  
  onLoad(params) {
    let that = this, arr = [];
    get(`http://www.toutiao.com/api/pc/detail/?group_id=${params.id}`, {})
       .then(res=>{
          let data = res.data.content.replace(/(<div>|<\/div>|<br>|\sclass="pgc-img-caption")/g, "").split('</p><p>'), imgArr = [], despArr = [];
          data.map((v,k)=>{
            if(v.indexOf('<img')>-1){
              imgArr.push(v.match(/<img\ssrc=\"(\S*)\"/)[1]);
            }else{
              despArr.push(v.replace(/(<p>|<\/p>)/, ''));
            }            
          });
          let obj = [];
          imgArr.map((v,k)=>{
            obj.push({img: v, desp: despArr[k]});
          });
          console.log(obj);
          that.setData({data: obj})
        })
       .catch(err=>console.log(err));
  }

})
