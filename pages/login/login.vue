<template>
	<view style="padding: 30rpx;">
		<view style="font-weight: 500;" class="mt-20">
			手机号登录
		</view>
		<!-- <view class="cf808 f20 mt-20">
			未注册的手机号登录成功后将自动注册
		</view> -->

		<!-- 输入框 -->
		<view class="uni-form-item uni-column mt-40 pb-10">
			<view class="uni-input-wrapper">
				<input class="uni-input" focus @input="changeUserName" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="divider" />
		<view class="uni-form-item uni-column mt-40 pb-10 flex center">
			<view class="uni-input-wrapper flex1">
				<input class="uni-input" placeholder="请输入密码" :password='showPassword' @input="changePassword" />
			</view>
			<uni-icons type="eye-slash-filled" @click='changeShowPassword' v-if='showPassword' color='#EF3D22'></uni-icons>
			<uni-icons type="eye-filled" @click='changeShowPassword' v-else color='#EF3D22'></uni-icons>
		</view>
		<view class="divider" />

		<view class="login bg_linear f32 mt-60" @click="login()">
			登录
		</view>
		<view class="flex center justify-flex-end f20 mt-20 cf808">
			<text @click="navToPage(`/pages/login/register`,'')">注册账号</text>
			<!-- <text class="pl-10 pr-10">|</text>
			<text @click="navToPage(`/pages/login/retrieve`,'')">找回密码</text> -->
		</view>
		<!-- 微信登录 -->
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="wxLogin" @click="navToPage(`/pages/login/wxLogin`,'')">
			<uni-icons type="weixin" size='28' color='#62b900'></uni-icons>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: 'admin', //账号	
				password: 'admin', //密码
				showPassword: true, //密码是否展示
			}
		},
		onLoad() {

		},

		methods: {
			//账号输入
			changeUserName(event) {
				this.userName = event.detail.value
			},
			//密码输入
			changePassword(event) {
				this.password = event.detail.value
			},
			//是否明文显示密码
			changeShowPassword() {
				this.showPassword = !this.showPassword;
			},
			//登录
			login() {
				let params = {
					userName:this.userName,
					password:this.password
				}
				this.$http.post(this.$api.user.register, params).then(res => {
					console.log(res.datas);
					
				}).catch(err => {
				
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		border-radius: 15px;
		color: #FFFFFF;
		text-align: center;
		padding: 14rpx 0;
	}

	.wxLogin {
		position: absolute;
		bottom: 30px;
		width: calc(100% - 60rpx);
		text-align: center;
	}
</style>
