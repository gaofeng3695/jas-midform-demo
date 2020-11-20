<template>
  <div style="height:100%;" class="jas-flex-box is-vertical menuwrapper">

    <div class="is-grown menusubwrap" :style="menuStyle" ref="menubar">
      <div>

        <el-menu unique-opened :default-active="currentTap" class="el-menu-vertical-demo" @select="selectMenu" :collapse="!isExpend">
          <!-- 第一层菜单开始 -->
          <!-- tip:为什么不用递归渲染？因为vue组件递归的方式跟elementui提供的可收缩菜单插件相冲突，若要使用递归，就必须取消菜单可收缩的功能 -->
          <div v-for="item in items" :key="item">
            <el-submenu v-if="item.subs" :index="item.index">
              <div slot="title">
                <i :class="item.icon||'fa fa-folder' "></i>
                <span slot="title">{{ item.title }}</span>
              </div>
              <!-- 第二层菜单开始 -->

              <div v-for="subitem in item.subs" :key="subitem">
                <el-submenu v-if="subitem.subs" :index="subitem.index">
                  <div slot="title">
                    <i :class=" subitem.icon "></i>
                    <span slot="title">{{ subitem.title }}</span>
                  </div>

                  <!-- 第三层菜单开始 -->
                  <div v-for="thirditem in subitem.subs" :key="thirditem">
                    <el-submenu v-if="thirditem.subs" :index="thirditem.index">
                      <div slot="title">
                        <i :class="thirditem.icon"></i>
                        <span slot="title">{{ thirditem.title }}</span>
                      </div>
                      <!-- 第四层菜单开始 -->
                      <div v-for="fourthitem in thirditem.subs" :key="fourthitem">
                        <el-submenu v-if="fourthitem.subs" :index="fourthitem.index">
                          <div slot="title">
                            <i :class="fourthitem.icon"></i>
                            <span slot="title">{{ fourthitem.title }}</span>
                          </div>

                          <!-- 第五层菜单开始 -->
                          <div v-for="fifthitem in fourthitem.subs" :key="fifthitem">
                            <el-submenu v-if="fifthitem.subs" :index="fifthitem.index">
                              <div slot="title">
                                <i :class="fifthitem.icon"></i>
                                <span slot="title">{{ fifthitem.title }}</span>
                              </div>

                            </el-submenu>
                            <el-menu-item :index="fifthitem.index" v-else>
                              <i :class="fifthitem.icon"></i>
                              <span slot="title">{{ fifthitem.title }}</span>
                            </el-menu-item>
                          </div>
                          <!-- 第五层菜单结束 -->

                        </el-submenu>
                        <el-menu-item :index="fourthitem.index" v-else>
                          <i :class="fourthitem.icon"></i>
                          <span slot="title">{{ fourthitem.title }}</span>
                        </el-menu-item>
                      </div>
                      <!-- 第四层菜单结束 -->
                    </el-submenu>
                    <el-menu-item :index="thirditem.index" v-else>
                      <i :class="thirditem.icon"></i>
                      <span slot="title">{{ thirditem.title }}</span>
                    </el-menu-item>
                  </div>
                  <!-- 第三层菜单结束 -->

                </el-submenu>
                <el-menu-item :index="subitem.index" v-else>
                  <i :class="subitem.icon "></i>
                  <span slot="title">{{ subitem.title }}</span>
                </el-menu-item>
              </div>
              <!-- 第二层菜单结束 -->

            </el-submenu>
            <el-menu-item :index="item.index" v-else>
              <i :class=" item.icon||'fa fa-folder' "></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
          <!-- 第一层菜单结束 -->
          <!-- <nav-menu :nav-menus="items" /> -->
        </el-menu>

      </div>

    </div>
    <div class="switchwrapper" @click="isExpend=!isExpend">

      <i v-show="isExpend" class="fa fa-angle-left" aria-hidden="true"></i>
      <i v-show="!isExpend" class="fa fa-angle-right" aria-hidden="true"></i>

    </div>

  </div>

</template>
<script>
export default {
  components: {},
  data() {
    return {
      items: [],
      currentTap: "",
      isExpend: true,
      menuWith: 200,
    };
  },
  computed: {
    menuStyle() {
      return {
        width: !this.isExpend ? "64px" : (this.menuWith || 200) + "px",
      };
    },
  },
  methods: {
    selectMenu() {},
    _queryMenuData() {
      // var that = this; // 获取左侧菜单
      return;

      // var url =
      //   jasTools.base.rootPath +
      //   "/jasframework/privilege/privilege/getAllUserFuntion.do";

      // this.$jasHttp
      //   .post("/cloudlink-core-framework/login/login", {
      //     menutype: "0",
      //     appId: that.appId,
      //     language: "zh_CN",
      //   })
      //   .then((res) => {
      //     if (res.data.success === 1) {
      //       this.$jasStorage.set("token", res.data.token);
      //       this.$jasStorage.set("userInfo", res.data.rows[0]);

      //       // 可以直接登录
      //     } else {
      //       this.loginSwitcher = true;
      //       this.$notify({
      //         message: res.data.msg || "服务器连接失败，请您稍后再试",
      //         type: "error",
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     this.$notify({
      //       message: "服务器连接失败，请您稍后再试",
      //       type: "error",
      //     });
      //     console.log("err", err);
      //   });

      // $.ajax({
      //   url: url + "?token=" + localStorage.getItem("token"),
      //   type: "get",
      //   async: true,
      //   data: {
      //     menutype: "0",
      //     appId: that.appId,
      //     language: "zh_CN",
      //   },
      //   success: function (data, xhr, param) {
      //     if (typeof data === "object" && data.length > 0) {
      //       that.items = that._formatMenus(data);
      //       if (!that.currentTap || that.currentTap == 0) {
      //         that.currentTap = that._getFirstMenuId(that.items);
      //         that.menusOpened = [that.currentTap];
      //       }
      //       that.tabs = that._createTabsArr(that.menusOpened, that.items);
      //     }
      //   },
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.menuwrapper {
  border-right: solid 1px #e6e6e6;
  overflow: hidden;
}

.menusubwrap {
  transition: width 0.5s;
  overflow: auto;
  width: 200px;
}

.el-menu-vertical-demo.el-menu {
  overflow: hidden;
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}

.switchwrapper {
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  height: 40px;
  box-sizing: border-box;
  border-top: solid 1px #1f2630;
  font-size: 16px;
  color: #e1e1e1;
}
</style>