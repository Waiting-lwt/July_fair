<template>
	<view>
		<view class="top-search-input">
			<view class="btn-goback" @click="goBackToSearch()">
				<image src="../../static/images/left.png" mode="aspectFill"></image>
			</view>
			<view class="input-box"><input type="text" value="" /></view>
			<view class="fdj">
				<image src="../../static/images/fdj.png" mode=""></image>
			</view>
		</view>
		<!-- 大导航栏 -->
		<view class="search-Tabs">
			<view class="search-Tab1" @click="url_type = 0; userCancelIndex = 0; changeBigNavClass1(); getgoodslist()"
				:class="{ search_Tabs_border1 : Istrue_url_type1 }"><text>商品</text></view>
			<view class="search-Tab2" @click="url_type = 1; userCancelIndex = 0; changeBigNavClass2(); getgoodslist()"
				:class="{ search_Tabs_border2 : Istrue_url_type2 }"><text>拍卖</text></view>
			<view class="search-Tab3" @click="url_type = 2; userCancelIndex = 1;changeBigNavClass3(); getuserList()"
				:class="{ search_Tabs_border3 : Istrue_url_type3 }"><text>用户</text></view>
		</view>
		<!-- 下拉筛选菜单 的 导航条 -->
		<view class="filter" v-if="userCancelIndex!==1">
			<view class="" @click="dropdownList1()"><text>综合</text></view>
			<view class="" @click="dropdownList2()"><text>分类</text></view>
			<view class="" @click="dropdownList3()"><text>筛选</text></view>
		</view>
		<!-- 下拉列表的大遮罩 -->
		<view  class="bigMask1">
			<view :class="{'bigMask':dropdownList==1||dropdownList===2||dropdownList===3}" @click="dropdownList = 0">
				
			</view>
		</view>
		<!-- 下拉筛选菜单的 下拉列表，分为三个block，用v-show切换 -->
		<block v-if="dropdownList===1">
			<view class="father_xiangdui">
				<view class="dropdownList-zh">
					<view @click="this.way = '',this.tag = ''; goodsListfl()"><text>随便看看</text></view>
					<view @click="this.way = 2; goodsListsort()"><text>最热</text></view>
					<view @click="this.way = 3; goodsListsort()"><text>最新</text></view>
					<view @click="this.way = 0; goodsListsort()"><text>价格升序</text></view>
					<view @click="this.way = 1; goodsListsort()"><text>价格降序</text></view>
					<view @click="this.way = 4; goodsListsort()"><text>库存升序</text></view>
					<view @click="this.way = 5; goodsListsort()"><text>库存降序</text></view>
				</view>
			</view>
		</block>
		<block v-if="dropdownList===2">
			<view class="father_xiangdui">
				<view class="dropdownList-fl">
					<view @click="this.tag = '服装'; goodsListfl()"><text>服装</text></view>
					<view @click="this.tag = '历史'; goodsListfl()"><text>历史</text></view>
					<view @click="this.tag = '建筑'; goodsListfl()"><text>建筑</text></view>
					<view @click="this.tag = '摄影'; goodsListfl()"><text>摄影</text></view>
					<view @click="this.tag = '服装'; goodsListfl()"><text>服装</text></view>
					<view @click="this.tag = '历史'; goodsListfl()"><text>历史</text></view>
					<view @click="this.tag = '建筑'; goodsListfl()"><text>建筑</text></view>
					<view @click="this.tag = '摄影'; goodsListfl()"><text>摄影</text></view>
				</view>
			</view>
		</block>
		<block v-if="dropdownList===3">
			<view class="father_xiangdui">
				<view class="dropdownList-sx">
					<view class="container-sx">
						<view class="textTitle-sx">折扣与服务</view>
						<view class="support-btn">
							<view class="btn-by" :class="{'btn_sx_by':byIndex===1}" @click="changeIndex_by()">包邮</view>
							<view class="btn-fh" :class="{'btn_sx_fh':fhIndex===2}" @click="changeIndex_fh()">极速发货</view>
							<!-- <button size="mini" type="default" :class="{btn_sx_by:byIndex===1}" @click="changeIndex_by()"><text>包邮</text></button>
							<button size="mini" type="default" :class="{btn_sx_by:fhIndex===1}" @click="changeIndex_fh()"><text>极速发货</text></button> -->
						</view>
						<view class="textTitle-sx">价格区间（元）</view>
						<view class="price-range">
							<view class="input-sx">
								
							<input type="number" placeholder="自定义最低价" v-model="minMoney"/></view>
							<view class="separate-sx"></view>
							<view class="input-sx">
								
							<input type="number" placeholder="自定义最高价" v-model="maxMoney" /></view>
						</view>
						<view class="textTitle-sx">发货地</view>
						<view class="address">
							<input type="text" placeholder="请输入地址" v-model="address" />
						</view>
						<view class="btn-sx">
							
								
							
							<button size="mini" type="default" @click="reset_sx()"><text>重置</text></button>
							<button size="mini" type="default" @click="goodsListfl();sure_sx()"><text>确定</text></button>
						</view>
					</view>
				</view>
			</view>
		</block>


		<!-- 把主页的商品列表搬过来 -->
		<view class="container" v-if="userCancelIndex!==1">
			<view class="paimai-list">
				<!-- 商品列表 -->
				<view class="goodslist" v-for="(item,index) in goods" :key="item.id" @click="mask_on(1)">
					<image :src="item.introImage" mode=""></image>
					<!-- 遮罩层 -->
					<view class="goodsmask" v-show="mask">
						<!-- 收藏按钮 -->
						<view class="fv">
							<!-- <image src="../../static/images/收藏.png" mode="aspectFill"></image> -->
						</view>
						<view class="maskcontainer">
							<text>《七夕礼物》</text>
							<view class="keyword">
								<view>莫兰蒂</view>
								<view>故事</view>
							</view>
						</view>

					</view>



				</view>
			</view>
			<view class="footer">... ...已经到底啦... ...</view>
		</view>
		
		<!-- 用户搜索结果展示部分 -->
		<view class="container-userResult"  v-if="userCancelIndex==1">
			<view class="user" v-for="(item,index) in user" :key="item.id">
				<view class="portrait">
					<image :src="item.portrait" mode="aspectFill"></image>
				</view>
				<view class="user-info-searchres">
					<view class="username">{{ item.name }}</view>
					<view class="userfans">粉丝：{{ item.fans }}</view>
					<view class="usertags">{{ item.tags }}</view>
				</view>
			</view>
		</view>


		<!-- <HM-filterDropdown :filterData="filterData" :defaultSelected ="filterDropdownValue" @confirm="confirm"></HM-filterDropdown> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userCancelIndex:'',
				user:[],
				byIndex:0,
				fhIndex:0,
				dropdownList: 0, //下拉筛选列表切换
				url_type: 0, //三个大导航栏修改url的type参数，商品0 拍卖品1，用户2
				goods: [], //商品列表
				goods_bf: [],
				keyword: '', //所搜索的关键字
				Istrue_url_type1: true, //切换大导航三个按钮的下边框样式
				Istrue_url_type2: false,
				Istrue_url_type3: false,
				tag: '',           //条件筛选用的数据们
				minMoney: '',
				maxMoney: '',
				way: '',
				address: '',
				support: '',
				
			}
		},
		onLoad(e) {
			this.keyword = e.keyword
			this.getgoodslist()
			//this.keyword = e.text
			console.log(e)
		},



		methods: {
			// 输入自定义最低价
			ipt_minMoney() {
				event.detail = {value: value}
			},
			// 返回搜索页面
			goBackToSearch() {
				uni.navigateBack({

				})
			},
			// 点击切换大导航三个按钮
			changeBigNavClass1() {
				this.url_type = 0,
					this.Istrue_url_type1 = true,
					this.Istrue_url_type2 = false,
					this.Istrue_url_type3 = false
			},
			changeBigNavClass2() {
				this.url_type = 1,
					this.Istrue_url_type1 = false,
					this.Istrue_url_type2 = true,
					this.Istrue_url_type3 = false
			},
			changeBigNavClass3() {
				this.url_type = 2,
					this.Istrue_url_type1 = false,
					this.Istrue_url_type2 = false,
					this.Istrue_url_type3 = true
			},
			// 获取随机商品列表
			async getgoodslist() {
				const res = await this.$myRequest({
					url: '/search/discover/key?key=' + this.keyword + '&type=' + this.url_type +
						'&pageNum=0&pageSize=100'
				})
				console.log(res)
				this.goods = res.data.data
				this.goods_bf = res.data.data
				console.log(this.goods)
			},
			// 获取用户列表
			async getuserList() {
				const res = await this.$myRequest({
					url: '/search/discover/key/user?key=' + this.keyword + '&pageNum=0&pageSize=100'
				})
				console.log(res)
				this.user = res.data.data
			},


			//搜索结果页面-条件筛选-排序
			async goodsListsort() {
				const res = await this.$myRequest({
					method: 'POST',
					url: '/search/conditions?tag=' + this.tag + '&minMoney=' +
						this.minMoney + '&maxMoney=' + this.maxMoney + '&support=' +
						this.support + '&address=' + this.address + '&way=' + this.way,
					data: this.goods.data,
					data: JSON.stringify(this.goods)

				})
				console.log(res)
				this.goods = res.data.data
				if (this.tag == '') {
					this.goods_bf = res.data.data
				}
				this.dropdownList = 0
			},
			//搜索结果页面-条件筛选-分类
			async goodsListfl() {
				const res = await this.$myRequest({
					method: 'POST',
					url: '/search/conditions?tag=' + this.tag + '&minMoney=' +
						this.minMoney + '&maxMoney=' + this.maxMoney + '&support=' +
						this.support + '&address=' + this.address + '&way=' + this.way,
					data: this.goods_bf.data,
					data: JSON.stringify(this.goods_bf)

				})
				console.log(res)
				this.goods = res.data.data

				this.dropdownList = 0
			},
			// 下拉筛选菜单-包邮按钮
			changeIndex_by() {
			   if(this.byIndex == 0) {
				   this.byIndex = 1
			   }else if (this.byIndex == 1) {
				   this.byIndex = 0
			   }
			},
			changeIndex_fh(){
				if(this.fhIndex == 0) {
					this.fhIndex = 2
				}else if (this.fhIndex == 2) {
					this.fhIndex = 0
				}
			},
			// 下拉菜单的筛选-按下确定
			sure_sx() {
				let minMoney = this.minMoney;
				let maxMoney = this.maxMoney;
				let address = this.address;
				this.support = Number(this.byIndex)+Number(this.fhIndex)
				this.goodsListfl()
				console.log(this.support)
			},
			// 按下重置
			reset_sx(){
				this.maxMoney = '';
				this.minMoney = '';
				this.address = '';
				this.goodsListfl()
			},
			




			// 商品列表遮罩层开关
			mask_on(val) {
				val == 1 ? this.mask = true : this.mask = false
			},
			// 下拉列表弹出与关闭
			dropdownList1() {
				if (this.dropdownList !== 1) {
					this.dropdownList = 1
				} else if (this.dropdownList == 1) {
					this.dropdownList = 0
				}
			},
			dropdownList2() {
				if (this.dropdownList !== 2) {
					this.dropdownList = 2
				} else if (this.dropdownList == 2) {
					this.dropdownList = 0
				}
			},
			dropdownList3() {
				if (this.dropdownList !== 3) {
					this.dropdownList = 3
				} else if (this.dropdownList == 3) {
					this.dropdownList = 0
				}
			},
		}
	}
</script>

<style lang="less">
	@import "goodsListStyle";

	@font-face {
		font-family: 'iconfont';
		/* Project id 2713288 */
		src: url('//at.alicdn.com/t/font_2713288_f84s6tdr39f.woff2?t=1634124032588') format('woff2'),
			url('//at.alicdn.com/t/font_2713288_f84s6tdr39f.woff?t=1634124032588') format('woff'),
			url('//at.alicdn.com/t/font_2713288_f84s6tdr39f.ttf?t=1634124032588') format('truetype');
	}
	

	.top-search-input {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;

		.btn-goback,
		.fdj {
			height: 50rpx;
			width: 50rpx;
			padding: 0 30rpx 0 30rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.input-box {
			flex: 1;
			border-radius: 40rpx;
			border: 2rpx solid;
		}

	}

	.search-Tabs {
		display: flex;
		justify-content: space-between;
		width: 94%;
		height: 100rpx;
		margin: 24rpx 0 0 22.5rpx;

		//background-color: #C0C0C0;
		.search-Tab1,
		.search-Tab2,
		.search-Tab3 {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 30%;
			//background-color: #0069D6;
			border-radius: 30rpx;

		}

	}

	.search_Tabs_border1 {
		text {
			border-bottom: 8rpx solid #0080ff;
		}
	}

	.search_Tabs_border2 {
		text {
			border-bottom: 8rpx solid #0080ff;
		}
	}

	.search_Tabs_border3 {
		text {
			border-bottom: 8rpx solid #0080ff;
		}
	}

    .bigMask1 {
		position: relative;
		.bigMask{
			position: absolute;
			top: 8rpx;
			width: 750rpx;
			height: 978rpx;
			z-index: 99;
			background-color: rgba(0, 0, 0, 0.7);
		}
	
	}
	.filter {
		display: flex;
		justify-content: space-around;

		view {
			text {
				font-size: 26rpx;

				&:nth-child(1) {
					&::after {
						content: '\e619';
						font-family: 'iconfont';
					}

					// &:nth-child(2) {
					// 	&::after {
					// 	content:'\e619';
					// 	font-family: 'iconfont';
					// }
				}
			}
		}
	}

	.father_xiangdui {
		position: relative;

		.dropdownList-zh,
		.dropdownList-fl,
		.dropdownList-sx {
			border-radius: 0 0 30rpx 30rpx;
			margin: 8rpx 0 0 0;
			background-color: #ffffff;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 999;
		}

		.dropdownList-zh,
		.dropdownList-fl,{
			>view {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 70rpx;
				width:96%;
				margin-left:10rpx;
				border-bottom: 1rpx solid #e1e1e1;
                
				text {
					font-size: 28rpx;
					padding-left: 70rpx;
				}
			}
		}

		.dropdownList-fl {
			>view {
				display: flex;
				justify-content: center;
				align-items: center;
				
                
				text {
					transform: translateX(-46rpx);
				}
			}
		}

		.dropdownList-sx {
			.container-sx {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				width: 80%;
				height: 500rpx;
				margin-left: 10%;
				.textTitle-sx {
					font-size: 28rpx;
					color: #008dd8;
				}
				.support-btn {
					.btn-by,
					.btn-fh {
						margin-right: 90rpx;
					    display: inline-block;
						    font-size: 13px;
						    line-height: 2.3;
						    padding: 0 1.34em;					
						    background-color: #f8f8f8;
						    color: #000;
							border: 1px solid #C0C0C0;
						    border-radius: 5px;
						    box-sizing: border-box;
						    color: #000;
						    cursor: pointer;
						    // margin-left: auto;
						    // margin-right: auto;
						    overflow: hidden;
						    padding-left: 14px;
						    padding-right: 14px;
						    position: relative;
						    text-align: center;
						    text-decoration: none;
						
					}
					.btn_sx_by {
						background-color: #008dd8;
						color: #FFFFFF;
					}
					.btn_sx_fh {
						background-color: #008dd8;
						color: #FFFFFF;
					}
				}
				.price-range {
					display: flex;
					justify-content: space-between;
					.input-sx {
		                width: 40%;   
						border: 1px solid #C0C0C0;
						border-radius: 12rpx;
						background-color: #ffffff;
						input {
							font-size: 13px;
							line-height: 2.3;
							padding-left: 10rpx;
							
						}
					}
					.separate-sx {
						flex: 1;
						margin: 0 10rpx;
						height: 50%;
						border-bottom: 2rpx solid #C0C0C0;
					}
				}
				.address {
					width: 40%;
					border: 1px solid #C0C0C0;
					border-radius: 12rpx;
					background-color: #ffffff;
					input {
						font-size: 13px;
						line-height: 2.3;
						padding-left: 10rpx;
						
					}
				}
				.btn-sx {
					display: flex;
					justify-content: space-between;
					button {
						width: 40%;
						background-color: #008dd8;
						color: #FFFFFF;
						
					}
				}
			}
			
		}
	}
	.container-userResult {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 80%;
		margin-left: 10%;
		.user {
			display: flex;
			justify-content: flex-start;
			border: 2px solid #006FFF;
			width: 100%;
			border-radius: 30rpx;
			margin-top: 30rpx;
			.portrait {
				margin: 30rpx 26rpx;
				width: 134rpx;
				height: 134rpx;
				border-radius: 50%;
				overflow: hidden;
				image {
					height: 100%;
					width: 100%;
				}
			}
			.user-info-searchres {
				box-sizing: border-box;
				padding-top: 30rpx;
				font-size: 26rpx;
				margin-left: 10rpx;
				view {
					padding-top: 6rpx;
				}
				
			}
		}
	}
</style>
