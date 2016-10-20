function queryRequest(url,data){ 
    let promise =  new Promise((resolve, reject)=>{
        wx.request({
            url:url,
            data:data,
            header:{
               // "Content-Type":"application/json"
            },
            success:function(res){
                //console.log(res.data)
                resolve(res.data);
            },
            fail:function(err){
                //console.log(err)
                reject(err);
            }

        })
    });     
    return promise;
}

function uploadFile(url,file,data) {
    return new Promise((resolve, reject)=>{
        wx.uploadFile({
            url: url,
            filePath: file,
            name: 'file',
            formData:data,
            success:function(res){
                //console.log(res.data)
                resolve(res.data);
            },
            fail:function(err){
                //console.log(err)
                reject(err);
            }

        })
    });  
}

function downloadFile(url,typ){
    return new Promise((resolve, reject)=>{
        wx.downloadFile({
            url:url,
            type:typ,
            success:function(res){
                resolve(res.tempFilePath)
            },
            fail:function(err){
                reject(err)
            }
        })
    });  
}

function saveFile(tempFile,success){
    return new Promise((resolve, reject)=>{
        wx.saveFile({
            tempFilePath:tempFile,
            success:function(res){
                var svaedFile=res.savedFilePath
                resolve(svaeFile)
            },
            fail:function(err){
                reject(err)
            }
        })
    });  
}

module.exports={
    queryRequest:queryRequest,
    uploadFile:uploadFile,
	downloadFile: downloadFile,
	saveFile: saveFile
}