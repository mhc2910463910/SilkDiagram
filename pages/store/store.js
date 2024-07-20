// pages/store/store.js
const domain = getApp().globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityTypeList: [],
    tabs: ["已解锁", "未解锁"],
    // 选中的下标
    tabIndex: 0,
    commodityList: [],
    sumStep: 0,
    domain: getApp().globalData.domain
  },
  // 获取商品类别
  getCommodityTypeList() {
    wx.request({
      url: domain + '/getCommodityTypeList',
      method: 'GET',
      success: (res) => {
        this.setData({
          commodityTypeList: res.data
        })
        console.log(this.data.commodityTypeList);
      }
    })
  },
  // 获取商品列表
  /*
   * 
   * @param {number} tabIndex 
   */
  getCommodityByTypeId(tabIndex) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    wx.request({
      url: this.data.domain + '/getCommodityByTypeId?id=' + (tabIndex + 1),
      method: "GET",
      success: (res) => {
        console.log(res)
        this.setData({
          commodityList: res.data
        })
      },
      complete: () => {
        wx.hideLoading({
          success: (res) => {},
        })
        this.setData({
          isloading: false
        })
      }
    })
  },

  // getCommodityList(tabIndex){
  //   wx.request({
  //     url: domain + '/getCommodityByTypeId?id='+tabIndex,
  //   })
  // },
  gotoCommodity(event) {
    wx.showLoading({
      title: '数据加载中...'
    })
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + event.target.dataset.id,
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
    wx.showLoading({
      title: '数据加载中...'
    })
    this.getCommodityTypeList();
    this.getCommodityByTypeId(this.data.tabIndex);
  },
  setTab: function (e) {
    // 同一个tab就不请求
    if (e.currentTarget.dataset.index === this.data.tabIndex) return;
    console.log(e.currentTarget.dataset.index)
    // 发送一个请求并修改页面数据
    this.setData({
      tabIndex: e.currentTarget.dataset.index,
    })
    this.getCommodityByTypeId(this.data.tabIndex);
  },
  // tabClick: function(e) {
  //     this.setData({
  //       sliderOffset: e.currentTarget.offsetLeft,
  //       activeIndex: e.currentTarget.id
  //     });
  //     console.log(e.currentTarget.id)
  // },
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
    this.setData({
      sumStep: wx.getStorageSync('sumStep')
    })
    this.setData({
      commodityList: []
    })
    this.getCommodityByTypeId(this.data.tabIndex);
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉触底")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})