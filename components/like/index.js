// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 开放出去的属性
    like:{
      type:Boolean,
      value:false,
      observer:function(){

      }
    },
    count:{
      type:Number,
      value:0,
      observer:function(){

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    /**
     * 封装性  开放性
     * 组件的粒度
     * 复杂的还是简单的
     */
    yesSrc:"images/like.png",
    noSrc:"images/like@dis.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义事件
    onLike:function(event){
      let like = this.properties.like;
      let count = this.properties.count;
      
      count = like? count - 1 : count + 1;
      this.setData({
        count:count,
        like:!like,
      })

      // 激活事件
      let behavior = this.properties.like?'like':'cancel';
      // 第二个参数设置Event detail
      // 第三个参数 事件是否捕获
      this.triggerEvent('like',{
        behavior:behavior,
      },{});
    }
  }
})
