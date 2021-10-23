<template>
	<view class="main">
		<view class="addAddress" @tap="addAddress=true">
			<text class="addAddress-text">+ 新增收货地址</text>
		</view>
		<view class="myAddress">
			<text class="defaultAddress-text">默认地址</text>
			
			<view class="addressInfo" v-for="(item,index) in address" :key="index">
				<view class="addressInfo-block">
					<view class="addressInfo-block1">
						<text class="addressInfo-text">姓名</text>
						<text class="addressInfo-text">电话</text>
						<text class="addressInfo-text">地址</text>
					</view>
					<view class="addressInfo-block2" v-show="item.editable==0">
						<text class="addressInfo-text">{{item.tname||"name"}}</text>
						<text class="addressInfo-text">{{item.phone||"phone"}}</text>
						<text class="addressInfo-text">{{item.location||"address"}}</text>
					</view>
					<!-- 可编辑 or 添加新地址 -->
					<view class="addressInfo-block2" v-show="item.editable==1">
						<view class="addressInput-block">
							<input v-model="item.tname" placeholder="name" class="addressInput-text"/>
						</view>
						<view class="addressInput-block">
							<input v-model="item.phone" placeholder="phone" class="addressInput-text"/>
						</view>
						<view class="addressInput-block" @tap="selectAddress(index)" disabled>
							<input v-model="item.location" placeholder="address" class="addressInput-text"/>
						</view>
					</view>
				</view>
				<text class="addressAlter" v-show="item.editable==0" @tap="alterAddress(index)">
					重新编辑
				</text>
				<view class="addressAdd" v-show="item.editable==1">
					<text @tap="delAlter(index)">取消</text>
					<text @tap="enterAlter(index)">确认修改</text>
				</view>
			</view>
			
			<!-- 添加新地址 -->
			<view class="addressInfo" v-show="addAddress==true">
				<view class="addressInfo-block">
					<view class="addressInfo-block1">
						<text class="addressInfo-text white-space">姓名</text>
						<text class="addressInfo-text white-space">电话</text>
						<text class="addressInfo-text white-space">地址</text>
					</view>
					<view class="addressInfo-block2">
						<view class="addressInput-block">
							<input v-model="addAddr[0]" placeholder="name" class="addressInput-text"/>
						</view>
						<view class="addressInput-block">
							<input v-model="addAddr[1]" placeholder="telephone" class="addressInput-text"/>
						</view>
						<view class="addressInput-block" @tap="selectAddress(-1)" disabled>
							<input v-model="addAddr[2]" placeholder="address" class="addressInput-text" disabled/>
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
			//选择地址
			selectAddress(index){
				uni.navigateTo({
					url: "../../pages/my-selectaddress/my-selectaddress?index="+index,
				})
			},
			//重新编辑
			alterAddress(index){
				if(this.alterAddressTag==true){
					uni.showModal({
						title:"提示",
						content:"不能同时编辑多个地址"
					})
					return
				}
				this.alterAddressTag=true
				this.editAddressCopy[0]=this.address[index].tname
				this.editAddressCopy[1]=this.address[index].phone
				this.editAddressCopy[2]=this.address[index].location
				this.$set(this.address[index],"editable",1)
				//虽然这样写好笨，但我也不知道为啥真的刷新不了555，跪求一位大佬改改
				this.$forceUpdate()
			},
			//取消修改
			delAlter(index){
				this.alterAddressTag=false
				this.$set(this.address[index],'tname',this.editAddressCopy[0])
				this.$set(this.address[index],'phone',this.editAddressCopy[1])
				this.$set(this.address[index],'location',this.editAddressCopy[2])
				this.$set(this.address[index],'editable',0)
				//虽然这样写好笨，但我也不知道为啥真的刷新不了555，跪求一位大佬改改
				this.$forceUpdate()
			},
			//确认修改
			async enterAlter(index){
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
				//虽然这样写好笨，但我也不知道为啥真的刷新不了555，跪求一位大佬改改
				this.$forceUpdate()
			},
			//取消新增
			delAdd(){
				this.addAddress=false
				this.addAddr=['','','']
			},
			//确认新增地址
			async enterAdd(){
				//	/address/add?userId=xxx&tname=xxx&location=xxx&phone=xxx
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
	@import url("./my-address.css");
</style>
