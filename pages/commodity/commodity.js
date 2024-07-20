// pages/commodity/commodity.js
const domain = getApp().globalData.domain;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_shoucang:0,
        urlId: domain+"/findCommodity?id=",
        commodity:{},
        imageList:[],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        sumStep:0,
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
    gotoCart(){
        wx.switchTab({
            url: '/pages/shopcart/shopcart'
          })
    },
    addCart(event){
        console.log("商品"+event.target.dataset.id)
        // wx.request({
        //   url: 'https://648xq42149.zicp.fun/SilkDiagram_war_exploded/createOrder',
        //   method:"GET",
        //   data:{
        //       "tk":wx.getStorageSync('token'),
        //       "orderType":"commodity",
        //       "orderId":event.target.dataset.id,
        //       "number":1
        //   },
        //   success:(res)=>{
        //       console.log(res)
        //   }
        // })

        console.log('/pages/shopcart/shopcart?id='+event.target.dataset.id)
        wx.reLaunch({
          url: '/pages/shopcart/shopcart?id='+event.target.dataset.id,
        })
        let cart=wx.getStorageSync('cartList')||[];
        let index=cart.indexOf(event.target.dataset.id);
        if(index==-1){
            cart.push(event.target.dataset.id);
            wx.setStorageSync('cartList', cart);
            wx.showToast({
                title: '已加入购物车',
                icon: 'success',
                mask:'true'
              })
        }else{
            wx.showToast({
                title: '商品已在购物车',
                icon: 'success',
                mask:'true'
              })
        }
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(wx.getStorageSync('sumStep')==''){
            this.setData({
                sumStep:0
            })
        }else{
            this.setData({
                sumStep:wx.getStorageSync('sumStep')
            })
        }
        
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
                    commodity:res.data,
                    imageList:[res.data['img1'],res.data['img2'],res.data['img3']]
                })
            },
            complete:()=>{
                wx.hideLoading({
                  success: (res) => {},
                })
                wx.stopPullDownRefresh()
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