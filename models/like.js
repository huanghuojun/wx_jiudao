import {Http} from '../utils/http.js'
class LikeModel extends Http{
  like(behavior, artId, category){
    let url = behavior == 'like' ? '/like/add' :'/like/cancel';
    this.request({
      url: url,
      method:'POST',
      data:{
        art_id : artId,
        type: category,
      }
    })
  }

  getClassicLikeStatus(artId, category, sCallBack) {
    this.request({
      url: '/classic/' + category + '/' + artId + '/favor',
      success: (res) => {
        if (res.code == 200) {
          sCallBack(res.data);
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

export { LikeModel }