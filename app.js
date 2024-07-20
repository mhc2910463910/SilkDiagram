// app.js
App({
  onLaunch() {
    // 函数表达式不存在函数提升，需要写在前面
    // 获取storage，设置全局变量
    const getGlobal = () => {
      wx.getStorage({
        key: 'hasToken',
        success: res => {
          console.log(this)
          this.globalData.hasToken = res.data;
        }
      })
      wx.getStorage({
        key: 'cookie',
        success: res => {
          getApp().globalData.cookie = res.data;
          console.log(this);
        }
      })
    }
    getGlobal()
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.removeStorageSync('cartList')
    // wx.removeStorageSync('token')
    wx.removeStorageSync('userinfo')
    wx.removeStorageSync('PhoneNumber');
    console.dir(this);

  },
  globalData: {
    userInfo: null,
    cartList: [],
    capsule: wx.getMenuButtonBoundingClientRect(),
    domain: 'https://648xq42149.zicp.fun',
    hasToken: false,
  }
})