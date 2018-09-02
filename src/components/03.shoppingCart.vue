<template>
    <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,.5)">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="message.length==0">
                                    <!-- 没有山商品是显示 -->
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <!-- <a href="/index.html">马上去购物</a>吧！ -->
                                                    <router-link to="/index">马上去购物</router-link>吧！
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="black" inactive-color="hotpink">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img style="width:65px" :src="item.img_url" alt="">
                                    </td>
                                    <td>
                                        {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <!-- $event 保留事件的参数 在后面增加自定义的参数 -->
                                        <el-input-number size="mini" :min="0" v-model="item.buycount" @change="numChange($event,item.id)"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>

                                    <td>
                                        <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <!-- 跳转到首页继续购物 -->
                            <router-link to="/index">
                                <button class="button">继续购物</button>
                            </router-link>

                            <!-- 跳转到登录页 -->
                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  // 在开发者能看到的组件名字
  name: "shoppingCart",
  data: function() {
    return {
      message: [], //定义一个空数组用来保存请求回来的数据
      //   去登录的时候显示遮罩层
      loading: false // 是否正在加载中
    };
  },
  // 使用生明周期函数渲染
  created() {
    // 定义一个变量暂存id
    let cartDate = this.$store.state.cartDate;
    // 定义拼接的数据
    let ids = "";
    for (const key in cartDate) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, -1); //从0开始去掉,逗号而第二个参数 是最后一个不要（相当于length减一）;
    console.log(ids);

    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      //console.log(response);
      //因为服务器返回的数据 没有购买数量 他们也不知道我们自行拼接个数
      response.data.message.forEach(v => {
        //把从后台拿到的数据循环遍历出购买数量
        v.buycount = cartDate[v.id];
        v.selected = true;
      });
      // 然后在赋值给message
      this.message = response.data.message;
    });
  },
  //   使用Vue计算属性 来计算商品总金额
  computed: {
    // 总金额
    totalPrice() {
      let totalPrice = 0; //获取被选中的数量
      this.message.forEach(v => {
        if (v.selected == true) {
          totalPrice += v.sell_price * v.buycount; //拿总数乘以个数
        }
      });
      return totalPrice;
    },
    // 总个数
    totalCount() {
      let totalCount = 0; //获取被选中的数量
      this.message.forEach(v => {
        if (v.selected == true) {
          totalCount += parseInt(v.buycount); //总个数
        }
      });
      return totalCount;
    }
  },
  methods: {
    numChange(num, id) {
      console.log(num, id);
      // 调用仓库的方法(提交载荷)
      this.$store.commit("updateGoodsNum", {
        goodId: id,
        goodNum: num
      });
    },
    //   删除数据
    delOne(id) {
      // console.log(id);
      this.$store.commit("deleteDoods", id);
      this.message.forEach((v, index) => {
        if (v.id == id) {
          this.message.splice(index, 1);
        }
      });
    },
    //验证是否登录
    checkAndSubmit() {
      // 判断是否有选购商品如果为0 就那就没选（穷）
      if (this.totalPrice == 0) {
        this.$Message.warning("什么都不买(真穷)!!!!!!");
        return; //没登录下面代码不执行
      }

      let ids = "";
      this.message.forEach(v => {
        if (v.selected == true) {
          ids += v.id;
          ids += ",";
        }
      });
      // 去掉最后一个
      ids = ids.slice(0, -1);
      this.$router.push(`/order/${ids}`);

      //以下代码使用；路由守卫替换
      // 弹框提示 loading框
      //this.loading = true;//(显示遮罩层)

      //       setTimeout(()=>{
      //             // 判断是否有的登录
      //     this.$axios('site/account/islogin').then(response=>{
      //         this.loading = false;//（数据回来后消失遮罩层）
      //         // console.log(response);
      //         // 没有登录去登录页
      //         if(response.data.code == "nologin"){

      //             this.$router.push('/login');
      //         }else{
      //             this.$router.push('/order')
      //         }
      //     },3500)
      //   })
    }
  }
};
</script>

<style>
</style>
