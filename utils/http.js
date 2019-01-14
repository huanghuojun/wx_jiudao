// require module
import { config as cif, fun1} from "../config.js"

const tips = {
  1:'抱歉出现了一个错误',
  1005:'AppKey无效',
}

class Http{
  request(params){
    if(!params.method){
      params.method = "GET";
    }
    wx.request({
      url: cif.base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        "content-type":'application/json',
        'appkey':cif.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if(code.startsWith("2")){
          params.success && params.success(res.data);
        }else{
          let error_code = res.data.code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        this._show_error(1);
      },
      complete: function(res) {},
    })
  }

  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })
  }
}

export { Http }