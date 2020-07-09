//线上
const prod = {
	baseUrl: "http://127.0.0.1:7001/" //基础api路径
}
//本地
const test = {
	baseUrl: "http://127.0.0.1:7001/" //基础api路径
}
const path = process.env.NODE_ENV == 'development' ? test : prod;

export default {
	//用户基础信息
	user: {
		passwrdLogin: path.baseUrl + '', //用户密码登录
		login: path.baseUrl + '', //用户登陆
		register: path.baseUrl + 'members/save', //用户注册
	},
}
