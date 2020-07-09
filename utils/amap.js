import amapFile from '../common/amap-wx.js'
const WxAmapKey = '71198830c89a4508831c5e6b24551a08';

export default {
	//获取定位地址
	getLocation(success,fail){
		console.log('执行方法');
		uni.getLocation({
			// #ifdef MP-WEIXIN
		    type: 'gcj02', 
			// #endif
			// #ifdef H5
			type: 'gcj02 ', 
			// #endif
		    success: function (res) {
		        console.log('当前位置的经度：' + res.longitude);
		        console.log('当前位置的纬度：' + res.latitude);
				success(res);
		
		    },
			fail: function(res){ 
				console.log('定位失败',res);
				fail(res);
				
			}
		});
	},
	//通过经纬度获取城市
	getCityByLngLat(lng,lat,callBack){
		// #ifdef MP-WEIXIN
			//微信创建高德地图组件
			var amap = new amapFile.AMapWX({ key: WxAmapKey });  
			amap.getRegeo({
				location:lng+','+lat,
				success: function(data){
					// console.log('反编码',data);
					//成功回调
					let param={
						lng:lng,
						lat:lat,
						area_name:data[0].regeocodeData.addressComponent.district,
						city_name:data[0].regeocodeData.addressComponent.city.length?data[0].regeocodeData.addressComponent.city:data[0].regeocodeData.addressComponent.province,
						province_name:data[0].regeocodeData.addressComponent.province,
						cityCode:data[0].regeocodeData.addressComponent.adcode,
					};
					console.log('param',param);
					callBack(param);
				},
				fail: function(info){
					//失败回调
					console.log(info);
				}
			})
		// #endif
		
		// #ifdef H5
			let center = [lng,lat];
			var amap = new AMap.Map('container', { 
			   center:center,
			   zoom:11
			});
			amap.plugin('AMap.Geocoder', function() {
				var geocoder = new AMap.Geocoder({
				})
				geocoder.getAddress(center, function(status, result) {
					if(status === 'complete' && result.info === 'OK'){
						console.log('经纬度地址',result.regeocode.addressComponent);
						let param={
							lng:lng,
							lat:lat,
							area_name:result.regeocode.addressComponent.district,
							city_name:result.regeocode.addressComponent.city?result.regeocode.addressComponent.city:result.regeocode.addressComponent.province,
							province_name:result.regeocode.addressComponent.province,
							cityCode:result.regeocode.addressComponent.adcode,
						};
						callBack(param);
						
					}else{
						callBack(result);
					}
				})
			})
		// #endif
	},
	//通过经纬度获取附近的地址
	getPoiByLngLat(lng,lat,querytypes,callBack){
		// #ifdef MP-WEIXIN
			//微信创建高德地图组件
			var amap = new amapFile.AMapWX({ key: WxAmapKey });  
			amap.getPoiAround({
				location:lng+','+lat,
				querytypes:querytypes,
				success: function(data){
					//成功回调
					data.pois = data.poisData;
					for(let i=0;i<data.pois.length;i++){
						let tempLocation = data.pois[i].location.split(',');
						data.pois[i].location = {lng:tempLocation[0],lat:tempLocation[1]};
					}
					callBack(data);
				},
				fail: function(info){
					//失败回调
					console.log(info);
				}
			})
		// #endif
		
		// #ifdef H5
			let center = [lng,lat];
			var amap = new AMap.Map('container', { 
			   center:center,
			   zoom:11
			});
			amap.plugin(['AMap.PlaceSearch'],function(){
				let placeSearch = new AMap.PlaceSearch({
					type:querytypes
				})
				placeSearch.searchNearBy('',center,1000,function (status, result) {
					if(result.info == 'OK'){
						// alert('经纬度地址'+JSON.stringify(result));
						console.log('经纬度地址',result);
						callBack(result.poiList);
					}
				})
			})
		// #endif
	},
	//通过关键字查询附近的地址
	getPoiByKey(cityName,cityCode,key,callBack){
		// #ifdef MP-WEIXIN
		//微信创建高德地图组件
		var amap = new amapFile.AMapWX({ key: WxAmapKey });  
		
		amap.getInputtips({
			keywords: cityName + '政府',
			city:cityCode,
			citylimit: true,
			
			success: function(data){
				if(data && data.tips){
					let tempLocation = data.tips[0].location;
					console.log('tempLocation',tempLocation);
					amap.getPoiAround({
						location:tempLocation,
						querykeywords:key,
						success: function(res){
							//成功回调
							res.pois = res.poisData;
							for(let i=0;i<res.pois.length;i++){
								let tempLocation = res.pois[i].location.split(',');
								res.pois[i].location = {lng:tempLocation[0],lat:tempLocation[1]};
							}
							console.log(res);
							callBack(res.pois);
						}
					})
					// callBack(data.tips);
				}
			}
		})
		// #endif
		// #ifdef H5
		AMap.plugin(['AMap.PlaceSearch'],function(){
			var placeSearch = new AMap.PlaceSearch({
				city: cityCode,
				citylimit: true,  //是否强制限制在设置的城市内搜索
			})
			placeSearch.search(key, function (status, result) {
				if(result.info == 'OK'){
					callBack(result.poiList.pois);
				}else{
					callBack('');
				}
			})
		})
		// #endif
	}
}