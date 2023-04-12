import { reqAddressInfo, reqShopInfo, reqSubmitOrder } from '@/api'
// import { reject } from 'core-js/fn/promise';
// import { createdStore } from 'vuex'
let state = {
    address: [],
    tradeInfo: {},
    payId: ''
};
let mutations = {
    GETADDRESS(state, address) {
        state.address = address
    },
    GETSHOPINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    },
    SUBMITINFO(state, payId) {
        state.payId = payId
    }
};
let actions = {
    // 获取用户地址
    async getAddress({ commit, state, dispatch }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETADDRESS', result.data);
            // console.log(typeof (result));
            return 'ok';

        } else {
            return Promise.reject(new Error(result.message));
        }
    },

    //获取商品数据
    async getShopInfo({ commit }) {
        let result = await reqShopInfo();
        if (result.code == 200) {
            commit('GETSHOPINFO', result.data);
            console.log(result);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    //提交订单tradeNo交易编码 data:付款人信息
    async submitInfo({ commit }, { tradeNo, data }) {
        // 提交订单的时候返回一个很重要的数据--》订单的ID 这是唯一标志付款人和收件人信息的
        let result = await reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
            commit("SUBMITINFO", result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    }
};
let getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}