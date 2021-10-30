const BASE_URL='http://120.24.48.171:8081'
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

export const uploadFile = (option) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url:BASE_URL+option.url,
			method:option.method || "POST",
			filePath: option.tempFilePaths[0],
			name: 'file', //后台接收字段名
			success: (res) => {
				if (res.statusCode == 200) {
					console.log('上传成功', res)
				}
				else{
					console.log('上传失败', res)
				}
				resolve(res)
			},
			fail: (err) => {
				console.log('请求失败', err)
				reject(err)
			}
		})
	})
}

export const chooseImage = () => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1, //上传图片的数量，默认是9
			// sizeType: ['original', 'compressed'], 
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: (res) => {
				console.log('请求成功', res)
				resolve(res)
			},
			fail: (err) => {
				console.log('请求失败', err)
				reject(err)
			}
		})
	})
}
					