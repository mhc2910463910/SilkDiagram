// components/base-button/base-button.js
Component({
  externalClasses: ['my-class'],
  // options: {
  //   virtualHost: true
  // },
  /**
   * 组件的属性列表
   */
  properties: {

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
    bindtap(e){
      // 事件绑定函数，e表示事件，this表示触发绑定函数的组件
      this.triggerEvent('click')
    }
  }
})