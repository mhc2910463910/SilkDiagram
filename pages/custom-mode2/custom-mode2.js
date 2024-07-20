// pages/custom-mode2/custom-mode2.js
const domain = getApp().globalData.domain;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        options1: [
            {label: '沉浸式旅游', value: 0},
            {label: '特种式旅游', value: 1},
            {label: '轻量式旅游', value: 2}
          ],
          options2: [
            {label: '甘肃', value: 0},
            {label: '陕西', value: 1},
            {label: '新疆', value: 2},
            {label: '青海', value: 3},
            {label: '宁夏', value: 4}
          ],
          options3:[
            {label: '跟团游', value: 0},
            {label: '自驾游', value: 1}
          ],
          routeType:"",
          position:[],
          typ:""
    },
    changeOptions1(e){
        console.log(e)
        this.setData({
            routeType:e.detail.value.label
        })
        
    },
    changeOptions2(e){
        console.log(e)
        this.setData({
            position:e.detail
        })
        for(let i=0;i<this.data.position.length;i++){
            this.data.position[i]=this.data.position[i].label
        }
    },
    changeOptions3(e){
        console.log(e)
        this.setData({
            typ:e.detail.value.label
        })
        
    },
    submitForm(){
        console.log(this.data.routeType)
        console.log(this.data.position.join(','))
        console.log(this.data.typ)
        var that=this
        wx.showLoading({
          title: '查找中...',
        })
        // wx.navigateTo({
        //   url: '/pages/map/map',
        // })
        wx.request({
          url: domain + '/getRouteInfo',
          method:"GET",
          data:{
              routeType:that.data.routeType,
              position:that.data.position.join(','),
              typ:that.data.typ
          },
          success:(res)=>{
              console.log(res.data)
              var model = JSON.stringify(res.data);
              wx.navigateTo({
                url: '/pages/customRoute2/customRoute2?model='+model,
              })
          },
          complete:(res)=>{
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