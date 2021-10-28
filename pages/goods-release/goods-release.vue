<template>
	<view>
		<view class="main">
			<input type="text" v-model="goodsName" placeholder="请输入商品名称" class="goods-name" />
			<textarea type="text" v-model="goodsDescription" placeholder="请输入商品详细描述" class="goods-description" 
			maxlength="10" @input="descripInput()"/>
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
					<text class="detailInfo-text">编辑单价和数量</text>
				</view>
				<view class="detailInfo-block" @tap="addTags()">
					<image class="detailInfo-icon"></image>
					<text class="detailInfo-text">添加标签</text>
				</view>
				
				<regionPicker @change="chooseCity">
					<view class="detailInfo-block">
						<image class="detailInfo-icon"></image>
						<text class="detailInfo-text" v-if="deliverCity==''">选择发货物城市</text>
						<text class="detailInfo-text" else>{{deliverCity}}</text>
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
					<input type="number" v-model="sell_price" placeholder="price"class="priceInput-text"/>
					<text>元</text>
				</view>
				<view class="edit-price-block">
					<text>数量</text>
					<input type="number" v-model="sell_num" placeholder="number" class="priceInput-text"/>
					<text>个</text>
				</view>
				<view class="edit-price-block">
					<text>邮费</text>
					<input type="number" v-model="sell_postage" placeholder="postage"
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
		<view v-if="showAddTags==true">
			<view class="modal-mask" @tap="showAddTags=(showAddTags+1)%2;"></view>
		</view>
		<!-- 选择发货物城市 -->
		<!-- <view v-if="showChooseCity==true">
			<view class="modal-mask" @tap="showChooseCity=(showChooseCity+1)%2;"></view>
		</view> -->
		<view class="bottom-block" @tap="releaseGoods()">发布</view>
	</view>
</template>

<script>
import regionPicker from "../../components/region-picker/region-picker.vue"
	export default {
		data() {
			return {
				goodsName:"",
				goodsDescription:"",
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
				
				showAddTags:false,
				
				deliverCity:'',
				
				radio_check:true,
			}
		},
		methods: {
			descripInput(){
				this.descripTatVal = this.goodsDescription.length;
				console.log(this.goodsDescription.length)
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
				this.sell_postage="/"
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
					uni.showModal({
						content:"未完成信息填写"
					})
				}
				if(this.postage_current===-1){ //邮费
					console.log(this.sell_postage)
				}
				else if(this.postage_current===0){ //包邮
					
				}
				else{ //按距离估算
					
				}
			},
			addTags(){
				this.showAddTags=true
			},
			chooseCity(e){//{code:{s,c,z},value:{s,c,z},data:{z_id,z_name,z_code}}
				console.log(e)
				this.deliverCity=e.detail.value[0]+e.detail.value[1]
			},
			releaseGoods(){
				
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
