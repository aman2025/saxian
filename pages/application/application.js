
Page({
  data: {
    chooseImgs: [],
    business: ['美国', '中国', '巴西', '日本'],
    index: 99,
    businessValue: '请选择',
    shopName: ''
  },
  onLoad() {
  },
  // 选择图片
  chooseImg() {
    wx.chooseImage({
      // 最多上传一张
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        this.setData({
          chooseImgs: res.tempFilePaths, // 图片路径
        });
      },
    });
  },
  // 删除图片
  removeImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs,
    });
  },
  // 选择
  bindPickerChange: function(e) {
    let index = e.detail.value
    let business = this.data.business
    this.setData({
      index,
      businessValue: business[index]
    })
  },
})
