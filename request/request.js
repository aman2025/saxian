function login() {
	wx.navigateTo({
    url: '/pages/login/login'
  })
}
function showToast(title) {
	setTimeout(() => {
		wx.showToast({
			title,
			icon: 'none',
			duration: 2000
		})
	}, 200)
}
/*
	isShowLoading： 是否显示loading
	isFirst： 是否需要token
	isMsg: 是否发送短信
	sucToast: 请求成功的提示
	errToast: 后端返回错误提示
*/
export const request = ({
  method = 'GET',
  url,
  data = {},
  isShowLoading = false,
  isFirst = true,
  errToast = true,
}) => {
  // https://mockapi.eolinker.com/kVz8QgIe8560ae37d9fb1c8f39fa4526f6db303143b8057
  const baseUrl = "https://daier.zaihukeji.cn"; // https://daier.zaihukeji.cn
  const header = {
    'content-type': 'application/json;charset=UTF-8'
  }

  // 登录注册，无需token，isFirst = false
  if(isFirst){
    var token = wx.getStorageSync('token');
    if(!token){
      return new Promise((resolve, reject) => { 
				login(); 
			})
    }
    // header加上token
    header.token = token
  }
  
  // 显示loading
  if (isShowLoading) {
		wx.showLoading({
			title: '加载中',
			mask: true
		})
  }
  
  // 返回Promise 实例
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      header,
      method: method,
      data: method === 'post' ? JSON.stringify(data) : data,
      success: (result)=>{
        // 返回成功
        if (res.data.code === 2000) {
					resolve(res.data)
					return
        }
        // 返回失败，状态码6001
        if ([6001].includes(res.data.code)) {
          reject(res.data); //在外面catch中获取， 并执行wx.removeStorage
					if (errToast) { // 根据返回的错误信息，弹出提示
						showToast(res.data.msg)
					}
					return
        }
        // 未登录
        if ([6002, 6003].includes(res.data.code)) { // 未登录
					showToast(res.data.msg)
					setTimeout(() => {
						login()
					}, 1500)
					return
				}
        reject(res.data)
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
  // todo:拦截器
}