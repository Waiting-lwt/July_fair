<template>
	<view class="body">
		<Tabs @returnIndex="changeFunIndex" :title="functionTitle" :functionIndex="functionIndex"></Tabs>
		<view class="areo-history-track" v-for="(item,index) in showHistory" :key="index">
			
			<view class="title">
				<view class="title-bar"></view>
				<text class="title-name">{{index}}</text>
			</view>
		    <view class="history-block">
		    	<view class="history-item" v-for="(item,index) in item" :key="index">
		    		<view class="pic-box">
		    			<image class="pic" :src="item.introImage[0]" lazy-load="true" mode="aspectFill"></image>
		    		</view>
		    	</view>
		    </view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				functionIndex:0,
				functionTitle:["商品","拍卖品"],
				historyGoods:{},
				historyAuctions:{},
				showHistory:{},
				
				userid:1,
			}
		},
		methods: {
			changeFunIndex(index){
				this.functionIndex=index
				if(this.functionIndex==0) this.showHistory=this.historyGoods
				else this.showHistory=this.historyAuctions
			},
			async getHistory(){
				var res = await this.$myRequest({
					url: "/user/getBrowseHistoryWithTime",
					data:{
						id:this.userid, //test
					},
				})
				console.log(res.data.data)
				let history = res.data.data
				for (var i in history) { //time
					let time_i=this.$formatDate(Number(i),3)
					console.log(time_i)
					for (var j=0;j<history[i].length;j++){
						if(history[i][j].type==0){
							if(!this.historyGoods[time_i]){
								this.historyGoods[time_i]=[]
							}
							this.historyGoods[time_i].push(history[i][j])
						}
						else{
							if(!this.historyAuctions[time_i]){
								this.historyAuctions[time_i]=[]
							}
							this.historyAuctions[time_i].push(history[i][j])
						}
					}
				}
				console.log(this.historyGoods)
				console.log(this.historyAuctions)
				if(this.functionIndex==0) this.showHistory=this.historyGoods
				else this.showHistory=this.historyAuctions
			},
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(option) {
				if(option.type){
					this.functionIndex = Number(option.type)
					this.userid = Number(option.userid)
				}
				this.getHistory()
			},
		}
	}
</script>

<style>
	@import url("./my-morehistory.css");
</style>
