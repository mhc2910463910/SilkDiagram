// pages/lanzhou/lanzhou.js
const globalData = getApp().globalData;
const domain = globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '兰州',
    url: domain+'/static/upload/美食兰州.jpg',
    // 存放地区和地图url映射
    areaDict: {
      '敦煌': domain+'/static/upload/美食敦煌.jpg',
      '嘉峪关': domain+'/static/upload/美食嘉峪关.jpg',
      // '兰州': domain+'/static/upload/美食兰州.jpg',
      '兰州': 'https://cdnjson.com/images/2024/04/16/84f11110a90d966f98aad2aa12c21cf5cf1b3e8deb1582b.jpg',
      '武威': domain+'/static/upload/美食武威.jpg',
      '张掖': domain+'/static/upload/美食张掖.jpg',
      '西安': domain+'/static/upload/美食西安.jpg'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 传入name
    this.setData({
      name: options.name,
      url: this.data.areaDict[options.name]
    })
    console.log(options.name);
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