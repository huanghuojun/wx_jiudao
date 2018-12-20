import {Http} from '../utils/http.js'
class LikeModel extends Http{
  like(behavior, artId, category){
    let url = behavior == 'like' ? '/classic/add' :'/classic/cancel';
    console.log(artId);
    this.request({
      url: url,
      method:'POST',
      data:{
        art_id : artId,
        type: category,
      }
    })
  }
}

export { LikeModel }