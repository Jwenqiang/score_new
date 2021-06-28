import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const storage=window.localStorage;
const store = new Vuex.Store({
	state: {
		count:0,
		hasLogin: false,
		userInfo: JSON.parse(localStorage.getItem("userInfo"))||'',
		isNew:true
	},
	getters :{
	    getterHasLogin(state) {
				console.log(localStorage.getItem("userInfo"))
					return localStorage.getItem("userInfo");
				// if(state.userInfo){
				// 	return (state.hasLogin =true)
				// }else{
				// 	return (state.hasLogin =false)
				// }
	    }
	},	
	mutations: {
		getLogin(state,msg){
			state.hasLogin = true;
			state.userInfo = msg;
		},
		setLogin(state, provider) {
			console.log(provider);
			state.hasLogin = true;
			state.userInfo = provider;
			storage.setItem("userInfo",JSON.stringify(provider));
		},
		clearLogin(state) {
			state.hasLogin = false;
			state.userInfo = "";
			storage.removeItem('userInfo');
		},
		changeNew(state) {
			state.isNew = false;
		}
	},
	actions: {
		isLogin({commit},data){
			return commit('getLogin',data)
		},
		login({commit},data) {
			return commit('setLogin',data)
		},
		logout({commit},data) {
			return commit('clearLogin',data)
		},
		setNew({commit},data) {
			return commit('changeNew',data)
		}
	}
})
export default store