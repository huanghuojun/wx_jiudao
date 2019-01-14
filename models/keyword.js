import { Http } from "../utils/http-promise.js"
class KeywordModel extends Http{
  key = 'q';
  maxLength = 5;
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return [];
    }
    return words;
  }
  getHot(){
    return this.request({
      url:"/book/hot_keyword"
    })
  }
  addToHistory(keyword){
    let words = this.getHistory();
    const has = words.includes(keyword);
    if(!has){
      // 数组末尾删除
      if (words.length >= this.maxLength){
        words.pop() 
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words);
    }
  }
  search(key, start) {
    return this.request({
      url: "/book/search",
      data:{
        key,
        start
      }
    })
  }
}

export { KeywordModel }