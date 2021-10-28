<template>
	<view>
		<view class="main">
			<input type="text" v-model="goodsName" placeholder="请输入商品名称" class="goods-name" maxlength="40"/>
			<textarea type="text" v-model="goodsDescription" placeholder="请输入商品详细描述" class="goods-description" 
			maxlength="600" @input="descripInput()"/>
			<view class="length-limit">{{descripTatVal}}/{{maxTextArea}}</view>
		
			<scroll-view class="goods-pics" scroll-x="true" @scroll>
			    <view class="pic-block" v-for="(item,index) in goodsPics" :key="index"
				 @tap="toShowPic()">
			    </view>
				
			    <view class="pic-block" @tap="toAddPic()">
					<text class="text-addpic">+</text>
			    </view>
			</scroll-view>
			
			<view class="goods-detailInfo">
				<view class="detailInfo-block" @tap="editPrice()">
					<image class="detailInfo-icon"></image>
					<text class="detailInfo-text" v-if="price_text==''">编辑单价和数量</text>
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
				
				<regionPicker @change="chooseCity">
					<view class="detailInfo-block">
						<image class="detailInfo-icon"></image>
						<text class="detailInfo-text" v-if="deliverCity==''">选择发货城市</text>
						<text class="detailInfo-text" v-else>{{deliverCity}}</text>
					</view>
				</regionPicker>
			</view>
		</view>
		<!-- 编辑单价和数量 -->
		<view v-if="showEditPrice==true">
			<view class="modal-mask" @tap="showEditPrice=(showEditPrice+1)%2;"></view>
			<view class="edit-price">
				<view class="edit-price-block">
					<text>单价</text>
					<input type="digit" v-model="sell_price" placeholder=""class="priceInput-text"/>
					<text>元</text>
				</view>
				<view class="edit-price-block">
					<text>数量</text>
					<input type="number" v-model="sell_num" placeholder="" class="priceInput-text"/>
					<text>个</text>
				</view>
				<view class="edit-price-block">
					<text>邮费</text>
					<input type="digit" v-model="sell_postage" placeholder=""
					 class="priceInput-text" @tap="editPostage"/>
					<text>元</text>
					<view style="display: inline-block; margin-left: 20rpx;">
						<radio-group name="postage" @change="radioChange">
							<label v-for="(item, index) in postage_text" :key="index">
								<radio :value="item.value" :checked="index === postage_current" />
								<text>{{item.name}}</text>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="bottom-block" style="z-index: 91;" @tap="confirmPrice()">确认</view>
		</view>
		<!-- 添加标签 -->
		<!-- <view v-if="showAddTags==true">
			<view class="modal-mask" @tap="showAddTags=(showAddTags+1)%2;"></view>
		</view> -->
		<!-- 选择发货物城市 -->
		<!-- <view v-if="showChooseCity==true">
			<view class="modal-mask" @tap="showChooseCity=(showChooseCity+1)%2;"></view>
		</view> -->
		<view class="bottom-block" @tap="releaseGoods()">发布</view>
	</view>
</template>

<script>
import regionPicker from "../../components/region-picker/region-pickerSC.vue"
	export default {
		data() {
			return {
				goodsName:'',
				goodsDescription:'',
				descripTatVal: 0,
				maxTextArea:600,
				goodsPics:[],
				
				showEditPrice:false,
				sell_price: '',
				sell_num: '',
				sell_postage: '',
				postage_text:[{
                    value: 'postage1',
                    name: '包邮',
                },
                {
                    value: 'postage2',
                    name: '按距离估算',
                }],
				postage_current:-1,
				price_text:'',
				
				tags:[],
				
				deliverCity:'',
				
				radio_check:true,
			}
		},
		methods: {
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
				console.log(res2)
			},
			editPrice(){
				this.showEditPrice=true
			},
			editPostage(){
				this.postage_current = -1
			},
			radioChange(evt){
				this.sell_postage=''
				for (let i = 0; i < this.postage_text.length; i++) {
					if (this.postage_text[i].value === evt.detail.value) {
					    this.postage_current = i;
					    break;
					}
				}
			},
			confirmPrice(){
				console.log(this.sell_price)
				console.log(this.sell_num)
				console.log(this.postage_current)
				if(this.sell_price===''||this.sell_num===''||this.postage_current===''){
					uni.showToast({
						title:"请完成信息填写",
						icon:'none'
					})
					return;
				}
				this.price_text = "单价 " + this.sell_price + "元/件  数量 " + this.sell_num + "件  "
				if(this.postage_current===-1){ //邮费
					this.price_text += "邮费 " + this.sell_postage + "元"
				}
				else if(this.postage_current===0){ //包邮
					this.sell_postage = 0
					this.price_text += "包邮"
				}
				else{ //按距离估算
					this.sell_postage = -1
					this.price_text += "邮费 按距离估算"
				}
				this.showEditPrice=false
			},
			addTags(){
				console.log("dd")
				uni.navigateTo({
					url: "../../pages/auctions_goods-tagsadd/auctions_goods-tagsadd"
				})
			},
			chooseCity(e){//{code:{s,c,z},value:{s,c,z},data:{z_id,z_name,z_code}}
				console.log(e)
				this.deliverCity=e.detail.value[0]+e.detail.value[1]
			},
			releaseGoods(){
				console.log(this.goodsName)
				console.log(this.goodsDescription)
				console.log(this.goodsPics)
				console.log(this.sell_price)
				console.log(this.sell_num)
				console.log(this.sell_postage)
				console.log(this.tags)
				console.log(this.deliverCity)
				if(this.goodsName==''){
					uni.showToast({
						title:"请填写商品名称",
						icon:'none'
					})
				}
				else if(this.goodsDescription==''){
					uni.showToast({
						title:"请填写商品详细描述",
						icon:'none'
					})
				}
				else if(this.goodsPics.length==0){
					uni.showToast({
						title:"请上传商品图片",
						icon:'none'
					})
				}
				else if(this.sell_price==''){
					uni.showToast({
						title:"请填写商品单价和数量",
						icon:'none'
					})
				}
				else if(this.tags==''){
					uni.showToast({
						title:"请添加商品标签",
						icon:'none'
					})
				}
				else if(this.deliverCity==''){
					uni.showToast({
						title:"请选择发货城市",
						icon:'none'
					})
				}
			},
		},
		components:{
			regionPicker,
		},
	}
</script>

<style>
	@import url("./goods-release.css");
</style>
