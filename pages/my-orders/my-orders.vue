<template>
	<view class="function-body">
		<Tabs @returnIndex="changeFunIndex" :title="functionTitle" :functionIndex="functionIndex"></Tabs>
		
		<!-- 市集 -->
		<view v-if="functionIndex==0">
			<view class="title">
				
				<!-- 购买 or 卖出 -->
				<view class="title-option" v-for="(item,index) in marketTitle" :key="index"
				@click="changeMarIndex(index)">
					<view class="title-bar" :class="{barActive:marketIndex===index}"></view>
					<text class="title-name" :class="{textActive:marketIndex===index}">{{item}}</text>
				</view>
				
				<!-- 进度 -->
				<view class="modal-mask" @tap="showSpringBox1=(showSpringBox1+1)%2;" v-if="showSpringBox1==true"></view>
				<view class="title-sort" @tap="showSpringBox1=(showSpringBox1+1)%2">
					<text class="springText">进度</text>
					<text v-if="showSpringBox1==false" class="springBoxDown">
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
							<path id="多边形_10" data-name="多边形 10" d="M5,0l5,6H0Z" transform="translate(10 6) rotate(180)" fill="#4F73A5"/>
						</svg>
					</text>
					<text v-else class="springBoxUp">
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
						  <path id="多边形_10" data-name="多边形 10" d="M5,0l5,6H0Z" fill="#4f73a5"/>
						</svg>
					</text>
				</view>
				<view class="arrivalNavigation" v-if="showSpringBox1">
					<view class="sideNavigation">
						<template v-if="marketIndex==0" v-for="(item,index) in progress1_1.texts">
							<view v-if="index!=0" class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="marketsBuyProcess(index)" :key="index">
								<text>{{item}}</text>
							</view>
						</template>
						<template v-if="marketIndex==1" v-for="(item,index) in progress1_2.texts">
							<view v-if="index!=0" class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="marketsSellProcess(index)" :key="index">
								<text>{{item}}</text>
							</view>
						</template>
					</view>
				</view>
				
			</view>
			
			<view class="content">
				<view class="goods-item" v-for="(item,index1) in showMarket" @tap="toClassify(item.id)">
				    <view class="item-img">
						<view>
							<image class="item-pic" mode="scaleToFill" :src="item.introImage"></image>
						</view>
						<view class="seller-item">
							<image class="seller-pic" :src="item.userImage"></image>
							<text class="seller-name">{{item.userName}}</text>
						</view>
					</view>
				    <view class="item-block" v-if="marketIndex==0" >
						<view class="item-detail">
						    <text class="item-title">{{item.name}}</text>
						    <text class="item-text">下单时间 {{item.time}}</text>
						    <text class="item-price">实付款 ￥{{item.totalPrice}}</text>
						</view>
						<!-- 0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价 -->
						<view class="sell-item" @tap="ordersMgt1"
						v-if="item.status==2||item.status==3||item.status==5" >
							<!-- <text v-if="item.status==0">确认收货</text> -->
							<text v-if="item.status==2">确认收货</text>
							<text v-if="item.status==3">写评价</text>
							<text v-if="item.status==5">查看评价</text>
						</view>
						<view class="sell-text" v-else>
							<text v-if="item.status==1">未发货</text>
							<text v-if="item.status==4">退货中：等待商家回应</text>
							<text v-if="item.status==6">退货中：商家未同意</text>
							<text v-if="item.status==7">退货中：商家已同意</text>
						</view>
						<view class="sell-icon" @tap="ordersMgt2">···</view>
				    </view>
				    <view class="item-block" v-if="marketIndex==1" >
					    <view class="item-detail">
					        <text class="item-title">{{item.name}}</text>
					        <text class="item-text">下单时间 {{item.time}}</text>
					        <text class="item-price">实收款 ￥{{item.totalPrice}}</text>
					    </view>
						<view class="sell-item" @tap="ordersMgt1"
						v-if="item.status==1||item.status==4||item.status==5">
							<!-- <text v-if="item.status==0">买家未确认</text> -->
							<text v-if="item.status==1">去发货</text>
							<text v-if="item.status==4">买家申请退款</text>
							<text v-if="item.status==5">查看评价</text>
						</view>
						<view class="sell-text" v-else>
							<text v-if="item.status==2">买家未收货</text>
							<text v-if="item.status==3">买家未评价</text>
							<text v-if="item.status==6">买家申请退款：未同意</text>
							<text v-if="item.status==7">买家申请退款：已同意</text>
						</view>
						<view class="sell-icon" @tap="ordersMgt2(item.good_id)">···</view>
				    </view>
				</view>
			</view>
		</view>
		
		<!-- 拍卖————我的竞拍 -->
		<view v-if="functionIndex==1">
			<view class="title">
				<!-- 竞拍 or 拍品 -->
				<view class="title-option" v-for="(item,index) in auctionTitle" :key="index"
				@click="changeAucIndex(index)">
					<view class="title-bar" :class="{barActive:auctionIndex===index}"></view>
					<text class="title-name" :class="{textActive:auctionIndex===index}">{{item}}</text>
				</view>
				
				<!-- 进度 -->
				<view class="modal-mask" @tap="showSpringBox2=(showSpringBox2+1)%2;" v-if="showSpringBox2==true"></view>
				<view class="title-sort" @tap="showSpringBox2=(showSpringBox2+1)%2">
					<text class="springText">进度</text>
					<text v-if="showSpringBox2==false" class="springBoxDown">
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
							<path id="多边形_10" data-name="多边形 10" d="M5,0l5,6H0Z" transform="translate(10 6) rotate(180)" fill="#4F73A5"/>
						</svg>
					</text>
					<text v-else class="springBoxUp">
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
						  <path id="多边形_10" data-name="多边形 10" d="M5,0l5,6H0Z" fill="#4f73a5"/>
						</svg>
					</text>
				</view>
				<view class="arrivalNavigation" v-if="showSpringBox2">
					<view class="sideNavigation">
						<template v-if="auctionIndex==0" v-for="(item,index) in progress2_1.texts">
							<view v-if="index!=0" class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="auctionsBuyProcess(index)" :key="index">
								<text>{{item}}</text>
							</view>
						</template>
						<template v-if="auctionIndex==1" v-for="(item,index) in progress2_2.texts">
							<view v-if="index!=0" class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="auctionsSellProcess(index)" :key="index">
								<text>{{item}}</text>
							</view>
						</template>
					</view>
				</view>
				
			</view>
		
			<!-- 竞拍 -->
			<view class="content" v-if="auctionIndex==0">
				<view class="goods-item" v-for="(item,index1) in showAuction" :key="item.good_id" @tap="toClassify(item.id)">
				    <view class="item-img">
						<image class="item-pic" mode="scaleToFill" :src="item.intro_image[0]"></image>
						<view class="seller-item" v-if="item.portrait">
							<image class="seller-pic" :src="item.portrait"></image>
							<text class="seller-name">{{item.seller_name}}</text>
						</view>
					</view>
				    <view class="item-block">
				        <view class="item-detail">
				            <text class="item-title">{{item.name}}</text>
				            <text class="item-text" v-if="item.restTime!='已结束'">剩余时间 {{item.restTime}} 天</text>
				            <text class="item-text" v-if="item.getAunctionTime">拍得时间 {{item.getAunctionTime}}</text>
				            <text class="item-text" v-if="item.maxBid_Recently">当前最高价格 {{item.maxBid_Recently}}</text>
				            <text class="item-price" v-if="item.total_price">最终竞拍价格 ￥{{item.total_price}}</text>
				        </view>
						<!-- 0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价 -->
						<view class="sell-item" 
						v-if="(item.status=='完善收获信息'||
						item.status=='确认收货'||
						item.status=='写评价'||
						item.status=='查看评价')" @tap="ordersMgt1">
							<text>{{item.status}}</text>
						</view>
						<view class="sell-text" v-else-if="(item.status!='')">
							<text>{{item.status}}</text>
						</view>
						<text class="auctioning" v-if="item.rank">我的排位 {{item.rank}}</text>
						<view class="sell-icon" @tap="ordersMgt2(item.good_id)"
						v-if="item.status!=''&&item.status!='完善收获信息'">···</view>
				    </view>
				</view>
			</view>
			
			<!-- 拍品 -->
			<view class="content" v-if="auctionIndex==1">
				<view class="goods-item" v-for="(item,index1) in showAuction" @tap="toClassify(item.id)"
				:class="{outTime:(item.status=='无人竞拍已超时')}">
				    <view class="item-img">
						<image class="item-pic" mode="scaleToFill" :src="item.intro_image[0]"></image>
						<view class="seller-item" v-if="item.portrait">
							<image class="seller-pic" :src="item.portrait"></image>
							<text class="seller-name">{{item.buyer_name}}</text>
						</view>
					</view>
				    <view class="item-block">
				        <view class="item-detail">
							<text class="item-title">{{item.name}}</text>
						    <text class="item-text" v-if="item.restTime!='已结束'">剩余时间 {{item.restTime}} 天</text>
							<text class="item-text" v-if="item.getAunctionTime">拍得时间 {{item.getAunctionTime}}</text>
						    <text class="item-text" v-if="item.maxBid_Recently">当前最高价格 {{item.maxBid_Recently}}</text>
						    <text class="item-price" v-if="item.total_price">最终竞拍价格 ￥{{item.total_price}}</text>
				        </view>
						<!-- status : 0:未确认，1:去发货,2:查看物流,3:拍卖用户还未评价,4:退款中,5:拍卖用户已评价，6:重新上架 -->
						<view class="sell-item"
						v-if="(item.status=='去发货'||
						item.status=='买家申请退款'||
						item.status=='查看评价')" @tap="ordersMgt1">
							<text>{{item.status}}</text>
						</view>
						<view class="sell-text" v-else-if="(item.status!='')">
							<text>{{item.status}}</text>
						</view>
						<text class="auctioning" v-if="item.status==''">竞拍人数 {{item.totalBidPersons||0}}</text>
						<view class="sell-icon" @tap="ordersMgt2(item.good_id)"
						v-if="item.status!=''&&item.status!='买家未正式下单'">···</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="goods-bottom">......已经到底啦......</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				functionTitle:["市集","拍卖"],
				functionIndex:0,
				
				showSpringBox1:false,
				showSpringBox2:false,
				
				//市集——购买 0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价
				marketTitle:["我的购买","我的卖出"],
				marketIndex:0,
				progress1_1:{index:0,texts:["全部","未发货","未收货","未评价","退款中","已评价"]},
				marketBuyer:{items:[],page:0},
				
				//市集——卖出
				progress1_2:{index:0,texts:["全部","未发货","未收货","未评价","退款中","已评价"]},
				marketSeller:{items:[],page:0},
				
				showMarket:[],
				
				//拍卖——购买
				auctionTitle:["我的竞拍","我的拍品"],
				auctionIndex:0,
				progress2_1:{index:0,texts:["全部","正在拍卖","未拍得","未确认","未发货","未收货","未评价","退款中","已评价"]},
				auctionBuyer:{items:[],page:0},
				
				//拍卖——卖出
				progress2_2:{index:0,texts:["全部","正在拍卖","未确认","未发货","未收货","未评价","退款中","已评价","已超时"]},
				auctionSeller:{items:[],page:0},
				
				showAuction:[],
				
				count:4,
			}
		},
		methods: {
			//切换tab选项卡的标题
			changeFunIndex(index){
				this.functionIndex=index
				console.log(index)
				if(this.functionIndex==0){
					this.changeMarIndex(this.marketIndex)
				}
				else{
					this.changeAucIndex(this.auctionIndex)
				}
			},
			changeMarIndex(index){
				this.marketIndex=index
				if(this.marketIndex==0){
					this.marketsBuyProcess()
				}
				else{
					this.marketsSellProcess()
				}
			},
			changeAucIndex(index){
				this.auctionIndex=index
				if(this.auctionIndex==0) {
					this.auctionsBuyProcess()
				}
				else{
					this.auctionsSellProcess()
				}
			},
			marketsBuyProcess(index=0,update=false){
				if(update==false){
					this.showMarket=[]
					this.showSpringBox1=false
					this.marketBuyer.page=0
					this.marketBuyer.items=[]
				}
				
				if(index==0){//全部
					this.getMarketsBuy()
				}
				else if(index<=5){
					this.getMarketsBuy(index)
				}
				this.progress1_1.index=index
			},
			marketsSellProcess(index=0,update=false){
				if(update==false){
					this.showMarket=[]
					this.showSpringBox1=false
					this.marketSeller.page=0
					this.marketSeller.items=[]
				}
				
				if(index==0){//全部
					this.getMarketsSell()
				}
				else if(index<=5){
					this.getMarketsSell(index)
				}
				this.progress1_2.index=index
			},
			auctionsBuyProcess(index=0,update=false){
				if(update==false){
					this.showAuction=[]
					this.showSpringBox2=false
					this.auctionBuyer.page=0
					this.auctionBuyer.items=[]
				}
				
				if(index==0){//全部
					this.getAuctionsBuy()
				}
				else if(index<=2){ //1,2
					this.getAuctionsBuy(-1)
				}
				else if(index<=8){
					this.getAuctionsBuy(index-3)
				}
				this.progress2_1.index=index
			},
			auctionsSellProcess(index=0,update=false){
				if(update==false){
					this.showAuction=[]
					this.showSpringBox2=false
					this.auctionSeller.page=0
					this.auctionSeller.items=[]
				}
				
				if(index==0){//全部
					this.getAuctionsSell()
				}
				else if(index==1){
					this.getAuctionsSell(-1)
				}
				else if(index<=7){
					this.getAuctionsSell(index-2)
				}
				else if(index==8){
					this.getAuctionsSell(8)
				}
				this.progress2_2.index=index
			},
			ordersMgt1(){
				console.log("Mgt1")
			},
			ordersMgt2(){
				wx.showActionSheet({
				     itemList: ["查看物流", "取消订单"],
				     success: function (res) {
				       if (!res.cancel) {
						 //点击了那个按钮的下标
				         console.log(res.tapIndex)
				       }
				     }
				})
			},
			
			//市集——我的购买
			async getMarketsBuy(k=-1){
				let res = await this.$myRequest({
					url: "/order/buyer",
					data:{
						id:2, //test
						type:0, //0:普通商品，1:拍卖品
						status:k, 
						pageNum:this.marketBuyer.page,
						pageSize:this.count,
					},
				})
				if(res.data.data.length){
					this.marketBuyer.page++
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].time=this.$formatDate(res.data.data[i].time)
						res.data.data[i].introImage=res.data.data[i].introImage.slice(2,res.data.data[i].introImage.length-2)
						let image = await this.$myRequest({
							url: "/user/baseInformation",
							data:{
								id:res.data.data[i].buyerId,
							},
						})
						res.data.data[i]['userImage']=image.data.data.portrait
						res.data.data[i]['userName']=image.data.data.name
					}
				}
				this.marketBuyer.items=[...this.marketBuyer.items,...res.data.data]
				this.showMarket=this.marketBuyer.items
				if(k==4){
					this.getMarketsBuy(6)
				}
				else if(k==6){
					this.getMarketsBuy(7)
				}
				console.log(this.showMarket)
			},
			
			
			//市集——我的卖出
			async getMarketsSell(k=-1){
				let res = await this.$myRequest({
					url: "/order/seller",
					data:{
						id:1, //test
						type:0, //0:普通商品，1:拍卖品
						status:k, //0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价
						pageNum:this.marketSeller.page,
						pageSize:this.count,
					},
				})
				if(res.data.data.length){
					this.marketSeller.page++
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].time=this.$formatDate(res.data.data[i].time)
						res.data.data[i].introImage=res.data.data[i].introImage.slice(2,res.data.data[i].introImage.length-2)
						let image = await this.$myRequest({
							url: "/user/baseInformation",
							data:{
								id:res.data.data[i].sellerId,
							},
						})
						res.data.data[i]['userImage']=image.data.data.portrait
						res.data.data[i]['userName']=image.data.data.name
					}
				}
				this.marketSeller.items=[...this.marketSeller.items,...res.data.data]
				this.showMarket=this.marketSeller.items
				if(k==4){
					this.getMarketsSell(6)
					}
				else if(k==6){
					this.getMarketsSell(7)
				}
				console.log(this.showMarket)
			},
			
			//拍卖——我的竞拍
			async getAuctionsBuy(k=null){
				console.log(k)
				let res = {}
				if(k==null){
					res = await this.$myRequest({
						url: "/goods/getMyBidAuctions",
						data:{
							id:2, //test
							// attribute:k,
							// 1:未发货,2:确认收货,3:写评价,5:查看评价,
							// 4:退款中:等待商家回应,6:退款中:商家已同意,7:退款中:商家未同意,
							// 未拍：0:正式下单，8:完善收获信息，其他值返回status=""
							pageNum:this.auctionBuyer.page,
							pageSize:this.count,
						},
					})
				}
				else{
					res = await this.$myRequest({
						url: "/goods/getMyBidAuctions",
						data:{
							id:2, //test
							attribute:k,
							// 1:未发货,2:确认收货,3:写评价,5:查看评价,
							// 4:退款中:等待商家回应,6:退款中:商家已同意,7:退款中:商家未同意,
							// 未拍：0:正式下单，8:完善收获信息，其他值返回status=""
							pageNum:this.auctionBuyer.page,
							pageSize:this.count,
						},
					})
				}
				if(res.data.data.length){
					this.auctionBuyer.page++
					for(let i=0;i<res.data.data.length;i++){
						if('seller_id' in res.data.data[i]){
							res.data.data[i].getAunctionTime=this.$formatDate(res.data.data[i].getAunctionTime)
						}
					
						if(this.progress2_1.index==1){//正在拍卖
							if(!'rank' in res.data.data[i]){
								res.data.data.splice(i,1)
							}
						}
						else if(this.progress2_1.index==2){//未拍得
							if('rank' in res.data.data[i]){
								res.data.data.splice(i,1)
							}
						}
					}
				}
				this.auctionBuyer.items=[...this.auctionBuyer.items,...res.data.data]
				this.showAuction=this.auctionBuyer.items
				if(k==4){
					this.getAuctionsBuy(6)
					}
				else if(k==6){
					this.getAuctionsBuy(7)
				}
				console.log(this.showAuction)
			},
			
			//拍卖——我的拍品
			async getAuctionsSell(k=null){
				console.log(k)
				let res = {}
				if(k==null){
					res = await this.$myRequest({
						url: "/goods/getMyAuctions",
						data:{
							id:1, //test
							//attribute指定0-6中的某个值(分别对应不同的进度，
							//0:买家未正式下单，1:去发货,2:买家未收货,3:买家未评价,4:买家申请退款,5:查看评价，6:无人竞拍已超时
							//不传默认id排列返回
							// attribute: k,
							pageNum:this.auctionSeller.page,
							pageSize:this.count,
						},
					})
				}
				else{
					res = await this.$myRequest({
						url: "/goods/getMyAuctions",
						data:{
							id:1, //test
							//attribute指定0-6中的某个值(分别对应不同的进度，
							//0:买家未正式下单，1:去发货,2:买家未收货,3:买家未评价,4:买家申请退款,5:查看评价，6:无人竞拍已超时
							//不传默认id排列返回
							attribute: k,
							pageNum:this.auctionSeller.page,
							pageSize:this.count,
						},
					})
				}
				if(res.data.data.length){
					this.auctionSeller.page++
					for(let i=0;i<res.data.data.length;i++){
						if('buyer_id' in res.data.data[i]){
							res.data.data[i].getAunctionTime=this.$formatDate(res.data.data[i].getAunctionTime)
						}
					}
				}
				this.auctionSeller.items=[...this.auctionSeller.items,...res.data.data]
				this.showAuction=this.auctionSeller.items
				if(k==4){
					this.getAuctionsSell(6)
					}
				else if(k==6){
					this.getAuctionsSell(7)
				}
				console.log(this.showAuction)
			},
		},
		
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(option) {
			if(option.type){
				this.functionIndex = Number(option.type)
			}
			if(this.functionIndex==0&&this.marketIndex==0) this.getMarketsBuy()
			else if(this.functionIndex==0&&this.marketIndex==1) this.getMarketsSell()
			else if(this.functionIndex==1&&this.marketIndex==0) this.getAuctionsBuy()
			else if(this.functionIndex==1&&this.marketIndex==1) this.getAuctionsSell()
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if(this.functionIndex==0&&this.marketIndex==0)
				this.marketsBuyProcess(this.progress1_1.index,true)
			else if(this.functionIndex==0&&this.marketIndex==1)
				this.marketsSellProcess(this.progress1_2.index,true)
			else if(this.functionIndex==1&&this.auctionIndex==0)
				this.auctionsBuyProcess(this.progress2_1.index,true)
			else if(this.functionIndex==1&&this.auctionIndex==1)
				this.auctionsSellProcess(this.progress2_2.index,true)
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
	}
	
</script>

<style>
	@import url("./my-orders.css");
</style>
