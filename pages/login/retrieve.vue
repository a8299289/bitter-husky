<template>
	<view style="padding: 30rpx;">
		<view style="font-weight: 500;" class="mt-20">
			找回密码
		</view>
		
		<!-- 输入框 -->
		<view class="uni-form-item uni-column mt-40 pb-10">
			<view class="uni-input-wrapper">
				<input class="uni-input" focus @input="changeUserName" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="divider"/>
		<view class="uni-form-item uni-column mt-40 pb-10 flex center">
			<view class="uni-input-wrapper flex1">
				<input class="uni-input" placeholder="请输入密码" :password='showPassword' @input="changePassword"/>
			</view>
			<uni-icons type="eye-slash-filled" @click='changeShowPassword' v-if='showPassword' color='#EF3D22'></uni-icons>
			<uni-icons type="eye-filled" @click='changeShowPassword' v-else color='#EF3D22'></uni-icons>
		</view>
		<view class="divider"/>
		<view class="uni-form-item uni-column mt-40 pb-10 flex center">
			<view class="uni-input-wrapper flex1">
				<input class="uni-input" placeholder="请再次输入密码" :password='showPassword' @input="changePassword"/>
			</view>
			<uni-icons type="eye-slash-filled" @click='changeShowPassword' v-if='showPassword' color='#EF3D22'></uni-icons>
			<uni-icons type="eye-filled" @click='changeShowPassword' v-else color='#EF3D22'></uni-icons>
		</view>
		<view class="divider"/>
		
		<view class="login bg_linear f32 mt-60">
			登录
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '', //账号	
				password: '', //密码
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
		}
	}
</script>

<style lang="scss">
.login{
	width: 100%;
	border-radius: 15px;
	color: #FFFFFF;
	text-align: center;
	padding: 14rpx 0;
}
.wxLogin{
	position: absolute;
	bottom: 30px;
	width: calc(100% - 60rpx);
	text-align: center;
}
</style>
