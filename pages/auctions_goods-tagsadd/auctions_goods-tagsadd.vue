<template>
	<view>
		<view class="tags">
			<view class="selfTags-block">
				<view class="selfTags-box" v-for="(item,index) in selfTags" :key="index">
					<text>{{item}}</text>
					<text class="tags-delete" @tap="deleteTags(index)">x</text>
				</view>
			</view>
			<view class="tags-block">
				<text class="tags-block-title">热门标签</text>
				<view class="tags-items">
					<view class="tags-box" v-for="(item,index) in hotTags" :key="index"
					 @tap="selectTag(index)" :class="(selectTags.includes(index)?'selectTag':'')">
						{{item}}
					</view>
				</view>
			</view>
			<view class="tags-block">
				<text class="tags-block-title">自定义标签</text>
				<view class="tagsInput-block">
					<input type="text" v-model="tag" placeholder="请输入自定义标签文本" class="tagsInput"/>
					<view class="tagsInput-confirm" @tap="addTag">确认添加</view>
				</view>
			</view>
			<text class="hint">最多可添加3个标签</text>
		</view>
		<view class="bottom-block" @tap="confirmTags">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selfTags: [],  //标签
				
				hotTags: [],	//热门标签
				selectTags:[],
				
				tag: "",
			}
		},
		onLoad() {
			this.getHotTags()
		},
		methods: {
			deleteTags(index){
				if(this.hotTags.includes(this.selfTags[index])){
					let i = this.hotTags.indexOf(this.selfTags[index])
					this.selectTags = this.selectTags.filter(function(item){return item != i})
				}
				this.selfTags.splice(index, 1)
			},
			async getHotTags() {
				const res = await this.$myRequest({
					url: '/search/heat?type=0'
				})
				console.log(res)
				this.hotTags = res.data.data
			},
			selectTag(index){
				console.log(index)
				if(this.selectTags.includes(index)){
					// this.selectTags.splice(index,1)
				}
				else{
					if(this.selectTags.length==3){
						uni.showToast({
							title:"最多可添加3个标签",
							icon:'none',
						})
					}
					else{
						this.selectTags.push(index)
						this.selfTags.push(this.hotTags[index])
					}
				}
			},
			addTag(){
				if(this.tag==""){
					uni.showToast({
						title:"请输入自定义标签",
						icon:'none',
					})
				}
				else{
					if(this.selfTags.length==3){
						uni.showToast({
							title:"最多可添加3个标签",
							icon:'none',
						})
					}
					else{
						this.selfTags.push(this.tag)
					}
				}
				this.tag = ""
			},
			confirmTags(){
				if(this.selfTags.length!=0){
					let pages = getCurrentPages();
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.$vm.tags = [...this.selfTags]
					uni.navigateBack({})
				}
				else{
					uni.showToast({
						title:"请添加标签",
						icon:'none',
					})
				}
			}
		}
	}
</script>

<style>
	@import url("./auctions_goods-tagsadd.css");
</style>
