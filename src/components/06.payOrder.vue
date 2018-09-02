<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid" :options="{ size: 200 }"></qrcode>
                                </div>
                            </div>
                            <input type="button" value="跳转到支付页" @click="goPayOrder">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入二维码的包
import VueQrcode from "@xkeshi/vue-qrcode";

export default {
  name: "payOrder",
  data: function() {
    return {
      orderInfo: {}
    };
  },
  // 调用接口查询用户带过来的数据数据
  created() {
    this.$axios
      .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
      .then(response => {
        // console.log(response);
        this.orderInfo = response.data.message[0];
      });
    // 用定时器的方式 轮询 查询是否支付订单
    let interId = setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then(response => {
          //   console.log(response);
          // 判断状态为2就支付成功
          if (response.data.message[0].status == 2) {
            // 支付成功
            this.$Message.success("付完钱咯,等发货吧!!!(づ￣ 3￣)づ");
            setTimeout(() => {
              // 提示用户
            //   this.$router.push("/paySuccess");
               this.$router.push("/paySuccess/"+this.$route.params.orderid);//跳转到支付成功页面
            }, 500);
            // 跳转到下一页
            clearInterval(interId);
          } else {
            //   支付未成功
          }
        });
    }, 1000);
  },
  // 生成二维码
  components: {
    [VueQrcode.name]: VueQrcode
  },
  //   点击按钮调用这个方法去支付页
  methods: {
    goPayOrder() {
      window.open(
        "http://47.106.148.205:8899/site/validate/pay/alipay/" +
          this.$route.params.orderid
      );
    }
  }
};
</script>

<style>
</style>
