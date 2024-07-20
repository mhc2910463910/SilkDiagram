const showMyLoading = function(page, visible){
  console.log(page);
  // 可以再加一个提示语嵌入
  console.log('测试');
  page.setData({
    [visible]: true
  });
};
const hideMyLoading = function(page,visible){
  page.setData({
    [visible]: false
  })
}
export default{
  showMyLoading,
  hideMyLoading
}

