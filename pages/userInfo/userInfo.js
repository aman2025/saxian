
Page({
  data: {
    userForm: {
      username: "",
      mobile: "",
    },
  },
  onLoad() {
  },
  // username
  handleUsername(e) {
    this.setData({
      "userForm.username": e.detail.value,
    });
  },
  // mobile
  handleMobile(e) {
    this.setData({
      "userForm.mobile": e.detail.value,
    });
  },
  // 保存
  doSave() {
    var vals = this.formValidate();
    if (vals) {
      // 电话号码校验
      var numReg = /^[0-9]*$/;
      if (!numReg.test(vals[1]) || vals[1].length != 11) {
        wx.showToast({
          title: '电话号码格式错误',
          icon:'none'
        });
        return null;
      }
      // 保存请求
      // request({
      //   url: "/api/user/bind",
      //   method: "post",
      //   data: this.data.userForm,
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
      username: "姓名不能为空",
      mobile: "电话不能为空",
    };
    var errorsLog = [];
    var vals = Object.keys(errors).map((key) => {
      const val = this.data.userForm[key];
      if (!val) {
        errorsLog.push(errors[key]);
      }
      return val;
    });
    if (vals.filter((v) => v).length === 2) {
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
