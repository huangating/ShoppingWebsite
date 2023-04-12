import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout } from '@/api';
let state = {
    code: '',
    //身份标识存储在vuex中
    token: localStorage.getItem('TOKEN'),
    nickName: ''
};
let mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USERINFO(state, nickName) {
        state.nickName = nickName
    },
    CLEAR(state) {
        state.token = '';
        state.nickName = ''
        //本地存储token清空
        localStorage.removeItem('TOKEN')
    }
};
let actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            return Promise.reject()
        }
    },
    //注册用户的地方
    async registerUser({ commit, state, dispatch }, obj) {
        //注册接口没有返回data,不需要提交mutation
        let result = await reqRegister(obj);
        if (result.code == 200) {
            //注册成功
            return 'ok';
        } else {
            //注册失败
            return Promise.reject(new Error(result.message));
        }
    },
    // 用户登录的地方
    async userLogin({ commit, state, dispatch }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit('SET_TOKEN', result.data.token);
            localStorage.setItem('TOKEN', result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 获取用户信息的地方
    async getUserInfo({ commit, state, dispatch }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("SET_USERINFO", result.data.nickName)
            return "ok"
        } else {
            return Promise.reject()
        }
    },
    // 退出登录的地方
    async logout({ commit }) {
        let result = await reqUserLogout();
        if (result.code == 200) {
            commit('CLEAR');
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    }
};
let getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}