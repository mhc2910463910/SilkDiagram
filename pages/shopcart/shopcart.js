// pages/shopcart/shopcart.js
const domain = getApp().globalData.domain;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        urlId: domain + "/findCommodity?id=",
        isCartEmpty: false, // 购物车是否有商品
        hasAllSelected: false, // 是否全选
        cartList: [{
            "merchantInfo": {
              "merchantId": "2024",
              "name": "丝达-漫游古道",
              "icon": '',
              "hasSelected": false,
              "quantityUpdatable": false,
              "isActivity": false
            },
            "goodsList": []
        }],//购物车
    totalPrice: 0,
    recommends: []
    },
      /**
   * 由商家列表项选择商品组事件
   */
    selectGoodsGroup(e) {
        console.log(e);
        let cartList = this.data.cartList;
        const merchantId = e.currentTarget.dataset.merchantId;
 
        cartList.forEach(function (item) {
        if (item.merchantInfo.merchantId === merchantId) {
            const hasSelected = item.merchantInfo.hasSelected;
            item.merchantInfo.hasSelected = !hasSelected;
            item.goodsList.forEach(function (goods) {
                goods.hasSelected = item.merchantInfo.hasSelected;
            })
            return;
            };
        })
 
    this.setData({
      cartList: cartList,
    })
    this.calculateTotalPrice();
    this.verifyHasAllSelected();
  },
 
  /**
   * 计算商品总价格事件
   */
  calculateTotalPrice() {
    let cartList = this.data.cartList;
    let totalPrice = 0;
    cartList.forEach(function (item) {
      item.goodsList.forEach(function (goods) {
        // console.log(goods);
        if (goods.hasSelected) {
          totalPrice += goods.price * goods.quantity;
        }
        // console.log(totalPrice);
      })
    })
    this.setData({
      totalPrice: totalPrice
    })
  },
 
  /**
   * 验证是否全选事件
   */
  verifyHasAllSelected() {
    let hasAllSelected = true;
    let cartList = this.data.cartList;
    cartList.forEach(function (item) {
      if (!item.merchantInfo.hasSelected) {
        hasAllSelected = false;
        return;
      }
      item.goodsList.forEach(function (goods) {
        if (!goods.hasSelected) {
          hasAllSelected = false;
          return;
        }
      })
    })
    console.log(hasAllSelected);
    this.setData({
      hasAllSelected: hasAllSelected,
    })
  },
 
  /**
   * 单个商品选择事件
   */
  selectGoodsSingle(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            const hasSelected = goods.hasSelected;
            goods.hasSelected = !hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    this.calculateTotalPrice();
    this.verifyHasAllSelected();
  },
 
  /**
   * 商品数量减1事件
   */
  minus(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
    let hasSelected;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            if (goods.quantity <= 1) {
              wx.showToast({
                title: '商品数量少于1',
              })
            } else {
              goods.quantity -= 1;
            }
            hasSelected = goods.hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    if (hasSelected) {
      this.calculateTotalPrice();
    }
  },
 
  /**
   * 商品数量加1事件
   */
  pluse(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
    let hasSelected;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            if (goods.quantity >= 10) {
              wx.showToast({
                title: '数量超过10',
              })
            } else {
              goods.quantity += 1;
            }
            hasSelected = goods.hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    if (hasSelected) {
      this.calculateTotalPrice();
    }
 
  },
 
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let hasAllSelected = this.data.hasAllSelected;
    hasAllSelected = !hasAllSelected;
    let cartList = this.data.cartList;
    for (let i = 0; i < cartList.length; i++) {
      let item = cartList[i];
      item.hasSelected = hasAllSelected;
      item.merchantInfo.hasSelected = hasAllSelected;
      let goodsList = item.goodsList;
      for (let i = 0; i < goodsList.length; i++) {
        let goodsItem = goodsList[i];
        goodsItem.hasSelected = hasAllSelected;
      }
    }
 
    this.setData({
      hasAllSelected: hasAllSelected,
      cartList: cartList
    });
    this.calculateTotalPrice();
  },
 
  /**
   * 显示修改单个商品数量布局事件
   */
  showUpdateQuantity(e) {
    console.log(e);
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
 
    this.showOrHideUpdateQuantity(merchantId, goodsId, true);
  },
 
  /**
   * 隐藏修改单个商品数量事件 
   */
  hideUpdateQuantity(e) {
    console.log(e);
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
 
    this.showOrHideUpdateQuantity(merchantId, goodsId, false);
  },
 
  /**
   * 显示改商品数量对话框事件
   */
  showUpdateQuantityDialog() {
 
  },
 
  /**
   * 显示或者隐藏修改商品数量布局事件
   */
  showOrHideUpdateQuantity(merchantId, goodsId, quantityUpdatable) {
    let cartList = this.data.cartList;
    console.log(merchantId);
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            goods.quantityUpdatable = quantityUpdatable;
            return;
          }
        })
        return;
      }
 
    });
    this.setData({
      cartList: cartList,
    })
  },
  // 
  getShopList(){
    // console.log(this.data.cartList[0]['goodsList'][0])
    wx.showLoading({
      title: '数据加载中...'
    })
    let cart=wx.getStorageSync('cartList')||[];
    for(let i=0;i<cart.length;i++){
      wx.request({
        url: this.data.urlId+cart[i],
        method:"GET",
        success:(res)=>{
            console.log(res)
            var obj=res.data;
            obj['merchantId']="2024";
            obj['image']=obj['img1'];
            obj['title']=obj['name'];
            obj['quantity']=1;
            obj['quantityUpdatable']=false;
            obj['hasSelected']=false;
            this.setData({
                ['cartList[0].goodsList']:this.data.cartList[0]['goodsList'].concat(obj)
            })
        }
      })
    }
    wx.hideLoading({
      success: (res) => {},
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      this.getShopList()
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
      this.setData({
        ['cartList[0].goodsList']:[],
        totalPrice:0,
        hasAllSelected:false
      })
      this.getShopList()
      wx.stopPullDownRefresh()
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