<template>
  <!-- header 开始 -->
  <div class="header headerwrapper">
    <div class="logo item">
    </div>
    <div class="name item">
      <!-- 中盈安信基础服务一体化平台 -->
      <div class="china"> 内蒙古自治区油气长输管道安全监管系统</div>
      <div class="english">Inner Mongolia autonomous region oil and gas pipeline safety supervision system</div>
    </div>
    <ul class="user-info">
      <li class="items quit">
        <a @click="_loginOut" style="display:block;padding:0px 10px">
          <i class="fa fa-sign-out"></i> 退出
        </a>
      </li>
      <li class="border"></li>
      <li class="items fullscreen">
        <a @click="_goFullscreen" style="display:block;padding:0px 10px">
          <i class="fa fa-arrows-alt"></i> 全屏
        </a>
      </li>
      <li class="border"></li>
      <li class="items fullscreen">
        <a @click="changeLayout" style="display:block;padding:0px 10px">
          <i class="fa fa-columns"></i> 布局
        </a>
      </li>
      <li class="border" v-if="projectOid"></li>
      <li class="items fullscreen" v-if="projectOid">
        <a @click="backToDesk" style="display:block;padding:0px 10px">
          <i class="fa fa-desktop"></i> 工作桌面
        </a>
      </li>
      <li class="border" v-if="isGoPage"></li>
      <li class="items fullscreen" v-if="isGoPage">
        <a href="#" @click="_goPage" style="display:block;padding:0px 10px">
          <i class="fa fa-bar-chart"></i> 可视化
        </a>
      </li>
      <li class="border"></li>
      <li class="items fullscreen">
        <a href="#" @click="_goTodo" style="display:block;padding:0px 10px">
          <el-badge :hidden="todoNum == 0" :value="todoNum" class="item" type="warning">
            <i class="fa  fa-bell-o"></i>
          </el-badge>
        </a>
      </li>
      <li class="border"></li>
      <li class="items">
        <a style="display:block">
          <el-dropdown class="dropdown-wrapper" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <img class="user-logo" src="./../../../assets/module-home/enterlogo.png">
              <div class="userInfo">
                <div class="username">{{username}}</div>
                <div class="userunit">{{userunit}}</div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!--<el-dropdown-item command="fullscreen">切换全屏</el-dropdown-item>-->
              <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
              <!-- <el-dropdown-item command="changeLayout">切换布局</el-dropdown-item> -->
              <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
              <!--<el-dropdown-item command="loginout">退出登录</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
        </a>
      </li>
    </ul>
  </div>
  <!-- header 结束 -->
</template>
<script>
export default {
  data() {
    return {
      projectOid: "",
      isGoPage: "",
      userImg: "",
      todoNum: 0,
      username:
        this.$jasStorage.get("user") &&
        JSON.parse(this.$jasStorage.get("user")).userName,
      userunit:
        this.$jasStorage.get("user") &&
        JSON.parse(this.$jasStorage.get("user")).unitName,
    };
  },
  methods: {
    handleCommand() {},
    _loginOut() {},
    _goFullscreen() {},
    changeLayout() {},
    backToDesk() {},
    _goPage() {},
    _goTodo() {},
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  height: 60px;
  font-size: 22px;
  /*line-height: 80px;*/
  color: #fff;
  margin: 0 -20px 0 -20px;
  overflow: hidden;
}
.headerwrapper {
  background: #344052;
  /* background: #409EFF; */
  border-bottom: 1px solid #1f2630;
}
.logo {
  width: 60px;
  background: url(./../../../assets/module-home/logo-meng.png) no-repeat center
    center;
  background-size: 30px;
  margin: 0 0px 0 10px;
}

.name .china {
  height: 30px;
  font-size: 20px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: 11px;
  text-align: left;
}

.name .english {
  font-weight: 700;
  text-align: center;
  line-height: 28px;
  height: 30px;
  font-size: 8px;
  letter-spacing: 1px;
}

.item {
  height: 60px;
  /*line-height: 60px;*/
  color: #ececec;
  float: left;
}

.user-info {
  float: right;
  /*padding-right: 30px;*/
  font-size: 14px;
  color: #fff;
  /*line-height: 40px;*/
  height: 60px;
}

.user-info .dropdown-wrapper {
  /*margin-top: 20px;*/
  height: 60px;
  /*line-height: 40px;*/
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info li {
  list-style: none;
  display: inline-block;
  float: right;
}

a {
  color: #ececec;
}

a:hover {
  background: #1f2630;
}

.user-info .quit {
  height: 60px;
  line-height: 60px;
  /*padding: 0px 10px;*/
  /*margin: 10px 0px;

	border-left: 2px solid #5fb8ff;*/
  cursor: pointer;
}

.border {
  height: 30px;
  margin: 15px 0px;
  line-height: 30px;
  color: #5fb8ff;
  border-left: 1px solid #1f2630;
  width: 2px;
}

.user-info .fullscreen {
  height: 60px;
  line-height: 60px;
  /*padding: 0px 10px;*/
  /*margin: 10px 0px;

	border-left: 2px solid #5fb8ff;*/
  cursor: pointer;
}

.userInfo {
  font-size: 12px;
  height: 40px;
  padding: 10px 10px 10px 0px;
}

.username,
.userunit {
  height: 20px;
  line-height: 20px;
}

.el-dropdown-menu__item {
  text-align: center;
}

.el-select {
  margin-left: 20px;
  line-height: 20px;
}
</style>