import Vue from 'vue';
//根组件
import App from './App.vue';
//导入路由
import VueRouter from 'vue-router';
//导入首页组件
import Index from './components/01-index.vue';
//导入详情页面对组件
import Detail from './components/02.productDetail.vue';
// 导入购物车页面
import shoppingCart from './components/03.shoppingCart.vue';
//导入 element 组件（导包）
import ElementUI from 'element-ui';
//导入 element 组件（样式）
import 'element-ui/lib/theme-chalk/index.css';
// 去登陆的路由
import Login from './components/04.login.vue';
// 登录完成后去下单页面
import FillOrder from './components/05.fillOrder.vue';
// 导入支付页面
import PayOrder from './components/06.payOrder.vue';
// 导入支付成功的页面
import PaySuccess from './components/07.paySuccess.vue';
// 导入会员中心的页面
import VipCenter from './components/08.vipCenter.vue';
// 导入订单交易页面
import OrderList from './components/09.orderList.vue';
// 导入查看商品详情的页面 支付详情
import OrderDetail from './components/10.orderDetail.vue';

Vue.use(ElementUI);


//引入iviewi
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//抽离axiox
import axios from 'axios';
Vue.prototype.$axios = axios;
//抽离axios的公共网址
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://47.106.148.205:8899';

//导入图片懒加载的包
import VueLazyload from 'vue-lazyload'
//图片懒加载的配置文件 也就是挂载到路由上
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/img/Snipaste_2018-08-25_11-51-39.png'),
  attempt: 1
})


//导入放大镜的包
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer);


// 注册全局过滤器
// 依赖于 moment.js
import moment from 'moment';
// 注册
Vue.filter('filterDate', function (val,formatStr) {
  if(formatStr!=undefined){
    // 显示时分秒
    return moment(val).format(formatStr)
  }else{
    // 显示年月日
    return moment(val).format("YYYY年MM月DD日");
  }
})


//导入VueX的包
import Vuex from 'vuex';
Vue.use(Vuex);
// 实例化一个Store 仓库
const store = new Vuex.Store({
  state: {
    // count: 666
    cartDate: JSON.parse(window.localStorage.getItem('goodkey')) || {},
    isLogin: false,
    fromPath: ''
  },
  mutations: {
    // increment (state,n) {
    //   state.count+=n
    // }
    addGoods(state, goodInfo) {

      if (state.cartDate[goodInfo.goodId] == undefined) {

        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    // 额外的增加一个修改购物车同步累加的方法
    updateGoodsNum(state, goodInfo) {
      console.log(goodInfo);

      //  通过carDate这个数组来拿id
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    //  额外的新增一个删除的方法
    // goodId 就是商品里的id
    deleteDoods(state, goodId) {
      // delete删除对象中的属性
      // delete state.cartDate[goodId];
      Vue.delete(state.cartDate, goodId);
    },
    // 切换登录状态
    changeLoginStatus(state, isLogin) {
      state.isLogin = isLogin;
    },
    // 增加一个保存来时地址的方法
    saveFromPath(state, fromPath) {
      state.fromPath = fromPath; //你来时的地址等于你来时的地址 快速赋值
    }
  },
  getters: { // getters他是state的计算属性
    goodsCout: state => {
      console.log(state);
      // 临时num
      let num = 0;
      // 循环对象
      for (const key in state.cartDate) {
        num += state.cartDate[key]
      }
      // 返回总数
      return num;
    }
  },
})

// 当浏览器页面关闭（刷新）保存到本地
window.onbeforeunload = function () {
  window.localStorage.setItem('goodkey', JSON.stringify(store.state.cartDate));
}

//告诉vue使用了 模块化
Vue.use(VueRouter);

//定义路由实例
let routes = [{
    path: '/',
    // component: Index
    //使用重定向
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/detail/:id',

    component: Detail
  },
  { //购物车的路由
    path: '/cart',

    component: shoppingCart
  },
  { //首页登录
    path: '/login',

    component: Login
  },
  { //下单页面
    path: '/order/:ids',

    component: FillOrder,
    meta:{
      isLogin:true
    }
  },
  { //付费页面
    path: '/payOrder/:orderid',
    component: PayOrder,
    meta:{
      isLogin:true
    }
  },
  { //支付成功的页面
    path: '/paySuccess/:id',
    component: PaySuccess,
    meta:{ // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      isLogin:true
    }
  },
  { //支付成功会员中心的页面
    path: '/vipCenter',
    component: VipCenter,
    meta:{ // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      isLogin:true
    }
  },
  { //订单交易的页面的页面
    path: '/orderList',
    component: OrderList,
    meta:{ // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      isLogin:true
    }
  },
  { //支付详情页面
    path: '/orderDetail/:id',
    component: OrderDetail,
    meta:{ // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      isLogin:true
    }
  },
]


//实例化路由
let router = new VueRouter({
  routes
})

// 使用守卫导航
router.beforeEach((to, from, next) => {
  // 每次过来都保存一下来时的地址
  // 提交载荷 保存数据
  store.commit('saveFromPath', from.path);

  // 判断 是否去的是order
  if (to.meta.isLogin==true) {
    //调用接口拿数据
    axios.get('site/account/islogin').then(response => {
      // 通过判断是否已登录 
      if (response.data.code != 'nologin') {

        next() //登录过了就直接进入login

      } else {
        // 没登录就去登录页
        next('/login')
      }
    })
  } else {

    next();

  }
  // console.log('to',to);
  // console.log('from',from);

  // next()
})


//挂载到vue实例上
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  //路由对象
  router,
  // 在实例化的时候传入store对象 (挂到Vue身上)
  store,

  beforeCreate() {
    // console.log('你爷爷被创建了');
    axios.get('site/account/islogin').then(response => {
      // console.log(response);
      if (response.data.code == 'logined') {
        // 等于那就登录成功
        // store.state.isLogin = true;
        store.commit('changeLoginStatus',true)
      } 
    })
  }


}).$mount('#app')