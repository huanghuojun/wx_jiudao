import {Http} from '../utils/http.js'

class ClassicModel extends Http{
  getLatest(callBack){
    this.request({
      'url': '/classic/latest',
      success: (res) => {
        callBack(res);
      }
    })
  }

  getPrevious(index,callBack) {
    this.request({
      'url': '/classic/'+index+'/previous',
      success: (res) => {
        callBack(res);
      }
    })
  }

  isFirst(index){
    return index == 1?true:false
  }

  isLatest(){

  }
}

export { ClassicModel }