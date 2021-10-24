<template>
	<view class="function-body">
		<Tabs @returnIndex="changeFunIndex" :title="functionTitle" :functionIndex="functionIndex"></Tabs>
		
		<!-- 市集 -->
		<view v-show="functionIndex==0">
			<view class="title">
				
				<!-- 购买 or 卖出 -->
				<view class="title-option" v-for="(item,index) in marketTitle" :key="index"
				@click="changeMarIndex(index)">
					<view class="title-bar" :class="{barActive:marketIndex===index}"></view>
					<text class="title-name" :class="{textActive:marketIndex===index}">{{item}}</text>
				</view>
				
				<!-- 进度 -->
				<view class="modal-mask" @tap="showSpringBox1=(showSpringBox1+1)%2;" v-show="showSpringBox1==true"></view>
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
				<view class="arrivalNavigation" v-show="showSpringBox1">
					<view class="sideNavigation">
						<template v-for="(item,index) in progress1">
							<view v-show="index!=0" class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="marketsProcess(index)" :key="index">
								<text>{{item}}</text>
							</view>
						</template>
					</view>
				</view>
				
			</view>
			
			<view class="content">
				<view class="goods-item" v-for="(item,index1) in showMarket" :key="item.id" @tap="toClassify(item.id)">
				    <view class="item-img">
						<image class="item-pic" mode="scaleToFill" :src="item.introImage"></image>
						
						<view class="seller-item">
							<image class="seller-pic" :src="item.userImage"></image>
							<text class="seller-name">{{item.userName}}</text>
						</view>
					</view>
				    <view class="item-block">
				        <view class="item-detail">
				            <text class="item-title">{{item.name}}</text>
				            <text class="item-date">下单时间 {{item.time}}</text>
				            <text class="item-payment">实收款 ￥{{item.totalPrice}}</text>
				        </view>
						<!-- 0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价 -->
						<view class="sell-item" v-if="marketIndex==0" @tap="ordersMgt1">
							<text v-if="item.status==0">未确认</text>
							<text v-if="item.status==1">未发货</text>
							<text v-if="item.status==2">确认收货</text>
							<text v-if="item.status==3">写评价</text>
							<text v-if="item.status==4">退款中...</text>
							<text v-if="item.status==5">查看评价</text>
						</view>
						<view class="sell-item" v-if="marketIndex==1" @tap="ordersMgt1">
							<text v-if="item.status==0">未确认</text>
							<text v-if="item.status==1">去发货</text>
							<text v-if="item.status==2">未确认收货</text>
							<text v-if="item.status==3">未评价</text>
							<text v-if="item.status==4">退款中...</text>
							<text v-if="item.status==5">查看评价</text>
						</view>
						<view class="sell-icon" @tap="ordersMgt2">···</view>
				    </view>
				</view>
			</view>
		</view>
		
		<!-- 拍卖————我的竞拍 -->
		<view v-show="functionIndex==1">
			<view class="title">
				<!-- 竞拍 or 拍品 -->
				<view class="title-option" v-for="(item,index) in auctionTitle" :key="index"
				@click="changeAucIndex(index)">
					<view class="title-bar" :class="{barActive:auctionIndex===index}"></view>
					<text class="title-name" :class="{textActive:auctionIndex===index}">{{item}}</text>
				</view>
				
				<!-- 进度 -->
				<view class="modal-mask" @tap="showSpringBox2=(showSpringBox2+1)%2;" v-show="showSpringBox2==true"></view>
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
				<view class="arrivalNavigation" v-show="showSpringBox2">
					<view class="sideNavigation">
						<template v-if="auctionIndex==0" v-for="(item,index) in progress2_1">
							<view v-show="index!=0" class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="auctionsBuyProcess(index)" :key="index">
								<text>{{item}}</text>
							</view>
						</template>
						<template v-if="auctionIndex==1" v-for="(item,index) in progress2_2">
							<view v-show="index!=0" class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="auctionsSellProcess(index)" :key="index">
								<text>{{item}}</text>
							</view>
						</template>
					</view>
				</view>
				
			</view>
		
			<!-- 竞拍 -->
			<view class="content" v-if="auctionIndex==0">
				<view class="goods-item" v-for="(item,index1) in showAuctionBuyer" :key="item.id" @tap="toClassify(item.id)">
				    <view class="item-img">
						<image class="item-pic" mode="scaleToFill" :src="item.introImage"></image>
						
						<view class="seller-item">
							<image class="seller-pic" :src="item.userImage"></image>
							<text class="seller-name">{{item.userName}}</text>
						</view>
					</view>
				    <view class="item-block">
				        <view class="item-detail">
				            <text class="item-title">{{item.name}}</text>
				            <text class="item-date">拍得时间 {{item.time}}</text>
				            <text class="item-payment">最终竞拍价格 ￥{{item.totalPrice}}</text>
				        </view>
						<!-- 0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价 -->
						<view class="sell-item" @tap="ordersMgt1">
							<text v-if="item.status==0">未确认</text>
							<text v-if="item.status==1">未发货</text>
							<text v-if="item.status==2">确认收货</text>
							<text v-if="item.status==3">写评价</text>
							<text v-if="item.status==4">退款中...</text>
							<text v-if="item.status==5">查看评价</text>
						</view>
						<view class="sell-icon" @tap="ordersMgt2">···</view>
				    </view>
				</view>
			</view>
			
			<!-- 拍品 -->
			<view class="content" v-if="auctionIndex==1">
				<view class="goods-item" v-for="(item,index1) in showAuctionSeller" :key="item.id" 
				@tap="toClassify(item.id)" style="height: 285rpx;">
				    <view class="item-img">
						<image class="item-pic" mode="scaleToFill" :src="item.intro_image[0]"></image>
						
					</view>
				    <view class="item-block">
				        <view class="item-detail">
				            <text class="item-title">{{item.name}}</text>
				            <text class="item-date">剩余时间: {{item.restTime}}</text>
				            <text class="item-payment"style="padding-top:0rpx; float:left;">
								当前最高价格 ￥{{item.maxBid_Recently}}</text>
				        </view>
						<!-- status : 0:未确认，1:去发货,2:查看物流,3:拍卖用户还未评价,4:退款中,5:拍卖用户已评价，6:重新上架 -->
						<template v-if="item.status===''">
							<text class="auctioning">竞拍人数 {{item.totalBidPersons}}</text>
						</template>
						<template v-else>
							<view class="sell-item" @tap="ordersMgt1">
								<text v-if="item.status===''">正在拍卖</text>
								<!-- <text v-if="item.status===0">未确认</text>
								<text v-if="item.status==1">去发货</text>
								<text v-if="item.status==2">查看物流</text>
								<text v-if="item.status==3">拍卖用户还未评价</text>
								<text v-if="item.status==4">退款中</text>
								<text v-if="item.status==5">拍卖用户已评价</text> -->
								<text>{{item.status}}</text>
							</view>
							<view class="sell-icon" @tap="ordersMgt2">···</view>
						</template>
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
				page1_1:0,
				progress1:["未确认","未发货","未收货","未评价","退款中","已评价","全部"],
				progress1_1:["未确认","未发货","未收货","未评价","退款中","已评价","全部"],
				marketBuyer:[],
				marketBuyer0:[],
				marketBuyer1:[],
				marketBuyer2:[],
				marketBuyer3:[],
				marketBuyer4:[],
				marketBuyer5:[],
				
				//市集——卖出
				page1_2:0,
				progress1_2:["未确认","未发货","未收货","未评价","退款中","已评价","全部"],
				marketSeller:[],
				marketSeller0:[],
				marketSeller1:[],
				marketSeller2:[],
				marketSeller3:[],
				marketSeller4:[],
				marketSeller5:[],
				
				showMarket:[],
				
				//拍卖——购买
				auctionTitle:["我的竞拍","我的拍品"],
				auctionIndex:0,
				page2_1:0,
				progress2_1:["未确认","未发货","未收货","未评价","退款中","已评价","全部"],
				auctionBuyer:[],
				auctionBuyer0:[],
				auctionBuyer1:[],
				auctionBuyer2:[],
				auctionBuyer3:[],
				auctionBuyer4:[],
				auctionBuyer5:[],
				showAuctionBuyer:[],
				
				//拍卖——卖出
				page2_2:0,
				progress2_2:["正在拍卖","未确认","未发货","发货中","买家未评价","退款中","买家已评价","已过期","全部"],
				auctionSeller:[],
				auctionSeller_:[],
				auctionSeller0:[],
				auctionSeller1:[],
				auctionSeller2:[],
				auctionSeller3:[],
				auctionSeller4:[],
				auctionSeller5:[],
				auctionSeller6:[],
				showAuctionSeller:[],
				
				showAuction:[],
				
				count:3,
			}
		},
		methods: {
			//切换tab选项卡的标题
			changeFunIndex(index){
				this.functionIndex=index
				console.log(index)
				if(this.functionIndex==0){
					if(this.marketIndex==0){
						if(this.page1_1==0) this.marketsBuy()
						this.showMarket=this.marketBuyer
					}
					else{
						console.log(this.marketSeller)
						if(this.page1_2==0) this.marketsSell()
						this.showMarket=this.marketSeller
					}
				}
				else{
					if(this.auctionIndex==0) {
						if(this.page2_1==0) this.auctionsBuy()
						this.showAuction=this.auctionBuyer
					}
					else{
						if(this.page2_2==0) this.auctionsSell()
						this.showAuction=this.auctionSeller
					}
				}
			},
			changeMarIndex(index){
				this.marketIndex=index
				console.log(index)
				if(this.marketIndex==0){
					if(this.page1_1==0) this.marketsBuy()
					this.showMarket=this.marketBuyer
				}
				else{
					console.log(this.marketSeller)
					if(this.page1_2==0) this.marketsSell()
					this.showMarket=this.marketSeller
				}
			},
			changeAucIndex(index){
				this.auctionIndex=index
				console.log(index)
				if(this.auctionIndex==0) {
					if(this.page2_1==0) this.auctionsBuy()
					this.showAuction=this.auctionBuyer
				}
				else{
					if(this.page2_2==0) this.auctionsSell()
					this.showAuction=this.auctionSeller
				}
			},
			marketsProcess(index){
				this.showSpringBox1=false
				if(this.marketIndex==0){
					if(index==0) this.showMarket=this.marketBuyer0
					else if(index==1) this.showMarket=this.marketBuyer1
					else if(index==2) this.showMarket=this.marketBuyer2
					else if(index==3) this.showMarket=this.marketBuyer3
					else if(index==4) this.showMarket=this.marketBuyer4
					else if(index==5) this.showMarket=this.marketBuyer5
					else if(index==6) this.showMarket=this.marketBuyer
				}
				else{
					if(index==0) this.showMarket=this.marketSeller0
					else if(index==1) this.showMarket=this.marketSeller1
					else if(index==2) this.showMarket=this.marketSeller2
					else if(index==3) this.showMarket=this.marketSeller3
					else if(index==4) this.showMarket=this.marketSeller4
					else if(index==5) this.showMarket=this.marketSeller5
					else if(index==6) this.showMarket=this.marketSeller
				}
			},
			auctionsBuyProcess(index){
				this.showSpringBox2=false
					if(index==0) this.showAuctionBuyer=this.auctionBuyer0
					else if(index==1) this.showAuctionBuyer=this.auctionBuyer1
					else if(index==2) this.showAuctionBuyer=this.auctionBuyer2
					else if(index==3) this.showAuctionBuyer=this.auctionBuyer3
					else if(index==4) this.showAuctionBuyer=this.auctionBuyer4
					else if(index==5) this.showAuctionBuyer=this.auctionBuyer5
					else if(index==6) this.showAuctionBuyer=this.auctionBuyer
				
			},
			auctionsSellProcess(index){
				this.showSpringBox2=false
					if(index==0) this.showAuctionSeller=this.auctionSeller_
					else if(index==1) this.showAuctionSeller=this.auctionSeller0
					else if(index==2) this.showAuctionSeller=this.auctionSeller1
					else if(index==3) this.showAuctionSeller=this.auctionSeller2
					else if(index==4) this.showAuctionSeller=this.auctionSeller3
					else if(index==5) this.showAuctionSeller=this.auctionSeller4
					else if(index==6) this.showAuctionSeller=this.auctionSeller5
					else if(index==7) this.showAuctionSeller=this.auctionSeller6
					else if(index==8) this.showAuctionSeller=this.auctionSeller
				
			},
			ordersMgt1(){
				console.log("Mgt1")
			},
			ordersMgt2(){
				wx.showActionSheet({
				     itemList: ["查看物流", "取消订单"],
				     success: function (res) {
				       if (!res.cancel) {
				         console.log(res.tapIndex)//这里是点击了那个按钮的下标
				       }
				     }
				})
			},
			
			//市集——我的购买
			async getMarketsBuy(k){
				let res = await this.$myRequest({
					url: "/order/buyer",
					data:{
						id:2, //test
						type:0, //0:普通商品，1:拍卖品
						status:k, //0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价
						pageNum:this.page1_1,
						pageSize:this.count,
					},
				})
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
				if(k==0) this.marketBuyer0=[...this.marketBuyer0,...res.data.data]
				else if(k==1) this.marketBuyer1=[...this.marketBuyer1,...res.data.data]
				else if(k==2) this.marketBuyer2=[...this.marketBuyer2,...res.data.data]
				else if(k==3) this.marketBuyer3=[...this.marketBuyer3,...res.data.data]
				else if(k==4) this.marketBuyer4=[...this.marketBuyer4,...res.data.data]
				else if(k==5) this.marketBuyer5=[...this.marketBuyer5,...res.data.data]
				return res;
			},
			async marketsBuy(){
				for(let k=0;k<=5;k++){
					await this.getMarketsBuy(k)
				}
				this.page1_1++;
				this.marketBuyer=[...this.marketBuyer,...this.marketBuyer0]
				this.marketBuyer=[...this.marketBuyer,...this.marketBuyer1]
				this.marketBuyer=[...this.marketBuyer,...this.marketBuyer2]
				this.marketBuyer=[...this.marketBuyer,...this.marketBuyer3]
				this.marketBuyer=[...this.marketBuyer,...this.marketBuyer4]
				this.marketBuyer=[...this.marketBuyer,...this.marketBuyer5]
				
				if(this.marketIndex==0) this.showMarket=this.marketBuyer
				else this.showMarket=this.marketSeller
				console.log(this.marketBuyer)
			},
			
			
			//市集——我的卖出
			async getMarketsSell(k){
				let res = await this.$myRequest({
					url: "/order/seller",
					data:{
						id:1, //test
						type:0, //0:普通商品，1:拍卖品
						status:k, //0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价
						pageNum:this.page1_2,
						pageSize:this.count,
					},
				})
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
				if(k==0) this.marketSeller=[...this.marketSeller0,...res.data.data]
				else if(k==1) this.marketSeller1=[...this.marketSeller1,...res.data.data]
				else if(k==2) this.marketSeller2=[...this.marketSeller2,...res.data.data]
				else if(k==3) this.marketSeller3=[...this.marketSeller3,...res.data.data]
				else if(k==4) this.marketSeller4=[...this.marketSeller4,...res.data.data]
				else if(k==5) this.marketSeller5=[...this.marketSeller5,...res.data.data]
				return res;
			},
			async marketsSell(){
				for(let k=0;k<=5;k++){
					await this.getMarketsSell(k)
				}
				this.page1_2++;
				this.marketSeller=[...this.marketSeller,...this.marketSeller0]
				this.marketSeller=[...this.marketSeller,...this.marketSeller1]
				this.marketSeller=[...this.marketSeller,...this.marketSeller2]
				this.marketSeller=[...this.marketSeller,...this.marketSeller3]
				this.marketSeller=[...this.marketSeller,...this.marketSeller4]
				this.marketSeller=[...this.marketSeller,...this.marketSeller5]
				
				if(this.marketIndex==0) this.showMarket=this.marketBuyer
				else this.showMarket=this.marketSeller
				console.log(this.marketSeller)
			},
			
			//拍卖——我的竞拍
			async getAuctionsBuy(k){
				let res = await this.$myRequest({
					url: "/order/buyer",
					data:{
						id:2, //test
						type:1, //0:普通商品，1:拍卖品
						status:k, //0:未确认，1:未发货，2:未收货，3:未评价，4:退款中，5:已评价
						pageNum:this.page2_1,
						pageSize:this.count,
					},
				})
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
				if(k==0) this.auctionBuyer0=[...this.auctionBuyer0,...res.data.data]
				else if(k==1) this.auctiontBuyer1=[...this.auctionBuyer1,...res.data.data]
				else if(k==2) this.auctionBuyer2=[...this.auctionBuyer2,...res.data.data]
				else if(k==3) this.auctionBuyer3=[...this.auctionBuyer3,...res.data.data]
				else if(k==4) this.auctionBuyer4=[...this.auctionBuyer4,...res.data.data]
				else if(k==5) this.auctionBuyer5=[...this.auctionBuyer5,...res.data.data]
				
				return res;
			},
			async auctionsBuy(){
				for(let k=0;k<=5;k++){
					await this.getAuctionsBuy(k)
				}
				this.page2_1++;
				this.auctionBuyer=[...this.auctionBuyer,...this.auctionBuyer0]
				this.auctionBuyer=[...this.auctionBuyer,...this.auctionBuyer1]
				this.auctionBuyer=[...this.auctionBuyer,...this.auctionBuyer2]
				this.auctionBuyer=[...this.auctionBuyer,...this.auctionBuyer3]
				this.auctionBuyer=[...this.auctionBuyer,...this.auctionBuyer4]
				this.auctionBuyer=[...this.auctionBuyer,...this.auctionBuyer5]
				
				this.showAuctionBuyer=this.auctionBuyer
				console.log(this.auctionBuyer)
			},
			
			//拍卖——我的拍品
			async getAuctionsSell(k){
				k=String(k)
				let res = await this.$myRequest({
					url: "/goods/getMyAuctions",
					data:{
						id:1, //test
						//attribute指定以（价格,剩余时间,进度）排序：传入 price（返回价格降序） 或 
						//restTime (返回剩余时间升序) 或 
						//0-6中的某个值(分别对应不同的进度，0:未确认，1:去发货,2:查看物流,3:拍卖用户还未评价,4:退款中,5:拍卖用户已评价，6:重新上架) 
						//不传默认id排列返回
						attribute: k,
					},
				})
				if(k==-1) this.auctionSeller_=[...this.auctionSeller_,...res.data.data]
				else if(k==0) this.auctionSeller0=[...this.auctionSeller0,...res.data.data]
				else if(k==1) this.auctionSeller1=[...this.auctionSeller1,...res.data.data]
				else if(k==2) this.auctionSeller2=[...this.auctionSeller2,...res.data.data]
				else if(k==3) this.auctionSeller3=[...this.auctionSeller3,...res.data.data]
				else if(k==4) this.auctionSeller4=[...this.auctionSeller4,...res.data.data]
				else if(k==5) this.auctionSeller5=[...this.auctionSeller5,...res.data.data]
				else if(k==6) this.auctionSeller6=[...this.auctionSeller6,...res.data.data]
				
				return res;
			},
			async auctionsSell(){
				for(let k=-1;k<=6;k++){
					await this.getAuctionsSell(k)
				}
				
				for(let i=0;i<this.auctionSeller_.length;i++){
					if('totalBidPersons' in this.auctionSeller_[i]==false) 
						this.auctionSeller_[i]['totalBidPersons']=0
				}
				this.page2_2++;
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller_]
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller0]
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller1]
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller2]
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller3]
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller4]
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller5]
				this.auctionSeller=[...this.auctionSeller,...this.auctionSeller6]
				
				this.showAuctionSeller=this.auctionSeller
				console.log(this.auctionSeller)
			},
		},
		
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(option) {
			if(option.type){
				this.functionIndex = Number(option.type)
			}
			if(this.functionIndex==0&&this.marketIndex==0) this.marketsBuy()
			else if(this.functionIndex==0&&this.marketIndex==1) this.marketsSell()
			else if(this.functionIndex==1&&this.marketIndex==0) this.auctionsBuy()
			else if(this.functionIndex==1&&this.marketIndex==1) this.auctionsSell()
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
		onUnload: function() {
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
	}
	
</script>

<style>
	@import url("./my-orders.css");
</style>
