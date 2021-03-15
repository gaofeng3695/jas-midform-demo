<template>
  <div class="login-wrap">
    <div class="content">
      <div class="content-bg">
        <div class="login-title"></div>
        <div class="ms-login">
          <div style="height:1px"></div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="form">
            <el-form-item prop="userid">
              <el-input prefix-icon="fa fa-user" clearable v-model.number="ruleForm.userid" placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input prefix-icon="fa fa-lock" clearable type="password" placeholder="请输入密码" v-model="ruleForm.pass" @keyup.enter.native="submitForm('ruleForm')" auto-complete="new-password"></el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "Login",
  data: function () {
    return {
      ruleForm: {
        userid: "",
        pass: "",
        logintype: 0,
        radio: "1",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名称",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    encryption(txt) {
      var _str = txt;
      var _strLength = _str.length;
      var _strTarget = "";
      for (var i = 0; i < _strLength; i++) {
        _strTarget += String.fromCharCode(
          _str.charCodeAt(i) + (_strLength - i)
        );
      }
      return escape(_strTarget);
    },
    submitForm() {
      this._queryMenuData();
      0 &&
        this.$jasHttp
          .post(
            "/jasframework/login/login.do",
            {
              appId: "402894a152681ba30152681e8b320003",
              loginNum: this.ruleForm.userid || "superadmin",
              logintype: "0",
              pass: this.encryption(this.ruleForm.pass || "Bjg%rj1q"),
            },
            true
          )
          .then((data) => {
            this.$jasStorage.set("token", data.token);
            this.$jasStorage.set(
              "user",
              JSON.stringify({
                ...data.user,
                unitName: data.user.unitName.substr(
                  data.user.unitName.lastIndexOf(">") + 1,
                  data.user.unitName.length
                ),
              })
            );
            this._queryMenuData();
          });
      return;
    },
    _queryMenuData() {
      // var that = this; // 获取左侧菜单
      let isLocal = true;
      if (isLocal) {
        this.$jasStorage.set("menus", "");
        this.$router.push("/home");
      } else {
        this.$jasHttp
          .get("/jasframework/privilege/privilege/getAllUserFuntion.do", {
            // .get("/jasframework/privilege/privilege/getAllUserFuntion.do", {
            menutype: "0",
            appId: "402894a152681ba30152681e8b320003",
            language: "zh_CN",
          })
          .then((data) => {
            if (typeof data === "object" && data.length > 0) {
              // console.log(data);
              this.$jasStorage.set("menus", JSON.stringify(data));
            }
            this.$router.push("/home");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(./../../assets/module-login/login3.png) no-repeat center
    center;
  background-size: 100% 100%;
}

.content {
  margin: 0 auto;
  height: -webkit-calc(100% - 162px);
  height: -moz-calc(100% - 162px);
  height: calc(100% - 162px);
  position: relative;
}

.content-bg {
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  margin-top: 5%;
}

.login-title {
  width: 612px;
  height: 165px;
  background: url(./../../assets/module-login/login_title.png) no-repeat center
    center;
  background-size: 100% 100%;
  position: relative;
  margin: 0px auto;
}
.ms-login {
  width: 360px;
  height: 320px;
  background: url(./../../assets/module-login/loginbg1.png) no-repeat center
    center;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 3%;
  background-size: 100% 100%;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  /* height: 2.5em; */
  background: url(./../../assets/module-login/login_btn.png) no-repeat center
    center;
  background-size: 100% 100%;
  font-size: 1.3em;
}

.form {
  margin-top: 4em;
  padding: 0px 30px;
}

.el-form-item {
  margin-bottom: 2.5em !important;
  width: 86%;
  margin-left: 7%;
}

.form .login-btn {
  padding-top: 20px;
  width: 86%;
  margin-left: 7%;
}
</style>
