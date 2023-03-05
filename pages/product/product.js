// import {request} from "../../request/request.js"
Page({
  data: {
    tabList: [
      {
        id: 0,
        value: "上架中",
        isActive: true,
      },
      {
        id: 1,
        value: "已下架",
        isActive: false,
      }
    ],
    shopInfo: {
      "name": "店铺名称店铺名称",
      "image": "https://qiniu.daier.zaihukeji.cn/uploads/20210913/FqKZHvUgI0XaoGCymcnVsForFj-O.PNG",
      "number": "28",
    },
    courseParams: {
      page: 1,
      pageSize: 10
    },
    passCourse: [{
      "id": 1,
      "name": "测试1",
      "image": "https://qiniu.daier.zaihukeji.cn/uploads/20210913/FqKZHvUgI0XaoGCymcnVsForFj-O.PNG",
      "pirce": "28",
      "is_pass": 1, // 1-通过 0-未通过
    },
    {
      "id": 2,
      "name": "测试2",
      "image": "https://qiniu.daier.zaihukeji.cn/uploads/20210913/FqKZHvUgI0XaoGCymcnVsForFj-O.PNG",
      "pirce": "28",
      "is_pass": 1, 
    }],
    otherCourse: [{
      "id": 1,
      "name": "产品名称产品名称产品名称产品名称",
      "image": "https://qiniu.daier.zaihukeji.cn/uploads/20210913/FqKZHvUgI0XaoGCymcnVsForFj-O.PNG",
      "pirce": "28",
      "is_pass": 0, 
    },
    {
      "id": 2,
      "name": "测试5",
      "image": "https://qiniu.daier.zaihukeji.cn/uploads/20210913/FqKZHvUgI0XaoGCymcnVsForFj-O.PNG",
      "pirce": "28",
      "is_pass": 0, 
    }]
  },
  onLoad() {
    // this.getCouserList();
  },
  changeTitleByIndex(index) {
    let { tabList } = this.data;
    tabList.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabList,
    });
  },
  tabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
  },
  // 获取课程列表
  // getCouserList(){
  //   request({
  //     url: "/api/index/list",
  //     data: this.data.courseParams
  //   })
  //   .then(res => {
  //     var allData = res.data.data.list;
  //     var passCourse = [];
  //     var otherCourse = [];
  //     // 根据is_pass，过滤已通过
  //     passCourse = allData.filter((obj)=>{
  //       return obj.is_pass == 1
  //     })
  //     // 未通过
  //     otherCourse = allData.filter((obj)=>{
  //       return obj.is_pass != 1
  //     })
  //     this.setData({
  //       passCourse,
  //       otherCourse
  //     })
  //   })
  // },
  // 立即学习
  doStudy(e){
    var cid = e.currentTarget.dataset.cid
    var cname = e.currentTarget.dataset.cname

    wx.navigateTo({
      url: '/pages/courseDetail/courseDetail?id=' + cid + '&name=' + cname,
    })
  }
});
