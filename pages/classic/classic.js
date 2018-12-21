// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:null,
    first:false,
    latest:true,
    likeStatus:0,
    likeCount:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 数据保存 Storage
    classicModel.getLatest((res) => {
      console.log(res.type != 200)
      this.setData({
        data: res,
        likeStatus: res.likeStatus,
        likeCount: res.favNums,
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 异步函数接收
    /**
     * Promise
     * 回调地狱
     */
    // let promise = new Promise((resolve, reject) => {
    //   wx.request({
    //     url: 'http://192.168.199.145:8080/genki/basic/pos-api/user/getUserList',
    //     success:(res)=>{
    //       resolve(res);
    //     }
    //   })
    // })

    // promise.then((res) => {
    //   console.log("promise="+res);
    // })
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

  onLike : function(event){
    console.log(event);
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.data.id, this.data.data.type);
    console.log(behavior);
  },

  onNext: function (event) {
    this._updateClassic("next");
  },

  onPrevious: function (event) {
    this._updateClassic("previous");
  },

  _updateClassic: function(nextOrPrevious){
    let index = this.data.data.indexes
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        data: res,
        likeStatus: res.likeStatus,
        likeCount: res.favNums,
        latest: classicModel.isLatest(res.indexes),
        first: classicModel.isFirst(res.indexes),
      })
    });
  },

  _getLikeStatus : function(artId, category){
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        likeStatus: res.likeStatus,
        likeCount: res.favNums
      })
    });
  }
})