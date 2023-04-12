//detail模块的仓库
import { reqDetailList, reqAddOrUpdateCart } from "@/api"
let state = {
    //detail模块返回的数据
    detailInfo: {}
};
let mutations = {
    GETDETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo
    }
};
let actions = {
    async getDetailInfo({ state, commit, dispatch }, skuId) {
        //商品详情请求，需要携带商品Id
        let result = await reqDetailList(skuId);
        if (result.code == 200) {
            commit('GETDETAILINFO', result.data);
        }
    },
    async addOrUpdateCart({ state, commit, dispatch }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateCart(skuId, skuNum)
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject()
        }
    }
};
//仓库的计算属性
// 项目中：vuex为了简化数据而生
let getters = {
    //路径导航简化信息
    categoryView(state) {
        return state.detailInfo.categoryView || []
    },
    // 产品信息简化信息
    skuInfo() {
        return state.detailInfo.skuInfo || {}
    },
    // 产品售卖简化信息
    spuSaleAttrList() {
        return state.detailInfo.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}