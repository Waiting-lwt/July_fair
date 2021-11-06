<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodItem:{}
			}
		},
		methods: {
			
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		
		onLoad(option) {
			// decodeURIComponent 解密传过来的对象字符串
			if(JSON.stringify(option) != "{}"){
				this.goodItem = JSON.parse(decodeURIComponent(option.goodItem));
			}
			console.log(this.goodItem)
		},
	}
</script>

<style>

</style>
