// components/search/index.js
import { KeywordModel } from "../../models/keyword.js"
import { pageinationBev } from "../behaviors/pagination.js"
const keywordModel = new KeywordModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [pageinationBev],
  properties: {
    more:{
      type:String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords: [],
    searching:false, // 控制搜索是否显示
    keyword:String,
    loadingCenter:false,
  },

  attached(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot()
    .then(res=>{
      this.setData({
        hotWords:res.data,
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.keyword){
        return;
      }
      if (this.isLocked()){
        return;
      }
      if (this.hasMore()){
        this.locked()
        // 同时发送两个请求，一次只能发送一个请求（锁）
        keywordModel.search(this.data.keyword, this.getCurrentIndex() + 1)
          .then(res => {
            this.setNewData(res.data)
            this.unLocked()
          },()=>{
            this.unLocked()
          })
      }
    },

    onCancel(event){
      this.initialize()
      this.triggerEvent("cancel",{},{})
    },

    onConfirm(event){
      this._showLoadingCenter()
      // 清空历史数据
      this.initialize()
      const word = event.detail.value || event.detail.text;
      this.setData({
        keyword: word
      })
      // 立马切换
      this._showResult()
      keywordModel.search(word, this.getCurrentIndex())
      .then(res => {
        this._hideLoadingCenter()
        this.setNewData(res.data)
        keywordModel.addToHistory(word);
      },()=>{
        this._hideLoadingCenter()
      })
    },

    onDelete(event){
      this.initialize()
      this._closeResult();
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true,
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false,
      })
    },
    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        keyword: ""
      })
    },
    // 组件中无法监听
    // onReachBottom() {
    //   console.log("111")
    // }
  }
})
