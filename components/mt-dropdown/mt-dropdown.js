// component/mt-weapp/mt-dropdown/mt-dropdown.js
Component({
  options: {

  },
  /**
   * 组件的属性列表
   */
  properties: { 
    selectColor: {
      type: String,
      value: '#1890FF'
    }
  },

  relations: {
    '../mt-dropdown-item/mt-dropdown-item': {
      type: 'child',
    }
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
   methods: {
    _getAllLi(){
      var nodes = this.getRelationNodes('../mt-dropdown-item/mt-dropdown-item')
      this.setData({
        itemList: nodes
      })
    },
    updateItemStatus(id) {
      let item = this.data.itemList.find(i => i.__wxExparserNodeId__ == id)
      if(item.data.showModal) {
        this.data.itemList.forEach(i => {
          if(i.__wxExparserNodeId__ !== id) {
            i.setData({
              showModal: false
            })
          }
        })
      }
    }
  },

  ready: function(){
    this._getAllLi()
  }
})
