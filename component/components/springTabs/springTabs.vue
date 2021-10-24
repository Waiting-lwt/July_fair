<template>
	<view>
		<view>
			<button @click="ShowHidden=(ShowHidden+1)%2;">
				<text>dd</text>
			</button>
		</view>
	<view class="arrivalNavigation" v-if="ShowHidden">
		<view class="d4"></view>
		<view class="sideNavigation">
			<nav>
				<ul>
					<navigator class="navigatorStyle" url="../../pages/index/index">
						<li>平台规则</li>
					</navigator>
					<view class="liBottomBorder"></view>
					<navigator class="navigatorStyle" url="../../pages/index/index">
						<li>联系平台</li>
					</navigator>
				</ul>
			</nav>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ShowHidden: false,
			}
		},
		methods: {
			HiddenClick() {
				this.ShowHidden = false
			},
		},
		mounted() {
			// document.addEventListener('click', this.HiddenClick)
		},
	}
</script>

<style>
	@import "./springTabs.css";
</style>
