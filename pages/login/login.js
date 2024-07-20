// pages/login/login.js
const globalData = getApp().globalData;
const domain = globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: domain,
    email: '',
    register: true,
    time: 60,
    codeDisabled: false,
    test: true
  },
  // 工具功能
  test(){
    this.setData({
      test: !this.data.test
    })
  },
  emailWatch: function (e) {
    console.log(e);
    this.setData({
      email: e.detail.value
    })
  },
  validateEmail: function (email) {
    // 使用正则表达式验证邮箱
    var emailRegex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return emailRegex.test(email);
  },
  validateCode: function (code) {
    let codeRegex = /\d{6}/;
    return codeRegex.test(code);
  },
  startTimer() {
    const self = this;
    let time = self.data.time;
    this.setData({
      codeDisabled: true
    });
    const timer = setInterval(() => {
      if (time == 0) {
        // 重置时间以显示发送
        self.setData({
          time: 60
        });
        self.setData({
          codeDisabled: false
        })
        // 立即结束，无需return
        clearInterval(timer);
        return;
      }
      // 这个time和设置的不是同一个time,这里同时修改两个time的值，做到同步
      self.setData({
        time: --time
      });
    }, 1000);
  },
  // 用户功能
  submit: function (e) {
    const {
      code,
      email
    } = e.detail.value;
    const data = {
      code,
      email
    };
    if (!this.validateEmail(data.email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'error'
      })
      return;
    }
    if (!this.validateCode(data.code)) {
      wx.showToast({
        title: '验证码格式错误',
        icon: 'error'
      })
      return;
    }
    wx.request({
      url: domain + '/regist',
      method: "POST",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('cookie').toString()
      },
      success: function (res) {
        console.dir(res);
        wx.showModal({
          title: '提示',
          content: res.data
        });
      },
      fail: function (res) {
        console.log("接口调用失败：");
        console.dir(res);
        wx.showModal({
          title: '提示',
          content: '出现未知错误，请联系开发人员'
        });
      }
    })
  },
  sendCode: function (e) {
    console.log("sendCode调用");
    console.log(this.data.email);
    const email = this.data.email;
    if (this.validateEmail(email)) {
      this.startTimer();
      wx.request({
        url: domain + '/sendEmail?email=' + email,
        method: "POST",
        success: function (res) {
          this.startTimer();
          console.dir(res);
          wx.showModal({
            title: '提示',
            content: res.data
          });
          wx.setStorage({
            key: 'cookie',
            data: res.cookies,
            success: function (e) {
              console.dir(e);
              console.log('缓存数据到本地');
            }
          });
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '出现未知错误，请联系开发人员'
          });
          console.log("接口调用失败：");
          console.dir(res);
        }
      })
    } else {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'error'
      })
    }
  },
  login: function (e) {
    const data = e.detail.value;
    if (!this.validateEmail(data.email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'error'
      })
      return;
    }
    wx.showLoading({
      title: '正在登录',
      content: '请稍等。'
    });
    wx.request({
      url: domain + '/login',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data,
      success: (res) => {
        wx.hideLoading();
        console.dir(res);
        let message;
        if (res.data) {
          message = '登录成功';
        } else {
          message = '邮箱或者密码错误';
          wx.showModal({
            title: '提示',
            content: message
          });
          return;
        }
        wx.request({
          url: 'url',
        });
        wx.setStorage({
          key: 'cookie',
          data: res.cookies,
          success: function (e) {
            console.dir(e);
            console.log('保存cookie');
            wx.setStorage({
              key: 'hasToken',
              data: true
            });
            globalData.hasToken = true;
          }
        });
        wx.showToast({
          title: message,
          success: function (e) {
            wx.switchTab({
              url: '/pages/info/info',
            })
          }
        });
      },
      fail: (res) => {
        console.log('接口调用失败');
        console.dir(res);
        wx.showModal({
          title: '提示',
          content: '出现未知错误，请联系开发人员'
        });
      }
    });
  },
  toggle: function (e) {
    this.setData({
      register: !this.data.register
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})