// pages/myinfo/myinfo.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const domain = getApp().globalData.domain;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl:defaultAvatarUrl,
        user_name:"",
        phone:"",
        runData:{},
        sumStep:0
    },
    /**
   * 用户授权读取微信运动数据
   */

    authorizeWeRun(){
        var that = this
    //首先获取用户的授权状态
        wx.getSetting({
        success(res){
            // console.log(res)
            if(!res.authSetting['scope.werun']){
    // 如果用户还未授权过，需要用户授权读取微信运动数据
            wx.authorize({
                scope: 'scope.werun',
                success() {
                //读取微信步数数据
                that.getWeRunData()
                },
                fail() {
                //如果用户拒绝授权，提示用户需要同意授权才能获取他的微信运动数据
                wx.showModal({
                    title: '读取微信运动数据失败',
                    content: '请在小程序设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）中允许我们访问微信运动数据',
                })
                }
            })

            }else{
            //如果用户已授权过，直接开始同步微信运动数据
            //读取微信步数数据
            that.getWeRunData()
            }
        }
        })
    },
     /**
   * 获取微信运动数据
   */
    getWeRunData(){
        var that = this
        wx.getWeRunData({
            success(res){
                console.log(res)
                wx.request({
                  url: domain + '/decrypt',
                  data:{
                      encryptedData:res.encryptedData,
                      iv:res.iv,
                      tk:wx.getStorageSync('token')
                  },
                  method:"GET",
                  success:(res)=>{
                      console.log(res)
                      that.setData({
                          runData:res.data.stepInfoList
                      })
                      for(var rundata of that.data.runData){
                          that.setData({
                            sumStep:that.data.sumStep+rundata['step']
                          })
                          
                      }
                      wx.setStorageSync('sumStep', that.data.sumStep)
                  }
                })
            }
        })
    },
    chooseAvatar(e) {
        console.log(e)
        this.setData({
            avatarUrl:e.detail.avatarUrl
        })
    },
    formSubmit:function(e){
        var token=wx.getStorageSync('token');
        if(token==""||token==null){
            wx.showModal({
                title:"用户未登陆"
            })
        }else{
            wx.showLoading({
                title: '数据加载中...'
            })
            console.log(e.detail.value)
            console.log(this.data.avatarUrl)
            wx.request({
            url: domain + '/wx/updateInfo',
            method:"GET",
            data:{
                "tk":wx.getStorageSync('token'),
                "user_name":e.detail.value.user_name,
                "avatar":this.data.avatarUrl
            },
            success:(res)=>{
                console.log(res)
            },
            complete:()=>{
                wx.hideLoading({
                    success: (res) => {},
                })
            }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        wx.showLoading({
          title: '加载中...',
        })

        that.setData({
            user_name:wx.getStorageSync('user_name'),
            phone:wx.getStorageSync('phone'),
            avatarUrl:wx.getStorageSync('avatarUrl')
        })

        this.authorizeWeRun()
        wx.hideLoading({
          success: (res) => {},
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