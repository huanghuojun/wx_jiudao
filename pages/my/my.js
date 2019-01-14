// pages/my/my.js
import { BookModel } from "../../models/book.js"
import { ClassicModel } from '../../models/classic.js'

const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    likeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hasGottenUserInfo();
    bookModel.getBookCount().then(res=>{
      this.setData({
        bookCount:res.data.count
      })
    })
    classicModel.getMyFavor(res => {
      this.setData({
        likeList: res
      })
    });
    // wx.getSetting({
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
    // wx.getUserInfo({
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
    // 旧版不在使用
    //
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

  hasGottenUserInfo(){
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data=>{
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (!userInfo){
      return
    }
    this.setData({
      authorized: true,
      userInfo: userInfo
    })
  },
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})