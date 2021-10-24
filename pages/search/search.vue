<template>
	<view>
		<zy-search :is-focus="false" :theme="themeClass" :show-want="true" :speechEngine="speechEngine"
		:hot-list="hotList" @getSearchText="getSearchText"></zy-search>
	</view>
</template>

<script>
	import zySearch from '../../components/zy-search/zy-search.vue'
	export default {
		components: {
			zySearch
		},
		data() {
			return {
				themeClass: 'circle',
				speechEngine: 'baidu', //语音识别引擎
				hotList: []	//初始化推荐列表
			}
		},
		onLoad() {
		  this.getHotlist()
		},
		methods: {
			// init() {
			// 	this.getHotlist()
			// },
			getSearchText(e) {
				// uni.showToast({
				// 	title:'回调的搜索信息: ' + e,
				// 	icon:"none"
				// })
			},
			async getHotlist() {
				const res = await this.$myRequest({
					url: '/search/heat?type=0'
				})
				console.log(res)
				this.hotList = res.data.data
			},
		},
	}
</script>

<style>
</style>
