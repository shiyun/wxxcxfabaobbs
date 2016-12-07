import Promise from './es6-promise.min'

export const request = (method = 'GET') => (url, data) => {
  return new Promise((resole, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    });
  });
}

export const get = request('GET');
export const post = request('POST');