import { Http } from '../utils/http-promise.js'
class WxCode2sessionModel extends Http {
  getCode2session(code){
    var params = {
      url: '/wechat/code2session',
      method: 'POST',
      data: {
        code: code,
      }
    }
    return this.request(params)
  }
}

export { WxCode2sessionModel }