//search模块的仓库
import { reqSearchList } from "@/api"
let state = {
    //搜索模块返回的数据
    searchList: {}
};
let mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
let actions = {
    async getSearchList({ state, dispatch, commit }, searchParams) {
        let result = await reqSearchList(searchParams);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
//仓库的计算属性
// 项目中：vuex为了简化数据而生
let getters = {
    goodsList(state) {
        return state.searchList.goodsList
    },
    //品牌的数据
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    //商品属性
    attrsList(state) {
        return state.searchList.attrsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}