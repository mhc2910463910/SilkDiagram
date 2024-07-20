// pages/map/map.js
const key='CYCBZ-IRBWC-66623-AJOFX-P7XVT-PZB3J';
const referer='漫游丝绸古道';
const citySelector = requirePlugin('citySelector');
let plugin = requirePlugin('routePlan');
let endPoint = null
// ({  //终点
    // 'name': '兰州火车站',
    // 'latitude': 39.89631551,
    // 'longitude': 116.323459711
// });
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectorVisible: false,
        selectedProvince: null,
        selectedCity: null,
        customRoute:{},
        nodes:""
    },
    // 从城市选择器插件返回后，在页面的onShow生命周期函数中能够调用插件接口，获取cityInfo结果对象
    onShow() {
        const selectedCity = citySelector.getCity(); // 选择城市后返回城市信息对象，若未选择返回null
    },
    onUnload () {
        // 页面卸载时清空插件数据，防止再次进入页面，getCity返回的是上次的结果
        citySelector.clearCity();
    },
    // 显示组件
  showSelector() {
    this.setData({
      selectorVisible: true,
    });
  },

  // 当用户选择了组件中的城市之后的回调函数
  onSelectCity(e) {
    const { province, city } = e.detail;
    this.setData({
      selectedProvince: province,
      selectedCity: city,
    });
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log(options.model)
        let mod=JSON.parse(options.model)
        this.setData({
            customRoute:mod
        })
        console.log(this.data.customRoute["node"].split("-")[0])
        let nd=this.data.customRoute["node"].split("-")[0]
        this.setData({
          nodes:nd
        })
        endPoint=JSON.stringify({
          'name': this.data.nodes
        })
        wx.navigateTo({
            url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        });
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
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