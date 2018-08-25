import Vue from 'vue'
//跟组件
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router';
//导入首页组件
import Index from './components/01-index.vue';
//导入详情页面对组件
import Detail from './components/02.productDetail.vue'


//导入 element 组件（导包）
import ElementUI from 'element-ui';
//导入 element 组件（样式）
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


//引入iviewi
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//导入图片懒加载的包
import VueLazyload from 'vue-lazyload'

//图片懒加载的配置文件 也就是挂载到路由上
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/img/Snipaste_2018-08-25_11-51-39.png'),
  attempt: 1
})


// 注册全局过滤器
// 依赖于 moment.js
import moment from 'moment';
// 注册
Vue.filter('filterDate', function(val){
  return moment(val).format("YYYY年MM月DD日");
})


//告诉vue使用了 模块化
Vue.use(VueRouter)

//定义路由实例
let routes = [{
    path: '/',
    // component: Index
    //使用重定向
    redirect:'/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/detail/:id',
    component: Detail
  },
]


//实例化路由
let router = new VueRouter({
  routes 
})

//挂载到vue实例上
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  //路由对象
  router
}).$mount('#app')