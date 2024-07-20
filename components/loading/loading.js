// components/loading.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 使用时页面中设置局部变量show传入该属性中，加载时变量为true，加载完毕将其设置为false即可
    show: {
      type: Boolean,
      value: false,
      observer: function(value){
        console.log("监听成功");
      }
    },
    message:{
      type: String,
      value: '加载中……'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMyLoading(){
      this.setData({
        show: true
      })
    },
    hideMyLoading(){
      this.setData({
        show: true
      })
    }
  },
  ready: function(){
    console.log(this.data.show)
  }
})