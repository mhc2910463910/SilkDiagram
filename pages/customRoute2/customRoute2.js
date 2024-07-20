// pages/customRoute2/customRoute2.js
const domain = getApp().globalData.domain;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        customRoute:{},
        domain: domain
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSystemInfo({//获取设备屏幕真实高度
            success: (result) => {
              this.setData({
                sysheight:result.windowHeight
              })
            },
          })
        let mod=JSON.parse(options.model)
        this.setData({
            customRoute:mod
        })
    },
    gotoRoute:function(){
        // wx.showModal({
        //   title:"客服",
        //   content:"微信:zhbbbbb929"
        // })
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