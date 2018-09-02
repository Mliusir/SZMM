<template>

    <div>
        <!-- 头部结构 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>黑马买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span v-show="$store.state.isLogin==false">
                            <!-- <a href="" class="">登录</a> -->
                            <router-link to="/login">登录</router-link>
                            <strong>|</strong>
                            <a href="" class="">注册</a>
                            <strong>|</strong>
                        </span>
                        <span v-show="$store.state.isLogin==true">
                            <!-- <a href="" class="">会员中心</a> -->
                            <router-link to="/vipCenter">会员中心</router-link>
                            <strong>|</strong>
                            <a @click="logout">退出</a>
                            <strong>|</strong>
                        </span>
                        <router-link to="/cart">
                            <i class="iconfont icon-cart"></i>购物车(
                            <span id="shoppingCartCount">
                                <span>{{$store.getters.goodsCout}}</span>
                            </span>)
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <router-link to="/index">
                                    <span class="out" style="top: 0px;">首页</span>
                                </router-link>

                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">黑马超市</span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </a>
                            </li>
                            <li class="goods">
                                <a href="" class="">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 路由出口 -->
        <router-view></router-view>

        <!-- 底部结构 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 模态框 弹出对话 -->
        <Modal v-model="isShow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <!-- 字体图标可要可不要 -->
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span>确定要退出登录？？？？</span>
            </p>
            <div style="text-align:center">
                <p>登出了之后,只有重新登录才能够回来啦,你确定你记得密码?</p>
            </div>
            <div slot="footer" style="display:flex;justify-content: center">
                <Button type="error" size="large" @click="sureExit">确认</Button>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type="error" size="large" @click="isShow=false">取消</Button>
            </div>
        </Modal>
    </div>

</template>

<script>
//导入jq
import $ from "jquery";

export default {
  name: "container",
  data: function() {
    return {
      isShow: false
    };
  },
  //   根据模态框的提示决定是否调用接口
  methods: {
    logout() {
      this.isShow = true;
    },
    sureExit() {
      // 当退出登录时点击确认按钮关闭模态框
      this.isShow = false;
      // 调用登出接口 修改登出
      this.$axios.get("site/account/logout").then(response => {
        // console.log(response);
        // 判断点击确认后 那就退出
        if (response.data.status == 0) {
          // 如果等于0那么就退出登录
          // 调用VueX
          this.$store.commit("changeLoginStatus", false);

          // 登录成功后跳转到你来的那个页面
          this.$router.push("/index");
        }
      });
    }
  }
};
//jq动画代码
$(document).ready(function() {
  $("#menu2 li a").wrapInner('<span class="out"></span>');
  $("#menu2 li a").each(function() {
    $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
  });

  $("#menu2 li a").hover(
    function() {
      $(".out", this)
        .stop()
        .animate({ top: "48px" }, 300); // move down - hide
      $(".over", this)
        .stop()
        .animate({ top: "0px" }, 300); // move down - show
    },
    function() {
      $(".out", this)
        .stop()
        .animate({ top: "0px" }, 300); // move up - show
      $(".over", this)
        .stop()
        .animate({ top: "-48px" }, 300); // move up - hide
    }
  );
});
</script>

<style>
@import url("./assets/statics/site/css/style.css");
/* 导入jq样式 */
@import url("./assets/lib/css/style.css");
/* 覆盖默认的背景图片 */
#menu2 {
  background-image: none;
}
body {
  background-color: transparent;
}
</style>
