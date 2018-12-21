// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String,
    title:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    palySrc:'images/player@playing.png',
    pauseSrc:'images/player@waitting.png',
    playing:false,
  },

  attached:function(event){
    this._recoverStatus();
    this._monitorSwitch();
  },

  detached:function(event){
    // mMgr.stop();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      console.log(this.properties.src);
      if(!this.properties.playing){
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
        // 图片切换
        this.setData({
          playing: true,
        })
      }else{
        // 图片切换
        this.setData({
          playing: false,
        })
        mMgr.pause();
      }
    },

    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        })
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true,
        })
      }
    },

    _monitorSwitch:function(){
      mMgr.onPlay(()=>{
        this._recoverStatus();
      })
      mMgr.onPause(() => {
        this._recoverStatus();
      })
      mMgr.onStop(() => {
        this._recoverStatus();
      })
      mMgr.onEnded(() => {
        this._recoverStatus();
      })
    },
    
  }
})
