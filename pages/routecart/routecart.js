// pages/routecart/routecart.js
const domain = getApp().globalData.domain
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_shoucang:0,
        urlId: domain + "/findRoute?id=",
        route:{},
        imageList:[],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        domain: domain
    },  
    previewImage: function (e) {
        var current = e.target.dataset.src;
        var href = this.data.imghref;
        var goodsimg = this.data.goods_img;
        var imglist = [];
        for (var i = 0; i < goodsimg.length; i++) {
          imglist[i] = href + goodsimg[i].img
        }
        wx.previewImage({
          current: current, // 当前显示图片的http链接  
          urls: imglist// 需要预览的图片http链接列表  
        })
    },
    buyCart(event){
        console.log("商品"+event.target.dataset.id+"购买")
        wx.showModal({
          title:"该功能还在开发中",
        })
        // console.log('/pages/shopcart/shopcart?id='+event.target.dataset.id)
        // wx.reLaunch({
        //   url: '/pages/shopcart/shopcart?id='+event.target.dataset.id,
        // })
        
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中...'
        })
        console.log(options['id'])
        this.setData({
            urlId: this.data.urlId+options['id'],
        })
        console.log(this.data.urlId)
        wx.request({
            url: this.data.urlId,
            method:"GET",
            success:(res)=>{
                console.log(res)
                this.setData({
                    route:res.data,
                    imageList:res.data.routeImg.split(";")
                })
                
            },
            complete:()=>{
                wx.hideLoading({
                  success: (res) => {},
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