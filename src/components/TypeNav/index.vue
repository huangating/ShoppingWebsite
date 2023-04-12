<template>



    <!-- 商品分类导航 -->
    <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveHandler" @click="goSearch">
                    <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
                    <!-- 过渡动画必须在外面包裹一个transition -->
              <transition name="sort">
               <div class="sort" v-show="show">
                    <div class="all-sort-list2">
                        <!-- 一级分类 -->
                        <div class="item "
                         v-for="(c1, index) in category" 
                         :key="c1.categoryId"
                        >
                            <h3 @mouseenter="enterHandler(index)"
                            :class="{active:currentIndex==index}">
                                <a 
                                :data-categoryName="c1.categoryName"
                                :data-category1Id="c1.categoryId"
                                >{{ c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix"
                                :style="{display:currentIndex==index?'block':'none'}"
                            >
                                <div class="subitem"
                                    v-for="(c2) in c1.categoryChild" 
                                    :key="c2.categoryId"
                                >
                                    <dl class="fore">
                                        <dt>
                                            <a 
                                               :data-categoryName="c2.categoryName"
                                               :data-category2Id="c2.categoryId" 
                                            >{{ c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <!-- 三级分类 -->
                                            <em v-for="c3 in c2.categoryChild"
                                                 :key="c3.categoryId"
                                                 >
                                                <a 
                                                   :data-categoryName="c3.categoryName"
                                                   :data-category3Id="c3.categoryId" 
                                                 >{{ c3.categoryName}}</a>
                                            </em>
                                           
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
              </transition>
               
                </div>

                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
</template>

<script>
//利用辅助函数获取仓库state数据--->mapState
import {mapState} from "vuex"
//按需引入
import throttle from "lodash/throttle"
export default {
    name:"TypeNav",
    data(){
        return{
            // 利用响应式存储，将来存储用户鼠标进入哪一个一级分类的索引值
            currentIndex:-1,
            show:true
        }
    }, 
    methods:{
        // 鼠标进入的方法
        enterHandler:throttle(function(index){
            // 修改响应式数据
            this.currentIndex=index
            //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
      //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
             //函数的防抖与节流技术
        },10),
        // 鼠标移出事件
        leaveHandler(){
            //鼠标移出高亮消失
            this.currentIndex=-1;
            // 鼠标离开：在search路由下在修改数据
            if(this.$route.path!="/home"){
                this.show=false;
            }
        },
        //全部商品分类鼠标进入
        changeShow(){
            // 鼠标进入：在search路由下，在修改数据
            if(this.$route.path!="/home"){
                this.show=true
            }
        },
        //将全部的子节点事件委派给父节点-》事件回调就一个
        // 编程式导航加上事件委派完成路由跳转
        goSearch(event){
            // 利用事件委派需要确定点的是a标签，需要专门去确认
            
            // 把子节点标签当中的a标签加上自定义属性，:data-categoryName="c2.categoryName"，其他节点没有
            // 获取到当前触发这个事件的节点，这个节点可能是不同的东西，带有data-categoryName就是a标签
            let targetNode = event.target;
            // console.log(targetNode);
            
            //节点有一个属性dataset,可以获取节点的自定义属性与属性值,这里返回的是一个对象,并且里面的属性名都是小写!!!
            //获取触发事件节点的自定义属性【a:data-categoryName】
            let{categoryname,category1id,category2id,category3id}=
            targetNode.dataset;
            // 判断点击的是a（不管是几级菜单）
            if(categoryname){
                //只要点击的是a就往search模块跳转
                var locations = {
                    name:"search",
                    query:{categoryName:categoryname},
                };
                //一级分类的a
                if(category1id){
                    locations.query.category1Id=category1id;
                }else if(category2id){
                    //二级分类的a 
                    locations.query.category2Id=category2id;
                }else{
                    //三级分类的a 
                    locations.query.category3Id=category3id;
                }
                // 点击商品分类按钮的时候，如果路径当中带params参数，需要合并携带给search
                if(this.$route.params.keyword){
                    locations.params=this.$route.params
                }
                //目前商品分类这里携带参数只要query参数
                this.$router.push(locations)
            }
            
        }
    },
    //组件挂载完毕，可以向服务器发送请求
    mounted(){
        //通知vuex发送请求，获取数据，存储于仓库中
        if(this.$route.path !="/home"){
            this.show=false
        }
    },
    computed:{
        ...mapState({
            category:(state)=>state.home.category
        })
    }
}
</script>

<style scoped lang="less">
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
            // 过渡动画样式
            .sort-enter{
                height: 0px;
                opacity: 0;
            }
            // 过渡动画结束状态
            .sort-enter-to{
                height: 461px;
                opacity: 1;
            }
            // 定义动画时间速率
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style> 