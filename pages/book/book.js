// pages/book/book.js
import { BookModel } from '../../models/book.js'
import { random } from '../../utils/util.js'
let bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
    more: ''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
    .then(res => {
      this.setData({
        books:res.data
      })
    })
    // // Promise 对象
    // const promise = new Promise((reslove, reject)=>{
    //   // pending(进行中) fulfilled(已成功) rejected(已失败)
    //   wx.getSystemInfo({
    //     success: res => reslove(res),
    //     fail: error => reject(error)
    //   })
    // });
    // promise.then(
    //   res=> console.log(res) ,
    //   error => console.log(error)
    // )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSearch(event){
    this.setData({
      searching:true
    })
  },
  onCancel(event){
    this.setData({
      searching: false
    })
  },
  onReachBottom() {
    // 向组件发送通知
    this.setData({
      more: random(16)
    })
  }
})