// pages/info/info.js
const globalData = getApp().globalData;
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const domain = globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    show: !globalData.hasToken,
    user_name: "",
    phone: "",
  },
  // 退出登录
  logout(){
    globalData.hasToken = false;
    this.setData({
      show: true
    });
    wx.setStorage({
      key: 'hasToken',
      data: false
    });
    // 清除本地的cookie
    wx.removeStorage({
      key: 'cookie',
    });

  },
  // 登录监听
  chooseAvatar(e) {
    this.setData({
      avatarUrl: e.detail.avatarUrl
    })
  },
  // 基本信息
  gotoInfo() {
    const token = globalData.hasToken;
    if (!token) {
      wx.showModal({
        title: '温馨提示',
        content: '亲，授权微信登录后才能正常使用小程序功能',
        success(res) {
          //如果用户点击了确定按钮
          if (res.confirm) {
            that.getPhoneNumber()
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  },
  // 退出监听
  exitClick() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('cartList')
          that.setData({
            show: !that.data.show,
            avatarUrl: defaultAvatarUrl,
            user_name: "",
            phone: ""
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token') || '';
    if (token) {
      // console.log("请求其他数据");
      this.getUserProfile();
    } else {
      // this.handlerLogin();
    }
  },
  //getUserProfile 方法
  getUserProfile() {
    let that = this;
    wx.showLoading({
      title: '获取个人信息中...',
    })
    wx.getUserProfile({
      desc: '用于获取用户微信个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("请求用户信息")
        console.log(res)
        wx.request({
          url: domain + '/wx/getUserInfo',
          method: "GET",
          data: {
            "tk": wx.getStorageSync('token'),
            // "code":res.code
          },
          success: (result) => {

            console.log(result)
            that.setData({
              user_name: result.data.user_name,
              phone: result.data.phone,
              avatarUrl: result.data.avatar
            })
            wx.setStorageSync('user_name', result.data.user_name)
            wx.setStorageSync('phone', result.data.phone)
            wx.setStorageSync('avatarUrl', result.data.avatar)
          },
          complete: () => {
            wx.hideLoading({
              success: (res) => {},
            })

          },
          fail: (error) => {
            console.log(error);
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  //获取微信用户手机号方法  
  getPhoneNumber(e) {
    wx.showModal({
      title: "抱歉",
      content: "该功能暂时无法使用"
    })
    wx.showLoading({
      title: '登陆中',
    })
    var that = this
    // console.log(e.detail.code)
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    wx.login({
      success: (res) => {
        // console.log(res);
        // console.log(e)
        console.log("获取手机号时:")
        console.log(res)
        wx.request({
          url: domain + "/wx/login",
          data: {
            'encryptedData': e.detail.encryptedData,
            'iv': e.detail.iv,
            'code': res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token)
            that.setData({
              show: !that.data.show
            })

          },
          complete: () => {
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showModal({
              title: '温馨提示',
              content: '亲，授权微信登录后才能正常使用小程序功能',
              success(res) {
                //如果用户点击了确定按钮
                if (res.confirm) {
                  that.getUserProfile()
                }
              }
            })
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })

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
    // 每次进到个人信息页都更新一下show的值来显示登录和退出登录
    this.setData({
      show: !globalData.hasToken
    })
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

  }
})