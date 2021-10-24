<template>
	<view class="box" v-show="showLoading">
		<view class="container">
			<view class="loader"><text class="ball"></text></view>
			<text class="text">loading</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:["showLoading"],
		methods: {
			
		},
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	.box{
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999; overflow: hidden;
		background: rgb(0 0 0 / 50%);
	}
	.container{
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* -webkit-box-reflect: below 2rpx linear-gradient(#0001,#0004); */
	}
	.container .loader{
		position: relative;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		background-color: rgba(255,255,255,0.5);
		animation: animate 2s linear infinite;
	}
	@keyframes animate{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	.container .loader::before{
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100%;
		background:  linear-gradient(to top,transparent,rgba(0,255,249,0.4));
		background-size: 100rpx 180rpx;
		background-repeat: no-repeat;
		border-top-left-radius: 100rpx;
		border-bottom-left-radius: 100rpx;
	}
	.container  .loader::after{
		content: "";
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 20rpx;
		height: 20rpx;
		background: #00fff9;
		border-radius: 50%;
		z-index: 10;
		box-shadow: 0 0 10rpx #00fff9,
					0 0 20rpx #00fff9,
					0 0 30rpx #00fff9,
					0 0 40rpx #00fff9,
					0 0 50rpx #00fff9,
					0 0 60rpx #00fff9,
					0 0 70rpx #00fff9,
					0 0 80rpx #00fff9,
					0 0 90rpx #00fff9,
					0 0 100rpx #00fff9,
	}
	.container .loader .ball {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		right: 20rpx;
		bottom: 20rpx;
		background-color: rgba(0,0,0,0.1);
		border-radius: 50%;
	}
	.container .text{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
	}
</style>
