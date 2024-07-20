// pages/addresslist/addresslist.js
const domain = getApp().globalData.domain;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList:[]
    },
    addAddress:function(){
        wx.navigateTo({
          url: '/pages/address/address',
        })
    },
    delAddress:function(e){
        // console.log(e.dataset.id)
        let index;
        for(let i=0;i<this.data.addressList.length;i++){
            if(this.data.addressList[i].id==e.currentTarget.dataset.id){
                index=i;
            }
        }
        this.data.addressList.splice(index,1);
        //更新data数据对象
        if(this.data.addressList.length>0){
            wx.request({
              url: domain + '/delAddress',
              method:"GET",
              data:{
                  tk:wx.getStorageSync('token'),
                  id:e.currentTarget.dataset.id
              },
              success:(res)=>{
                  console.log(res)
              }
            })
            this.setData({
                addressList:this.data.addressList
            })
            wx.setStorageSync('addressList', this.data.addressList);
        }else{
            this.setData({
                addressList:this.data.addressList
            })
            wx.setStorageSync('addressList', [])
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var arr = wx.getStorageSync('addressList') || [];
        console.info("缓存数据：" + arr);
    // 更新数据  
        this.setData({
            addressList: arr
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.onLoad()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.onLoad()
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
        wx.showLoading({
          title: '加载中...',
        })
        let that=this;
        wx.request({
          url: domain + '/getAddress',
          method:"GET",
          data:{
              tk:wx.getStorageSync('token')
          },
          success:(res)=>{
              console.log(res.data)
              wx.setStorageSync('addressList', res.data)
              
              that.onLoad()
          },
          complete:()=>{
            wx.hideLoading({
                success: () => {},
            })
            wx.stopPullDownRefresh()
          }
        })
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