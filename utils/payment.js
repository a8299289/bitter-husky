import Request from './request.js'
import api from './api.js'
const http = new Request();

export default {
	wxPay(type,data,paySuccess,payFail,money=0){
		var apiUrl = api.shoppingCart.WeChatSmallPay;//请求路径
		// #ifdef MP-WEIXIN
		//小程序支付
		uni.login({
			provider: 'wxpay',
			success: function(loginRes) {
				let code = loginRes.code;
				console.log("code: " + code);
				console.log('小程序支付');
				var params = {
					code:'',
					order_sn:'',
					pay_sn:'',
					is_luck:'', 
					step:'',
				}
				params.code = code;
				if(type == 'pay_sn'){
					params.pay_sn = data;
				}else if(type == 'order_sn'){
					params.order_sn = data;
				}else if(type == 'pay_tips'){
					// 打赏骑手
					apiUrl = api.order.exceptionalRider;
					params.order_id = data;
					params.money = money;
					params.pay_type = 'WeChatSmall';
				}else if(type == 'buy_gift'){
					apiUrl = api.sellSetBt.buyPacket;
					params = data;
					params.pay_code = 'WeChatSmall';
					params.code = code;
					console.log(params);
					// return;
				}
				http.post(apiUrl,params).then(wxmpPay=>{
					if(wxmpPay.code == 200) {
						var wecartData = wxmpPay.datas;
						if(type == 'buy_gift'){
							wecartData = wxmpPay.datas.res;
						}
						console.log(wecartData);
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: wecartData.timeStamp,
							nonceStr: wecartData.nonceStr,
							package: wecartData.package,
							signType: wecartData.signType,
							paySign: wecartData.paySign,
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
								paySuccess(res);
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
								payFail(err);
							}
						});	
					}else{
						payFail({errMsg:res.datas.error});
					}
					
				});
				
			},
		});
		
		// 
		// #endif
		
		// #ifdef H5
			//判断是不是微信
			var ua = window.navigator.userAgent.toLowerCase();
			var pxe = '';
			if((/MicroMessenger/i).test(ua)){
			    // alert('wechat');
			    pxe = 'wechat';
			}
			
			if(pxe == "wechat"){
				//公众号支付
				console.log('公众号支付');
				
			}else{
				console.log('H5支付');
				//H5支付
				// Vue.$http.post(Vue.$api.shoppingCart.weixinPlay,{pay_sn:res.datas.pay_sn}).then(weixin=>{
				// 	if(weixin.code == 200){
				// 		uni.navigateTo({
				// 			url: '',
				// 		})
				// 	}else{
						
				// 	}
				// })
			}
		// #endif
	},

}