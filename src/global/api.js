import axios from './axiosConfig.js'
export const $get=(url,data,token)=>{
	return axios({
		method:'get',
		url:url,
		headers:token || '',
		params:data
	})
}
export const $post=(url,data)=>{
	return axios({
		method:'post',
		url:url,
		data:data
	})
}