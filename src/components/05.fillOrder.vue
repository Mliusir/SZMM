<template>
    <div>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <!-- status-icon 让输入框的后面 有提示图标 -->
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">

                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <!-- 省市联动 -->
                                    <el-form-item label="所属地区" prop="">
                                        <v-distpicker @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                        <span style="color:#666">手续费:0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                            <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                            <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in message" :key="item.id">
                                            <td width="68">
                                                <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                                <router-link :to="'/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>

                                                <!-- </a> -->
                                            </td>
                                            <td>
                                                <!-- <a target="_blank" href="/goods/show-89.html">{{item.title}}</a> -->
                                                <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注" prop="message">
                                                <el-input type="textarea" resize="none" :row="2" v-model="orderForm.message" style="width:500px"></el-input>
                                            </el-form-item>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                            <router-link to="/cart">返回购物车</router-link>
                                            <a id="btnSubmit" @click="sureOrder" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导入省市联动的插件
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  // 注册省市联动的组件
  components: { VDistpicker },
  //   省市联动的方法
  methods: {
    selected(value) {
      this.orderForm.area = value;
    },
    // 快递价格改变
    expressChange(price) {
        // 获取订单id
      this.orderForm.expressMoment = price;
    
    },
      // 提交订单
    sureOrder(){
        // 调用接口
        this.$axios.post("site/validate/order/setorder",this.orderForm).then(response=>{
            // console.log(response);
            let orderid = response.data.message.orderid;
               // 带着订单id去支付页
            this.$router.push('/payOrder/'+orderid);
            this.message.forEach(v=>{
                 // 删除vuex中的数据 跳转到支付页的时候清空购物车
                 this.$store.commit('deleteDoods',v.id);
            })
        })
    }
  },
  //   一创建就去获取数据
  created() {
    //   保存id
    this.orderForm.goodsids = this.$route.params.ids;
    //  调用接口去发送请求获取购买商品的数据
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        // console.log(response);
        // 计算总金额
        let total = 0;
        // 准备商品id对象
        let cargoodsobj = {};
        // 遍历数据然后拼接数据
        response.data.message.forEach(v => {
          //  遍历出总数量
          v.buycount = this.$store.state.cartDate[v.id];
          //  拿总数量乘以总金额
          v.totalamount = v.buycount * v.sell_price;
          // 累加总金额
          total += v.totalamount;
          // 增加键值对
          cargoodsobj[v.id] = v.buycount;
        });
        //  把遍历出的数据赋值给message
        this.message = response.data.message;
        // 把数据赋值到数据中
        this.orderForm.goodsAmount = total;
        // 添加到 orderForm中即可
        this.orderForm.cargoodsobj = cargoodsobj;
      });
  },
  //  使用计算属性来计算选了多少件商品
  computed: {
    //   总数量
    totalCount() {
      let totalCount = 0;
      this.message.forEach(v => {
        totalCount += v.buycount;
      });
      return totalCount;
    }
  },
  data: function() {
    //   自定义一个检测手机的验证
    var checkMobile = (rule, value, callback) => {
      setTimeout(() => {
        // 定义正则规则
        let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (exec.test(value) == true) {
          // 正确的时候干的事情
          callback();
        } else {
          callback(new Error("你的手机号不对"));
        }
      }, 1000);
    };
    // 邮箱
    var checkEmail = (rule, value, callback) => {
      // 如果value 不为空 格式验证
      if (value.trim().length != 0) {
        // 验证
        // 邮箱的正则
        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮箱"));
        }
      } else {
        callback();
      }
    };
    // 邮编
    var checkPostCode = (rule, value, callback) => {
      // 如果value 不为空 格式验证
      if (value.trim().length != 0) {
        // 验证
        // 邮遍的正则
        let exec = /^[1-9]\d{5}(?!\d)$/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮遍"));
        }
      }
    };
    return {
      orderForm: {
        goodsAmount: 0, // 总金额
        expressMoment: 20, // 快递费
        accept_name: "", // 收货人姓名,
        accept_name: "", // 收货人姓名,
        area: {
          //省市区
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        }, // 省市区
        address: "", //详细地址
        mobile: "", //手机
        phone: "", //联系电话
        email: "", //邮箱
        post_code: "", // 邮编
        payment_id: "6", //支付方式
        express_id: "1", // 快递
        message: "输入要bb的内容(最多100字)",
        goodsids: "", //购买的商品id,
        cargoodsobj: {}, // 购买的商品 id 跟件数的关系
        phone: "" // 联系电话
      },
      message: [], // 购买的商品数据回来是声明一个空数组保存
      // 更字段相对应
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        // 地址的验证规则
        address: [
          {
            required: true,
            message: "请输入地址,没有我送给谁呀",
            trigger: "blur"
          }
        ],
        mobile: [{ validator: checkMobile, trigger: "blur" }],
        // 邮箱验证
        email: [{ validator: checkEmail, trigger: "blur" }],
        // 邮编验证
        post_code: [{ validator: checkPostCode, trigger: "blur" }]
      }
    };
  }

  //   beforeCreate() {
  //     this.$axios("site/account/islogin").then(response => {
  //       // console.log(response);
  //       // 判断是否是登录进来下单页面的
  //       if (response.data.code == "nologin") {
  //         // 不是那就打会登录
  //         this.$router.push("/login");
  //       }
  //     });
  //   }
};
</script>

<style>
</style>
