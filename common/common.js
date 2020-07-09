import Vue from 'vue'

//测试demo
Vue.prototype.navToPage = function(url,obj) { //精确到时分秒
	if(obj){
		uni.navigateTo({
			url: url + encodeURIComponent(JSON.stringify(obj)),
		})
	}else{
		uni.navigateTo({
			url: url,
			fail: function (res) {
				uni.switchTab({
					url: url
				})
			},
		})
	}
}

export default Vue;
