// pages/home/home.js
import tools from '../../utils/tools';
const app = getApp();
const domain = app.globalData.domain;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    routeList: [],
    swiperImage: ["swiper1.jpg", "swiper2.jpg"],
    capsule: app.globalData.capsule,
    key: 'CYCBZ-IRBWC-66623-AJOFX-P7XVT-PZB3J',
    selectorVisible: false,
    selectedProvince: null,
    selectedCity: null,
    domain: getApp().globalData.domain,
    show: true
  },
  showSelector() {
    this.setData({
      selectorVisible: true,
    });
  },
  onSelectCity(e) {
    const {
      province,
      city
    } = e.detail;
    this.setData({
      selectedProvince: province,
      selectedCity: city,
    });
  },
  getRouteList: function (options) {
 
    wx.request({
      url: this.data.domain + '/getRouteList',
      method: "GET",
      success: (res) => {
        //   console.log(res)
        this.setData({
          routeList: res.data
        })
        
      },
      complete: () => {
        tools.hideMyLoading(this,'show');
        // console.log(this.routeList)
        for (var i = 0; i < this.data.routeList.length; i++) {
          this.data.routeList[i]['routeImg'] = this.data.routeList[i]['routeImg'].split(";");
        }

        // console.log(this.data.routeList)
        this.setData({
          routeList: this.data.routeList
        })

      }
    })
  },
  // 获取轮播图
  getSwiperList() {
    wx.showLoading({
      title: '数据加载中...'
    })
    wx.request({
      url: domain + '/getSwiper',
      method: "GET",
      success: (res) => {
        //   console.log(res)
        this.setData({
          swiperImage: res.data
        })

      },
      complete: () => {
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tools.showMyLoading(this, 'show');
    this.getRouteList();
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

    setTimeout(() => {
      tools.hideMyLoading(this, 'show');
    }, 10000)
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