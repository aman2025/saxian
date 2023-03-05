
Page({
  data: {
    mpic01: "../../assets/images/m01.png",
    mpic02: "../../assets/images/m02.png",
    memberInfo:[{
      id: 1,
      month: '1月',
      price: '15',
      detail: '11111111'
    },{
      id: 2,
      month: '3月',
      price: '50',
      detail: '333333'
    },{
      id: 3,
      month: '6月',
      price: '98',
      detail: '666666'
    },{
      id: 4,
      month: '一年',
      price: '179',
      detail: '一年'
    }],
    price: '15',
    active: 0,
    content: '11111111'
  },
  onLoad() {
    
  },
  choose(e){
    const { index, number, content } = e.currentTarget.dataset;
    console.log(number)
    this.setData({
      price: number,
      active: index,
      content
    });
  }
})
