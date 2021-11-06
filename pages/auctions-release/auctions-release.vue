<template>
	<view>
		<view class="main">
			<input type="text" v-model="goodsName" placeholder="请输入拍卖品名称" class="goods-name" maxlength="40"/>
			<textarea type="text" v-model="goodsDescription" placeholder="请输入拍卖品详细描述" class="goods-description" 
			maxlength="600" @input="descripInput()"/>
			<view class="length-limit">{{descripTatVal}}/{{maxTextArea}}</view>
		
			<scroll-view class="goods-pics" scroll-x="true" @scroll>
				<view class="pic-block"v-for="(item,index) in goodsPics" :key="index">
					<img class="pic-item" @tap="toShowPic()" :src="item">
				</view>
			    <view class="pic-block" @tap="toAddPic()">
					<text class="text-addpic">+</text>
			    </view>
			</scroll-view>
			
			<view class="goods-detailInfo">
				<view class="detailInfo-block" @tap="editPrice()">
					<image class="detailInfo-icon"></image>
					<text class="detailInfo-text" v-if="price_text==''">编辑底价和邮费</text>
					<text class="detailInfo-text" v-else>{{price_text}}</text>
				</view>
				<view class="detailInfo-block" @tap="addTags()">
					<image class="detailInfo-icon"></image>
					<text class="detailInfo-text" v-if="tags.length==0">添加标签</text>
					<view class="selfTags-block" v-else>
						<view class="selfTags-box" v-for="(item,index) in tags">
							{{item}}
						</view>
					</view>
				</view>
				<view class="detailInfo-block" @tap="editEndTime()">
					<image class="detailInfo-icon"></image>
					<text class="detailInfo-text" v-if="endTime.length==0">编辑截至时间</text>
					<text class="detailInfo-text" v-else>{{endTime_text}}</text>
				</view>
				<regionPicker @change="chooseCity">
					<view class="detailInfo-block">
						<image class="detailInfo-icon"></image>
						<text class="detailInfo-text" v-if="deliverCity==''">选择发货城市</text>
						<text class="detailInfo-text" v-else>{{deliverCity}}</text>
					</view>
				</regionPicker>
			</view>
		</view>
		
		<!-- 编辑底价和邮费 -->
		<view v-if="showEditPrice==true">
			<view class="modal-mask" @tap="showEditPrice=(showEditPrice+1)%2;"></view>
			<view class="edit-price">
				<view class="edit-price-block">
					<text>底价</text>
					<input type="digit" v-model="sell_price" placeholder=""class="priceInput-text"/>
					<text>元</text>
				</view>
				<view class="edit-price-block">
					<text>邮费</text>
					<input type="digit" v-model="sell_postage" placeholder=""
					 class="priceInput-text" @tap="editPostage"/>
					<text>元</text>
					<view style="display: inline-block; margin-left: 20rpx;">
						<!-- <radio-group name="postage" @change="radioChange">
							<label v-for="(item, index) in postage_text" :key="index">
								<radio :value="item.value" :checked="postage_current != -1"/>
								<text>{{item.name}}</text>
							</label>
						</radio-group> -->
						<radio class="free" :checked="postage_free == 1" @click="radioChange1"/>
							<label>
								<text>包邮</text>
							</label>
						</radio>
						<radio class="fast" :checked="postage_fast === 1" @click="radioChange2" style="margin-left: 20rpx;"/>
							<label>
								<text>急速发货</text>
							</label>
						</radio>
					</view>
				</view>
			</view>
			<view class="bottom-block" style="z-index: 91;" @tap="confirmPrice()">确认</view>
		</view>
		<!-- 添加标签 -->
		<!-- <view v-if="showAddTags==true">
			<view class="modal-mask" @tap="showAddTags=(showAddTags+1)%2;"></view>
		</view> -->
		<!-- 编辑截止时间 -->
		<view v-if="showEditTime==true">
			<view class="modal-mask" @tap="showEditTime=(showEditTime+1)%2;"></view>
			<view class="edit-time">
				<view class="edit-time-block">
					<!-- <input type="digit" v-model="endTime_year" placeholder="" class="timeInput-text"/>
					<text>年</text>
					<input type="digit" v-model="endTime_month" placeholder="" class="timeInput-text"/>
					<text>月</text>
					<input type="digit" v-model="endTime_day" placeholder="" class="timeInput-text"/>
					<text>日</text> -->
					<picker mode="date" :value="endTime_time" @change="bindDateChange">
						<text>编辑日期：</text>
						<input type="text" v-model="endTime_year" placeholder="" class="timeInput-text" disabled ></input>
						<text>年</text>
						<input type="text" v-model="endTime_month" placeholder="" class="timeInput-text" disabled ></input>
						<text>月</text>
						<input type="text" v-model="endTime_day" placeholder="" class="timeInput-text" disabled ></input>
						<text>日</text>
					</picker>
				</view>
				<!-- <picker mode="multiSelector" :value="dateTime" @change="changeDateTime"  @columnchange="changeDateTimeColumn" :range="dateTimeArray">
					<view>{{timeStr}}</view>
				</picker> -->
				<view class="edit-time-block">
					<!-- <input type="digit" v-model="endTime" placeholder="" class="timeInput-text"/>
					<text>时</text>
					<input type="digit" v-model="endTime" placeholder="" class="timeInput-text"/>
					<text>分</text>
					<input type="digit" v-model="endTime" placeholder="" class="timeInput-text"/>
					<text>秒</text> -->
					<picker mode="time" :value="endTime_time" @change="bindTimeChange">
						<text>编辑时间：</text>
						<input type="text" v-model="endTime_hour" placeholder="" class="timeInput-text" disabled ></input>
						<text>时</text>
						<input type="text" v-model="endTime_minu" placeholder="" class="timeInput-text" disabled ></input>
						<text>分</text>
					</picker>
				</view>
			</view>
				<view class="bottom-block" style="z-index: 91;" @tap="confirmTime()">确认</view>
				
		</view>
		<!-- 选择发货物城市 -->
		<!-- <view v-if="showChooseCity==true">
			<view class="modal-mask" @tap="showChooseCity=(showChooseCity+1)%2;"></view>
		</view> -->
		
		<view class="bottom-block" @tap="releaseGoods()">发布</view>
	</view>
</template>

<script>
import regionPicker from "../../components/region-picker/region-pickerSC.vue"
// const { dateTimePicker,getMonthDay,generateTimeStr} = require('../../utils/dateTimePicker.js');
		
	export default {
		data() {
			return {
				userid:-1,
				goodsName:'',
				goodsDescription:'',
				descripTatVal: 0,
				maxTextArea:600,
				goodsPics:[],
				
				showEditPrice:false,
				sell_price: '',
				sell_postage: '',
				
				postage_free:0,
				postage_fast:0,
				price_text:'',
				
				tags:[],
				
				showEditTime:false,
				endTime:"",
				endTime_text:'',
				endTime_year:'',
				endTime_month:'',
				endTime_day:'',
				endTime_hour:'',
				endTime_minu:'',
				endTime_sec:'00',
				endTime_date:'',
				endTime_time:'',
				
				// dateTime: null,
				// dateTimeArray: null,
				// startYear: 2000,
				// timeStr:'',
				
				deliverCity:'',
				
				radio_check:true,
			}
		},
		onShow() {
			if(this.userid==-1){
				// uni.showModal({
				// 	content:"用户未登录,\n请前往个人界面进行登录。",
				// 	success(res) {
				// 		if(res.confirm){
				// 			uni.navigateTo({
				// 				url:"../my/my"
				// 			})
				// 		}
				// 		else{
				// 			uni.navigateTo({
				// 				url:"../index/index"
				// 			})
				// 		}
				// 	}
				// })
				this.userid=1
			}
		},
		methods: {
			bindTimeChange: function(e) {
						this.time = e.detail.value;
					},
			descripInput(){
				this.descripTatVal = this.goodsDescription.length;
				if(this.descripTatVal == this.maxTextArea){
					uni.showToast({
						icon: 'none',
						title: '最多只能输入'+this.maxTextArea+'个字',
					});
				}
			},
			async toAddPic(){
				console.log("uploading pics");
				var self = this;
				let res1 = await this.$chooseImage({})
				console.log(res1.tempFilePaths)
				let res2 = await this.$uploadFile({
					url: "/goods/uploadImage",
					tempFilePaths: res1.tempFilePaths
				})
				var obj = JSON.parse(res2.data);
				if(obj.status==0){
					console.log(obj.data[0])
					this.goodsPics.push(obj.data[0])
					uni.showToast({
						icon:"none",
						title:"上传成功"
					})
				}
				else{
					uni.showModal({
						title:"上传失败",
						content: 'error:'+obj.message,
					});
				}
			},
			editPrice(){
				this.showEditPrice=true
			},
			editPostage(){
				this.postage_free = 0
			},
			radioChange1(evt){
				this.sell_postage=''
				this.postage_free = 1
			},
			radioChange2(evt){
				this.postage_fast = (this.postage_fast + 1)%2
			},
			confirmPrice(){
				console.log(this.sell_price)
				if(this.sell_price===''||this.sell_num===''||(this.sell_postage===''&&this.postage_free===0)){
					uni.showToast({
						title:"请完成信息填写",
						icon:'none'
					})
					return;
				}
				this.price_text = "底价 " + this.sell_price + "元"
				if(this.sell_postage!=''){ //邮费
					this.price_text += " 邮费 " + this.sell_postage + "元"
				}
				else if(this.postage_free===1){ //包邮
					this.price_text += "包邮"
				}
				if(this.postage_fast===1){ //急速发货
					this.price_text += "急速发货"
				}
				this.showEditPrice=false
			},
			
			addTags(){
				uni.navigateTo({
					url: "../../pages/auctions_goods-tagsadd/auctions_goods-tagsadd"
				})
			},
			
			editEndTime(){
				this.showEditTime=true
				// this.initTime()
			},
			
	// 		initTime(){
	// 			let date = new Date();
	// 			let endYear = date.getFullYear();
	// 			// 获取完整的年月日 时分秒，以及默认显示的数组
	// 			let obj = dateTimePicker(this.startYear, endYear);
	// 			// 精确到分的处理，将数组的秒去掉
	// 			// let lastArray = obj.dateTimeArray.pop();
	// 			// let lastTime = obj.dateTime.pop();
 
	// 			this.dateTimeArray=obj.dateTimeArray
	// 			this.dateTime=obj.dateTime
	// 		},
	// 		changeDateTime(e) {
	// 		    this.dateTime = e.detail.value;
 //                this.timeStr= generateTimeStr(this.dateTimeArray,this.dateTime);
 //                //ios时间不能用'-'解析成时间戳
	// 			console.log(tihs.dateTime)
	// 		 },
 //            /*年,月切换时重新更新计算*/
	// 		changeDateTimeColumn(e) {
	// 			//let {id} = e.target;
	// 			let {column,value} = e.detail;
	// 			if(column==0 || column==1){
 //                    //直接修改数组下标视图不更新,用深拷贝之后替换数组
	// 				let dateTime = JSON.parse(JSON.stringify(this.dateTime));
 //                    let dateTimeArray = JSON.parse(JSON.stringify(this.dateTimeArray));
	// 				dateTime[column] = value;
	// 				dateTimeArray[2] = getMonthDay(dateTimeArray[0][dateTime[0]], dateTimeArray[1][dateTime[1]]);
 //                    this.dateTime = dateTime;
 //                    this.dateTimeArray = dateTimeArray;
	// 			}
	// 		},
			bindDateChange: function(e) {
				this.endTime_date = e.detail.value
				console.log(e)
				this.endTime_year = e.detail.value.toString().substr(0,4)
				this.endTime_month = e.detail.value.toString().substr(5,2)
				this.endTime_day = e.detail.value.toString().substr(8,2)
			},
			bindTimeChange: function(e) {
				this.endTime_time = e.detail.value
				console.log(e)
				this.endTime_hour = e.detail.value.toString().substr(0,2)
				this.endTime_minu = e.detail.value.toString().substr(3,2)
			},
			confirmTime(){
				// yyyy-MM-dd HH:mm:ss
				if(this.endTime_time===''||this.endTime_date==''){
					uni.showToast({
						title:"请完成信息填写",
						icon:'none'
					})
					return;
				}
				this.endTime_text = this.endTime_date +' '+ this.endTime_time
				this.endTime = new Date(this.endTime_text).getTime().toString().substr(0,10)
				console.log(this.endTime)
				this.showEditTime = false
			},
			
			chooseCity(e){//{code:{s,c,z},value:{s,c,z},data:{z_id,z_name,z_code}}
				console.log(e)
				this.deliverCity=e.detail.value[0]+e.detail.value[1]
			},
			async release(){
				let startTime=new Date().getTime()
				startTime = startTime.toString().substring(0, 10)
				console.log(startTime)
				let support = 0 //0:不支持,1:支持包邮,2:支持极速发货,3:支持包邮和极速发货
				if(this.postage_free===1){
					this.sell_postage=0
					if(this.postage_fast===1) support = 3
					else support = 1
				}
				else{
					if(this.postage_fast===1) support = 2
				}
				let res = await this.$myRequest({
					url: "/goods/add",
					method:  "POST",
					
					data:{
						userId: this.userid,
						city: this.deliverCity,
						endTime: this.endTime,
						heat: 0,
						introImage: this.goodsPics,
						introduction: this.goodsDescription,
						inventory: 1,
						name: this.goodsName,
						postage: this.sell_postage,
						price: this.sell_price,
						startTime: startTime,
						support: support,
						tags: this.tags,
						type: 1,
					},
				})
				if(res.data.status==0){
					console.log(res.data)
					uni.showModal({
						content:"发布成功",
						confirmText:"查看我的卖出",
						cancelText:"确定",
						success(res){
						if(res.confirm){ //查看我的拍品
							console.log("查看我的拍品")
							//type 市集：0，拍卖：1
							uni.navigateTo({
								url: "../../pages/my-orders/my-orders?type=" + 1 + "&userid=" + this.userid
							})
						}
						else{ //确定
							console.log("确定")
							uni.navigateBack({})
						}
						}
					})
				}
				else{
					uni.showModal({
						content:"发布失败",
					})
				}
			},
			releaseGoods(){
				console.log(this.goodsName)
				console.log(this.goodsDescription)
				console.log(this.goodsPics)
				console.log(this.sell_price)
				console.log(this.sell_postage)
				console.log(this.tags)
				console.log(this.endTime)
				console.log(this.deliverCity)
				if(this.goodsName==''){
					uni.showToast({
						title:"请填写拍卖品名称",
						icon:'none'
					})
					return
				}
				if(this.goodsDescription==''){
					uni.showToast({
						title:"请填写商品详细描述",
						icon:'none'
					})
					return
				}
				if(this.goodsPics.length==0){
					uni.showToast({
						title:"请上传商品图片",
						icon:'none'
					})
					return
				}
				if(this.sell_price==''){
					uni.showToast({
						title:"请填写商品单价和数量",
						icon:'none'
					})
					return
				}
				if(this.tags==''){
					uni.showToast({
						title:"请添加商品标签",
						icon:'none'
					})
					return
				}
				if(this.deliverCity==''){
					uni.showToast({
						title:"请选择发货城市",
						icon:'none'
					})
				}
				if(this.endTime==''){
					uni.showToast({
						title:"请编辑截止时间",
						icon:'none'
					})
				}
				let self = this
				uni.showModal({
					content:"确定要发布吗？",
					success(res) {
					if(res.confirm){ //发布
						console.log("确定")
						self.release();
					}
					else{ //不发布
						console.log("取消")
					}
					}
				})
			},
		},
		components:{
			regionPicker,
		},
	}
</script>

<style>
	@import url("./auctions-release.css");
</style>
