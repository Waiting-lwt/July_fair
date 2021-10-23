// const BASE_URL='http://106.55.252.195:8081';
const BASE_URL='http://120.24.48.171:8081';
export const myRequest = (option) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url:BASE_URL+option.url,
			method:option.method || "GET",
			data: option.data || {},
			header: option.header || {'Content-Type':'application/json'},
			success: (res) => {
				if(res.data.status!==0){
					return uni.showToast({
						icon: 'error',
						title:"获取数据失败"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					icon: 'error',
					title:"请求接口失败"
				})
				reject(err)
			}
		})
	})
}