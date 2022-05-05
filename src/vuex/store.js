import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const storage=window.localStorage;
const store = new Vuex.Store({
	state: {
		count:0,
		hasLogin: false,
		userInfo: localStorage.getItem("userInfo"),
		isNew:true
	},
	getters :{
	    getterHasLogin(state) {
			if(storage.getItem('userInfo')){
				return (hasLogin =true)
			}
	        
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
		clearLogin(state, data) {
			state.hasLogin = false;
			state.userInfo = {};
			localStorage.removeItem("userInfo");
			if(data!='no'){
				var oldUrl=window.location.href;
				sessionStorage.setItem('toName',oldUrl);
			}
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