// pages/address/address.js
var area = require('../../utils/area.js');
var areaInfo = []; //所有省市区县数据
var provinces = []; //省
var provinceNames = []; //省名称
var citys = []; //城市
var cityNames = []; //城市名称
var countys = []; //区县
var countyNames = []; //区县名称
var value = [0, 0, 0]; //数据位置下标
var addressList = null;
const globalData = getApp().globalData;
const domain = globalData.domain;
const cookie = globalData.cookie;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // transportIndex: 0,
        provinceIndex: 0, //省份
        cityIndex: 0, //城市
        countyIndex: 0, //区县
        domain: domain
    },
     // 获取省份数据
  getProvinceData: function() {
    var that = this;
    var s;
    provinces = [];
    provinceNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      s = areaInfo[i];
      if (s.di == "00" && s.xian == "00") {
        provinces[num] = s;
        provinceNames[num] = s.name;
        num++;
      }
    }
    that.setData({
      provinceNames: provinceNames
    })

    that.getCityArr();
    that.getCountyInfo();
  },

  // 获取城市数据
  getCityArr: function(count = 0) {
    var c;
    citys = [];
    cityNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
        citys[num] = c;
        cityNames[num] = c.name;
        num++;
      }
    }
    if (citys.length == 0) {
      citys[0] = {
        name: ''
      };
      cityNames[0] = {
        name: ''
      };
    }
    var that = this;
    that.setData({
      citys: citys,
      cityNames: cityNames
    })
    console.log('cityNames:' + cityNames);
    that.getCountyInfo(count, 0);
  },

  // 获取区县数据
  getCountyInfo: function(column0 = 0, column1 = 0) {
    var c;
    countys = [];
    countyNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
        countys[num] = c;
        countyNames[num] = c.name;
        num++;
      }
    }
    if (countys.length == 0) {
      countys[0] = {
        name: ''
      };
      countyNames[0] = {
        name: ''
      };
    }
    console.log('countyNames:' + countyNames);
    var that = this;
    // value = [column0, column1, 0];

    that.setData({
      countys: countys,
      countyNames: countyNames,
      // value: value,
    })
  },

  bindTransportDayChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      transportIndex: e.detail.value
    })
  },

  bindProvinceNameChange: function(e) {
    var that = this;
    console.log('picker province 发生选择改变，携带值为', e.detail.value);
    var val = e.detail.value
    that.getCityArr(val); //获取地级市数据
    that.getCountyInfo(val, 0); //获取区县数据

    value = [val, 0, 0];
    this.setData({
      provinceIndex: e.detail.value,
      cityIndex: 0,
      countyIndex: 0,
      value: value
    })

  },

  bindCityNameChange: function(e) {
    var that = this;
    console.log('picker city 发生选择改变，携带值为', e.detail.value);

    var val = e.detail.value
    that.getCountyInfo(value[0], val); //获取区县数据
    value = [value[0], val, 0];
    this.setData({
      cityIndex: e.detail.value,
      countyIndex: 0,
      value: value
    })
  },

  bindCountyNameChange: function(e) {
    var that = this;
    console.log('picker county 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countyIndex: e.detail.value
    })
  },

  saveAddress: function(e) {
    var consignee = e.detail.value.consignee;
    var mobile = e.detail.value.mobile;
    var transportDay = e.detail.value.transportDay;
    var provinceName = e.detail.value.provinceName;
    var cityName = e.detail.value.cityName;
    var countyName = e.detail.value.countyName;
    var address = e.detail.value.address;

    console.log(transportDay + "," + provinceName + "," + cityName + "," +    countyName + "," + address); //输出该文本 

      
      wx.showLoading({
        title: '加载中...',
      })
    console.log('cookie',cookie.toString());
      wx.request({
        url: domain+'/insertAddress',
        method:"POST",
        header:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookie.toString()
        },
        data:{
          address:provinceName + cityName + countyName+address,
          name:consignee
        },
        success:(res)=>{
          console.log(res.data)
          // wx.request({
          //   url: domain + '/getAddress',
          //   method:"GET",
          //   data:{
          //       tk:wx.getStorageSync('token')
          //   },
          //   success:(res)=>{
          //       console.log(res.data)
          //       wx.setStorageSync('addressList', res.data)
          //   },
          //   complete:()=>{
          //     // var arr = wx.getStorageSync('addressList') || [];
          //     // console.log("arr,{}", arr);
          //     // addressList = {
          //     //   id:res.data,
          //     //   phone: mobile,//电话号码
          //     //   address: provinceName + cityName + countyName+address,//地址
          //     //   name: consignee,//用户名
          //     //   }
          //     // arr.push(addressList);
          //     // wx.setStorageSync('addressList', arr);
          //   }
          // })
          
        },
        complete:()=>{
          wx.hideLoading({
            success: (res) => {},
          })
        }
      })
      wx.navigateBack({})
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        
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
        var that = this;
        area.getAreaInfo(function(arr) {
            areaInfo = arr;
            //获取省份数据
            that.getProvinceData();
        });
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