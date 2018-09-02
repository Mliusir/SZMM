<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model="name" placeholder="请输入用户名"></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      name: "admin",
      password: "123"
    };
  },
  //查询账号密码是否正确
  methods: {
    login() {
      // 页面一加载数据就显示进度条
      this.$Loading.start();

      this.$axios
        .post("site/account/login", {
          user_name: this.name,
          password: this.password
        })
        .then(response => {
          // console.log(response);
          // 修改载荷
          if (response.data.status == 0) {
            this.$store.commit("changeLoginStatus", true);

            // 登录成功后 跳转到原来你点登录的那个页面
            this.$router.push(this.$store.state.fromPath);
          }
          this.$Loading.finish(); // 当数据回来时进度条消失
        })
        .catch(response => {
          this.$Loading.error();
        });
    }
  }
};
</script>

<style>
</style>
