
Page({
  data: {
    chooseImgs: [],
    categories: ['瓷器', '书画'],
    categoryIndex: 99,
    categoryValue: '请选择产品品类',
    productForm: {
      name: "",
      type: "",
      price: "",
      img: "",
      remark: "",
      place: "",
      mobile: "",
      wechat: ""
    },
    tempImages: []
  },
  onLoad() {
  },
  // 选择类别
  bindPickerChange: function(e) {
    let index = e.detail.value;
    let categories = this.data.categories;
    this.setData({
      categoryIndex: index,
      categoryValue: categories[index],
      "productForm.type": index == 99 ? "" : "1" // 设置productForm.type为categories[index] 
    })
  },
  // username
  handleUsername(e) {
    this.setData({
      "productForm.name": e.detail.value,
    });
  },
  // price
  handlePrice(e) {
    this.setData({
      "productForm.price": e.detail.value,
    });
  },
  // place
  handlePlace(e) {
    this.setData({
      "productForm.place": e.detail.value,
    });
  },
  // remark
  handleRemark(e) {
    this.setData({
      "productForm.remark": e.detail.value,
    });
  },
  // mobile
  handleMobile(e) {
    this.setData({
      "productForm.mobile": e.detail.value,
    });
  },
  // wechat
  handleWechat(e) {
    this.setData({
      "productForm.wechat": e.detail.value,
    });
  },
  // 选择图片
  chooseImg() {
    let arr = []
    wx.chooseImage({
      // 同时上传9张
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths], // 累加所有的照片
          "productForm.img": res.tempFilePaths == 0 ? "0" : "1" // 有添加图片的productForm.img为1
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
  // 保存
  doSave() {
    var vals = this.formValidate();
    if (vals) {
      // 电话号码校验
      var numReg = /^[0-9]*$/;
      if (!numReg.test(vals[6]) || vals[6].length != 11) {
        wx.showToast({
          title: '电话号码格式错误',
          icon:'none'
        });
        return null;
      }

      // 数字和小数点      
      var numDotReg = /^\d+(\.\d+)?$/;
      if (!numReg.test(vals[2]) ) {
        wx.showToast({
          title: '格式错误',
          icon:'none'
        });
        return null;
      }


      // 保存请求
      // request({
      //   url: "/api/user/bind",
      //   method: "post",
      //   data: this.data.productForm,
      // }).then((res) => {
      //   if (res.data.code == 2000) {
      //     wx.showToast("保存成功!");
      //   }
      // });
    }
  },
  // 校验
  formValidate() {
    var errors = {
      name: "姓名不能为空",
      type: "产品品类不能为空",
      price: "价格不能为空",
      img: "图片不能为空",
      remark: "描述不能为空",
      place: "产地不能为空",
      mobile: "电话不能为空",
      wechat: "微信不能为空"
    };
    var errorsLog = [];
    var vals = Object.keys(errors).map((key) => {
      const val = this.data.productForm[key];
      if (!val) {
        errorsLog.push(errors[key]);
      }
      return val;
    });
    if (vals.filter((v) => v).length === 8) {
      return vals;
    } else {
      wx.showToast({
        title: errorsLog[0],
        icon:'none'
      });
    }
    return null;
  },
  
})
