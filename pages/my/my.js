Page({
  data: {
    message: {}
  },
  onShow() {
  },
  onLoad() {
    console.log('my...')
  },
  editUserInfo(){
    wx.navigateTo({
      url: '/pages/userInfo/userInfo',
    })
  }
})
