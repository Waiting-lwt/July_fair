<template>
	<view class="main">
		<view class="addAddress" @tap="selectOrdersAddress()">
			<text class="addAddress-text">确定选择</text>
		</view>
		<view class="myAddress">
			<text class="defaultAddress-text">默认地址</text>
			
			<view class="addressInfo" v-for="(item,index) in address" :key="index">
				<view class="selected-block" @tap="selectedIndex = index">
					<text v-if="selectedIndex === index"
					style="font-size: 24rpx;font-weight: bolder;color: #21277B; vertical-align: 300%;">
						√
					</text>
				</view>
				<view class="addressInfo-block">
					<view class="addressInfo-block1">
						<text class="addressInfo-text">姓名</text>
						<text class="addressInfo-text">电话</text>
						<text class="addressInfo-text">地址</text>
					</view>
					
					<view  v-if="item.editable==0">
					<view class="addressInfo-block2" v-if="item.editable==0">
						<text class="addressInfo-text">{{item.tname||"name"}}</text>
						<text class="addressInfo-text">{{item.phone||"phone"}}</text>
						<text class="addressInfo-text">{{item.location||"address"}}</text>
					</view>
					</view>
					<!-- 可编辑 or 添加新地址 -->
					<view v-if="item.editable==1">
					<view class="addressInfo-block2">
						<input type="text" v-model="item.tname" placeholder="name" class="addressInput-text" maxlength="20"/>
						<input type="number" v-model="item.phone" placeholder="phone" class="addressInput-text" maxlength="11"/>
						<input type="text" v-model="item.location" placeholder="address" class="addressInput-text"
						@tap="selectAddress(index)"/>
					</view>
					</view>
				</view>
				<text class="addressAlter" v-if="item.editable==0" @tap="alterAddress(index)">
					重新编辑
				</text>
				<view class="addressAdd" v-if="item.editable==1">
					<text @tap="delAlter(index)">取消</text>
					<text @tap="enterAlter(index)">确认修改</text>
				</view>
			</view>
			
			<!-- 添加新地址 -->
			<view class="addressInfo" v-if="addAddress==true">
				<view class="addressInfo-block">
					<view class="addressInfo-block1">
						<text class="addressInfo-text white-space">姓名</text>
						<text class="addressInfo-text white-space">电话</text>
						<text class="addressInfo-text white-space">地址</text>
					</view>
					<view class="addressInfo-block2">
						<input type="text" v-model="addAddr[0]" placeholder="name" class="addressInput-text" maxlength="20"/>
						<input type="number" v-model="addAddr[1]" placeholder="telephone" class="addressInput-text" maxlength="11"/>
						<view @tap="selectAddress(-1)" disabled>
							<input type="text" v-model="addAddr[2]" placeholder="address" class="addressInput-text" disabled/>
						</view>
					</view>
				</view>
				<view class="addressAdd">
					<text @tap="delAdd">取消</text>
					<text @tap="enterAdd">确认新增</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:1,
				//地址列表（editable:0:不可编辑，1:可编辑）
				address:[],
				alterAddressTag:false,
				editAddressCopy:['','',''],
				
				addAddress:false,
				addAddr:['','',''],
				selectedIndex: -1,
			}
		},
		
		meta: {
			keepAlive: true // 需要被缓存
		},
		methods: {
			//获取用户地址
			async getAddress(){
				let res = await this.$myRequest({
					url: "/address/getByUserId",
					data:{
						userId:this.userid, //test
					},
				})
				this.address=res.data.data
				for(let i=0;i<res.data.data.length;i++){
					this.address[i].editable=0
				}
				console.log(this.address)
			},
			//确认选择地址
			selectOrdersAddress(){
				if(this.selectedIndex!=-1){
					let pages = getCurrentPages();
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面
					
					prevPage.$vm.address.tname = this.address[this.selectedIndex].tname
					prevPage.$vm.address.phone = this.address[this.selectedIndex].phone
					prevPage.$vm.address.location = this.address[this.selectedIndex].location
					uni.navigateBack({})
				}
			},
			//选择地址
			selectAddress(index){
				uni.navigateTo({
					url: "../../pages/my-selectaddress/my-selectaddress?index="+index,
				})
			},
			//重新编辑
			alterAddress(index){
				if(this.alterAddressTag==true){
					uni.showToast({
						title:"不能同时编辑多个地址",
						icon:"none"
					})
					return
				}
				this.alterAddressTag=true
				this.editAddressCopy[0]=this.address[index].tname
				this.editAddressCopy[1]=this.address[index].phone
				this.editAddressCopy[2]=this.address[index].location
				this.$set(this.address[index],"editable",1)
				//虽然这样写好笨，但我不知道为啥不能更新视图555，跪求一位大佬改改
				this.$forceUpdate()
			},
			//取消修改
			delAlter(index){
				this.alterAddressTag=false
				this.$set(this.address[index],'tname',this.editAddressCopy[0])
				this.$set(this.address[index],'phone',this.editAddressCopy[1])
				this.$set(this.address[index],'location',this.editAddressCopy[2])
				this.$set(this.address[index],'editable',0)
				//虽然这样写好笨，但我不知道为啥不能更新视图555，跪求一位大佬改改
				this.$forceUpdate()
			},
			//确认修改
			async enterAlter(index){
				if(this.address[index].tname==''){
					uni.showToast({
						title:"请收货人名称",
						icon:'none'
					})
					return
				}
				else if(this.address[index].location==''){
					uni.showToast({
						title:"请收货人地址",
						icon:'none'
					})
					return
				}
				else if(this.address[index].phone==0){
					uni.showToast({
						title:"请收货人电话",
						icon:'none'
					})
					return
				}
				let res = await this.$myRequest({
					method:"PUT",
					url: "/address/update?id="+this.address[index].id
					+"&tname="+this.address[index].tname
					+"&location="+this.address[index].location
					+"&phone="+this.address[index].phone,
				})
				console.log(res)
				if(res.data.data=="OK"){
					uni.showModal({
						title:"提示",
						content:"已经修改地址"
					})
				}
				this.$set(this.address[index],'editable',0)
				//虽然这样写好笨，但我不知道为啥不能更新视图555，跪求一位大佬改改
				this.$forceUpdate()
			},
			//取消新增
			delAdd(){
				this.addAddress=false
				this.addAddr=['','','']
			},
			//确认新增地址
			async enterAdd(){
				if(this.addAddr[0]==''){
					uni.showToast({
						title:"请收货人名称",
						icon:'none'
					})
					return
				}
				else if(this.addAddr[2]==''){
					uni.showToast({
						title:"请收货人地址",
						icon:'none'
					})
					return
				}
				else if(this.addAddr[1]==''){
					uni.showToast({
						title:"请收货人电话",
						icon:'none'
					})
					return
				}
				console.log(this.addAddr)
				let res = await this.$myRequest({
					method:"POST",
					url: "/address/add",
					url: "/address/add?userId="+this.userid
					+"&tname="+this.addAddr[0]
					+"&phone="+this.addAddr[1]
					+"&location="+this.addAddr[2],
					// data:{
					// 	userId:this.userid,
					// 	tname:this.addAddr[0],
					// 	location:this.addAddr[1],
					// 	phone:this.addAddr[2],
					// },
				})
				if(res.data=="OK"){
					uni.showModal({
						title:"提示",
						content:"已经添加新地址"
					})
				}
				this.delAdd()
				this.getAddress()
			}
		},
		onLoad(option){
			console.log('load')
			if(option.userid){
				this.userid=option.userid
			}
			else if(option.areaCode){
				// url:areaCode="+this.areaCode+"&areaName_text="+this.areaName_text+"&detailAddress="+this.detailAddress,
				console.log(option)
				this.addAddr[2]=option.areaName_text+option.detailAddress
			}
			this.getAddress()
		},
		onShow(option){
			console.log('show')
			if(option){
				console.log(option)
			}
			//虽然这样写好笨，但我也不知道为啥真的刷新不了555，跪求一位大佬改改
			this.$forceUpdate()
		}
	}
</script>

<style>
	@import url("./orders-select-address.css");
</style>
