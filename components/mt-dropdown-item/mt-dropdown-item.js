// component/mt-weapp/mt-dropdown-item/mt-dropdown-item.js
Component({
  relations: {
    '../mt-dropdown/mt-dropdown': {
      type: 'parent',
      linked: function(target) {
        this.setData({
          parentNode: target,
          selectColor: target.data.selectColor
        })

        let that = this
        var parentQuery = target.createSelectorQuery()
        parentQuery.select('#mt_dropdown').boundingClientRect(function (res) {
          that.setData({
            top: res.top + res.height //根据实际需求加减值
          })
        }).exec()
      }
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String
    },
    type: {
      type: String,
      value: 'one' // 'one' 'multi'
    },
    index: {
      type: Number
    },
    title: {
      type: String,
    },
    options: {
      type: Array,
      observer: function(list) {
        // 单选
        if(list && this.data.initVal) {
          this.data.local_index = list.findIndex(i => i.value == this.data.initVal)
          this.setData({
            local_index: this.data.local_index
          })
        }
        // 复选
        if(list && this.data.type === 'multi') {
          let local_options = list.map(i => {
            i.checked = false
            return i
          })
          this.setData({
            local_options: local_options
          })
        }
      }
    },
    initVal: {
      type: String
    },
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击item
    onTapItem(e) {
      this.toggle()
    },
    // 点击遮罩
    onTapModal(e) {
      if(this.data.type == 'multi') return false
      this.toggle(false)
    },
    // 选择选项
    onSelectItem(e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        local_index: index,
      })
      this.toggle()
      this.triggerEvent('select', {value: this.data.options[index]})
    },
    // 复选选择选项
    onCheckItem(e) {
      let index = e.currentTarget.dataset.index
      this.data.local_options[index].checked = !this.data.local_options[index].checked
      this.setData({
        local_options: this.data.local_options
      })
    },
    checkConfirm(e) {
      let checked_list = []
      this.data.local_options.forEach(i => {
        if(i.checked) checked_list.push(i)
      })
      this.changeState(this.data.local_options.some(i => i.checked))
      this.triggerEvent('select', checked_list)
      this.toggle()
    },
    checkReset(e) {
      this.data.local_options.map(i => {
        i.checked = false
      })
      this.setData({
        local_options: this.data.local_options
      })
    },
    // 切换收起或展开状态
    toggle(val) {
      this.setData({
        showModal: val ? val : !this.data.showModal
      })
      this.data.parentNode.updateItemStatus(this.__wxExparserNodeId__)
    },
    // 改变选中状态
    changeState(val) {
      this.setData({
        selectState: val ? val : !this.data.selectState
      })
    }
  }
})
