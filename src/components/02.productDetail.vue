<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜插件 -->
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="num1" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">

                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <!-- tab 区域 -->
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>

                            <!-- 内容区域 -->
                            <div class="tab-content entry" v-show="!showDiscuss" v-html="goodsinfo.content">

                            </div>
                            <div class="tab-content" v-show="showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="commentInfo" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="submitCommit" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | filterDate}}</span>
                                                    <!-- <Rate v-model="value" /> -->
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">

                                        <Page :total="totalCount" show-elevator show-sizer placement="top" :page-size-opts="[5, 6,10, 13, 26]" @on-change="pageChange" @on-page-size-change="pageSizeChange" />

                                        <!-- <Page :total="totalCount" show-elevator show-sizer placement="top" :page-size-opts="[5,6,10,13,16]" 
                                         @on-change="pageChange" 
                                         @on-page-size-change="pageSizeChange" /> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>

                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | filterDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>
        <!-- 加入购物车的结构 -->
        <img v-if="imglist.length!=0" class="moveImg" style="display:none" :src="imglist[0].original_path" alt="">
    </div>
</template>

<script>
// 导入jq
import $ from "jquery";

//导入axiso  用来请求数据（已抽离）

export default {
  name: "index",
  data: function() {
    return {
      productId: undefined, // 带过来的id
      goodsinfo: {}, //定义一个空对象 用来存储商品信息数据
      hotgoodslist: [], //定义一个空数组 用来存储热卖商品数据  右边的商品数据
      imglist: [], //定义一个空数组 用来存储图片数据
      num1: 0, //购买数量
      showDiscuss: false, // 是否显示评论 默认为false  默认显示 商品内容,

      //放大镜配置
      zoomerOptions: {
        zoomFactor: 6,
        pane: "container-round", //修改放大镜 框的样式
        hoverDelay: 300,
        namespace: "container-zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#ff3d00"
      },
      // 轮播图用的图片 默认的数据格式 不支持
      // 这里的数据 需要在接口调用完毕之后 才能够获取
      images: {
        normal_size: []
      },
      //   页码
      pageNum: 1,
      // 页容量
      pageSize: 10,

      // 拿到总条数 并默认显示为第0页
      totalCount: 0,
      // 保存请求回来的数据 评论数据
      comments: [],

      commentInfo: "" //评论内容数据
    };
  },
  methods: {
    //使用methods对外暴露方法
    //购物车增加数量
    handleChange(value) {
      //   console.log("改变了");
    },
    getProductDetail() {
      //把带过来的id保存
      this.productId = this.$route.params.id;

      //使用this.$axios发起请求
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.productId}`)
        .then(response => {
          // console.log(response);
          //拿数据 保存起来
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          // 处理放大镜数据
          let temArr = [];
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          //临时数组
          this.images.normal_size = temArr;
        });
    },
    getComments() {
      // 获取评论的方法
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.productId}?pageIndex=${
            this.pageNum
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          // console.log(response);
          this.comments = response.data.message;
          this.totalCount = response.data.totalcount;
        });
    },
    // 页码改变
    pageChange(page) {
      console.log(page);
      this.pageNum = page;
      this.getComments();
    },
    // 页容量改变 自动触发 页码改变 把页码改为1
    // 如果当前页码就是1 不会触发 pageChange
    pageSizeChange(size) {
      console.log(page);
      this.pageSize = size;
      if (this.pageNum == 1) {
        this.getComments();
      }
    },
    submitCommit() {
      if (this.commentInfo == "") {
        // 直接弹框
        this.$Message.error(
          "哥们,写点啥呗, 前端程序员不想理你 并且跑出了一个异常!!"
        );
        return;
      }
      this.$axios
        .post(`site/validate/comment/post/goods/${this.productId}`, {
          commenttxt: this.commentInfo
        })
        .then(response => {
          // console.log(response);
          //提示发表成功
          this.$Message.success(response.data.message);
          //发表成功后局部刷新
          this.getComments();
          // 评论完以后清空文本框
          this.commentInfo = "";
        });
    },
    //  加入购物车的逻辑
    //使用jq的offset来获取购物车的位置
    cartAdd() {
      // 当加入购车的数量为0时 下面代码不执行 并且提示一下
      if (this.num1 == 0) {
        this.$Message.error("哥们,买点呗,不买怎么加入购物车呀 (づ￣ 3￣)づ");
        return;
      }

      //1.读取购物车按钮所在的位置
      let cartOffset = $(".add").offset();
      console.log(cartOffset);
      // 获取目标位置（也就是购物车的位置）
      let targetOffset = $(".icon-cart").offset();
      console.log(targetOffset);
      //1.1使用动画的方式 移动图片
      //   先把图片移动到按钮位置 并显示出来 然后移动到，目标位置
      $(".moveImg")
        .stop()
        .show()
        .addClass("move")
        .css(cartOffset)
        .animate(targetOffset, 1000, function() {
          $(this)
            .hide()
            .removeClass("move");
        });
      // 调用挂载到VUE实例中的（$store）改变数据的方法
      // this.$store.commit("increment",10)
      this.$store.commit("addGoods", {
        goodId: this.productId,
        goodNum: this.num1
      });
    }
  },
  // 用this.$axios发起请求
  //使用生命周期函数  当页面加载时请求出数据
  created() {
    this.getProductDetail(); //   调用 获取数据的函数
    // 获取评论
    this.getComments();
  },
  //使用watch检测数据的改变
  watch: {
    $route(val, oldval) {
      // 认为让他 强制生成 v-if 数组长度
      // 数组长度为0 直接销毁
      this.images.normal_size = [];
      //盗用接口渲染左边的数据
      this.getProductDetail();
    }
  }
};
</script>

<style lang="less">
.tab-content img {
  width: 100%;
  display: block;
}
/*  放大镜图片样式  */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
.moveImg {
  position: absolute;
  width: 50px;
  //   display: none;
  // top: 0;
  // left: 0;
}

.moveImg.move {
  transition: transform 1s, opacity 1s;
  opacity: 0.5;
  transform: scale(0.2) rotate(720deg);
}
</style>
