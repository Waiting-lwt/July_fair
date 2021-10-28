<template>
	<view>
		<view class="addressInfo-block">
			<view class="addressInfo-block1">
				<text class="addressInfo-text white-space">选择地区</text>
				<text class="addressInfo-text white-space">详细地址</text>
			</view>
			<view class="addressInfo-block2">
				<regionPicker @change="changeArea">
						<input type="text" v-model="areaName_text" placeholder="area" class="addressInput-text" disabled />
				</regionPicker>
				<input type="text" v-model="detailAddress" placeholder="address" class="addressInput-text"/>
			</view>
		</view>
		
		<view class="selectOk" @tap="confirm">
			<text class="selectOk-text">确定</text>
		</view>
		
		<view class="modal-mask" v-if="showSelectArea==true" @tap="showSelectArea=false"></view>
		<view class="selectArea" v-if="showSelectArea==true">
			<view class="selectArea-title">请选择所在地区</view>
			<view class="area-block">
				
				<!-- <view :class="'person-main ' + (isDayTime ? 'isDay':'')"> -->
				<view :class="'area-block-item '+(selectAreaProcess>=1?'area-block-active':'')">
					<text class="area-block-text">ddd</text>
				</view>
				<view :class="'area-block-item '+(selectAreaProcess>=2?'area-block-active':'')">
					<text class="area-block-text">ddd</text>
				</view>
				<view :class="'area-block-item '+(selectAreaProcess==3?'area-block-active':'')">
					<text class="area-block-text">ddd</text>
				</view>
			</view>
			<view class="area-bar">
				<text class="area-bar-circle"></text>
				<text>---------------</text>
				<text class="area-bar-circle"></text>
				<text>---------------</text>
				<text class="area-bar-circle"></text>
			</view>
			<view class="selectArea-block">
				<regionPicker @change="changeArea">
					<view class="selectArea-block-title">请选择城市</view>
				</regionPicker>
			</view>
		</view>
	</view>
</template>

<script>
import regionPicker from "../../components/region-picker/region-picker.vue"
// import zones_data from '../../components/region-picker/region-picker.js'
	export default {
		data() {
			return {
				//上一页面索引 -1:新增，0-n:原有修改
				index:-2,
				
				showSelectArea:false,
				selectAreaProcess:3,
				
				areaName:['','',''],
				areaName_text:"",
				areaCode:'',
				detailAddress:"",
			}
		},
		methods: {
			selectArea(){
				this.showSelectArea=true
			},
			changeArea(e){//{code:{s,c,z},value:{s,c,z},data:{z_id,z_name,z_code}}
				console.log(e.detail)
				this.areaName=e.detail.value
				this.areaName_text=this.areaName[0]+','+this.areaName[1]+','+this.areaName[2]
				this.areaCode=e.detail.data.code
				console.log(this.areaName_text)
			},
			confirm(){
				if(this.index>=-1){
					let pages = getCurrentPages();
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面
					if(this.index>=0){
						prevPage.$vm.address[this.index].location = this.areaName[0]+this.areaName[1]+this.areaName[2]+this.detailAddress;
					}
					else{
						prevPage.$vm.addAddr[2] = this.areaName[0]+this.areaName[1]+this.areaName[2]+this.detailAddress;
					}
				uni.navigateBack({})
				}
			}
		},
		components:{
			regionPicker,
		},
		onLoad(option) {
			this.index=option.index
		}
	}
</script>

<style>
	@import url("./my-selectaddress.css");
</style>
