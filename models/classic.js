import {Http} from '../utils/http.js'

class ClassicModel extends Http{
  getLatest(callBack){
    this.request({
      'url': '/classic/latest',
      success: (res) => {
        if(res.code == 200){
          callBack(res.data);
          wx.setStorageSync(this._getKey(res.data.indexes), res.data)
          this._setLatestIndex(res.data.indexes)
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }

  getClassic(index, nextOrPrevious, callBack) {
    // 缓存中寻找
    let key = nextOrPrevious == "next" ? this._getKey(index+1) : this._getKey(index-1);
    let classic = wx.getStorageSync(key);
    if(classic){
      callBack(classic);
    }else{
      this.request({
        'url': `/classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          if (res.code == 200) {
            wx.setStorageSync(this._getKey(res.data.indexes), res.data)
            callBack(res.data);
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }

  isFirst(index){
    return index == 1?true:false
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex();
    return index == latestIndex ? true : false
  }
  
  _getLatestIndex() {
    return wx.getStorageSync('latest');
  }
  _setLatestIndex(index){
    wx.setStorageSync('latest', index);
  }

  _getKey(index){
    let key = "classic-"+index;
    return key;
  }
}

export { ClassicModel }