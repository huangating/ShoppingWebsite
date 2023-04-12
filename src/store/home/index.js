import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'

let state = {
    //商品分类的数据，仓库里面数据起始值要格外注意
    category: [],
    //首页轮播图的数据
    bannerList: [],
    //floor数据
    floorList: []
};
let mutations = {
    GETCATEGORY(state, category) {
        state.category = category
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
let actions = {
    //通过api里面的接口，向服务器发送请求，获取服务器的数据
    async getCategory({ commit, state, dispatch }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("GETCATEGORY", result.data)
        }
    },
    // 获取banner图的action
    async getBannerList({ commit, state, dispatch }) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    async getFloorlist({ commit, state, dispatch }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
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