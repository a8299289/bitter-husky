<template>
	<view>
		<view class="user bg_linear">
			<!-- 按钮部分 -->
			<view class="user-menu flex center justify-flex-end">
				<uni-icons type="gear" color='#FFFFFF' size='20'></uni-icons>
			</view>
			<!-- 头像名称粉丝关注赞收藏 -->
			<view class="user-info flex center text-color-inverse">
				<image class="user-info-avatar" :src="avatar" mode="">
				</image>
				<view class="flex flex-direction-column flex1">
					<view class="font-lg font_bold mb-20" @click="navToPage(`/pages/login/login`,'')" v-if="userName">
						{{userName}}
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="font-lg font_bold mb-20" @click="navToPage(`/pages/login/wxLogin`,'')" v-else>
						<text>请登录</text>
					</view>
					<!-- #endif -->
					
					<!-- #ifndef MP-WEIXIN -->
					<view class="font-lg font_bold mb-20" @click="navToPage(`/pages/login/login`,'')" v-else>
						<text>请登录</text>
					</view>
					<!-- #endif -->
					<view class="flex center font-mi">
						<view class="flex center flex-direction-column mr-20">
							<text class="font_bold">{{fansNum}}</text>
							<text>粉丝</text>
						</view>
						<view class="flex center flex-direction-column mr-20">
							<text class="font_bold">{{followNum}}</text>
							<text>关注</text>
						</view>
						<view class="flex center flex-direction-column mr-20">
							<text class="font_bold">{{praiseNum}}</text>
							<text>赞</text>
						</view>
						<view class="flex center flex-direction-column mr-20">
							<text class="font_bold">{{collectionNum}}</text>
							<text>收藏</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 个人简介 -->
			<view class="font-sm ml-20 mt-20 pb-20 text-color-inverse">
				这个人很懒，什么都没有留下！
			</view>
			<view class="" style="height: 60rpx;"></view>
			<!-- 按钮组 -->
			<view class="menus">
				<view class="flex center justify-space-between pl-30 pr-30 font-base">
					<view class="menus-item">
						<image src="../../static/my/wallet.png" mode="" class="menus-item-image"></image>
						<text>我的钱包</text>
					</view>
					<view class="menus-item">
						<image src="../../static/my/article.png" mode="" class="menus-item-image"></image>
						<text>笔记管理</text>
					</view>
					<view class="menus-item">
						<image src="../../static/my/message.png" mode="" class="menus-item-image"></image>
						<text>我的消息</text>
					</view>
					<view class="menus-item">
						<image src="../../static/my/feedback.png" mode="" class="menus-item-image"></image>
						<text>问题反馈</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 用户文章瀑布流 -->
		<view class="article">
			<view class="article-title">
				<text>美食笔记</text>
			</view>
			<wfalls-flow :list='list' class='bg-color-grey' ref="wfalls" @finishLoad="getLoadNum"> </wfalls-flow>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [], //列表数据
				fansNum: 0, //粉丝数
				followNum: 0, //关注数
				praiseNum: 0, //赞数
				collectionNum: 0, //收藏数
				userName: '', //用户名称
				avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo0lx1gO185kJIvuNvicG0lnUFyDOX6L0Ce5icEGoXLMECSTpFtFyRrDjgHyQATQ0IRibmUzAzqrQBSg/132', //用户头像
				screenHeight:'',	//页面高度
				isNewRenderDone:false //更新锁
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.init();
		},
		//滚动到底部时触发的函数
		onReachBottom() {
		    console.log('onReachBottom');
		    // 加锁，避免在加载更多时用户频繁下拉导致的重复触发而渲染异常
		    if(!this.isNewRenderDone) return;   
		    this.isNewRenderDone = false
		    uni.showLoading({title:'正在加载更多'})
		    // 模拟分页请求 (加载更多)
		    setTimeout(()=>{
		        this.init();
		        setTimeout(()=>{
		            this.$refs.wfalls.handleViewRender();
		        },0)
		    },800)
		},
		//下拉刷新
		onPullDownRefresh() {
		    // 模拟更新新数据
			this.list = [];
		    this.init();
		    setTimeout(()=>{
		        this.$refs.wfalls.init()
		        uni.stopPullDownRefresh()
		        uni.showToast({title:'刷新成功',icon:'none'})
		    },800)
		},
		methods: {
			//获取加载数据集情况
			getLoadNum(num){
			    console.log('共加载了:'+num);
			    !this.isNewRenderDone&&uni.hideLoading()
			    this.isNewRenderDone = true
			},
			//加载数据
			init(){
				for (let i = 0; i < 10; i++) {
					let title = '我是文章标题';
					if ((i % 2 != 0 && i != 9) || i == 2 || i == 8) {
						title = '我是文章标题我是文章标题我是文章标题';
					}
					this.list.push({
						id: new Date(),
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583671469410&di=6bdb6526f0117380db303ac285c94974&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Fd%2Fdc%2F0f45274990.jpg',
						isLike: false,
						title: title,
						avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo0lx1gO185kJIvuNvicG0lnUFyDOX6L0Ce5icEGoXLMECSTpFtFyRrDjgHyQATQ0IRibmUzAzqrQBSg/132',
						userName: '山的那边、海的这边',
					});
				}
				console.log('this.list',this.list);
			},
			
			
		}
	}
</script>

<style lang="scss">
	// 用户信息部分样式
	.user {
		padding-top: 20rpx;
		position: relative;

		//右侧按钮样式
		.user-menu {
			padding: 0 20rpx 40rpx 0;

			.uni-icons {
				margin-left: 10rpx;
			}
		}

		//用户信息详情样式
		.user-info {
			margin-left: 20rpx;

			.user-info-avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}

		//按钮组
		.menus {
			position: absolute;
			width: 94%;
			margin: 0 3%;
			bottom: -80rpx;
			background-color: #FFFFFF;
			box-shadow: 0px 5px 10px #999999;
			border-radius: $uni-border-radius-base;
			padding: 20rpx 0;

			.menus-item {
				width: 20%;
				display: flex;
				align-items: center;
				flex-direction: column;

				.menus-item-image {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
	}

	//笔记列表样式
	.article {
		margin-top: 100rpx;

		.article-title {
			/* #ifndef APP-PLUS-NVUE */
			position: -webkit-sticky;
			/* #endif */
			position: sticky;
			top: calc(var(--window-top));
			z-index: 99;
			font-size: 32rpx;
			background: #FFFFFF;
			text-align: center;
			width: 100%;
			padding: 20rpx 0;

			text {
				padding-bottom: 2px;
				border-bottom: 2px solid $uni-text-color-dominant;
			}
		}
	}
</style>
