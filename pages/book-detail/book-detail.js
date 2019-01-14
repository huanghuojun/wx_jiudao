// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    // 页面接收参数 id
    const bid = options.bid;
    const likeStatus = bookModel.getLikeStatus(bid);
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    //.race 竞争
    Promise.all([likeStatus, detail, comments])
    .then(res=>{
      this.setData({
        likeCount: res[0].data.favNums,
        likeStatus: res[0].data.likeStatus,
        comments: res[2].data.commentList,
        book: res[1].data
      })
      wx.hideLoading()
    })
    // detail.then(res=>{
    //   this.setData({
    //     book:res.data
    //   })
    // })

    // comments.then(res=>{
    //   this.setData({
    //     comments: res.data.commentList
    //   })
    // })
    
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeCount: res.data.favNums,
    //     likeStatus: res.data.likeStatus
    //   })
    // })
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
  onLike(event){
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.book.id, 400);
  },
  onFakePost(event){
    this.setData({
      posting:true,
    })
  },
  onCancel(event){
    this.setData({
      posting:false,
    })
  },
  onPost(event){
    const comment = event.detail.text || event.detail.value;
    if(!comment){
      return;
    }
    if(comment.length > 12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return;
    }
    bookModel.addComments(this.data.book.id, comment)
    .then(res=>{
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      //添加到短评中
      const newComment = {
        content: comment,
        nums:1
      }
      // 找到已存在短评索引
      let index = -1;
      for (let i = 0; i < this.data.comments.length; i++){
        if (this.data.comments[i].content == comment){
          index = i;
          newComment.nums = this.data.comments[i].nums + 1;
          break;
        }
      }
      // 移除已经存在的短评
      if(index >= 0){
        this.data.comments.splice(index, 1);
      }
      this.data.comments.unshift(newComment);
      this.setData({
        comments: this.data.comments,
        posting:false
      })
    });
  }
})