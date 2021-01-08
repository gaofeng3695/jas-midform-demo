<template>
  <el-container style="height:100%;">
    <el-header>
      <HomeHeader />
    </el-header>
    <el-container style="height: 0%;">
      <el-aside id="aside" style="background-color: #344052;width:auto;">
        <HomeSider @menuclick="clickMenu" />
      </el-aside>
      <el-main>
        <el-container style="height:100%">
          <div style="flex:1;width:100%;">

            <el-tabs id="tabs" style="position:relative" class="tabswrapper" v-model="currentTap" type="card" @tab-remove="removeTab">
              <el-popover ref="popover" placement="bottom" trigger="hover">
                <el-dropdown-item @click.native="handleTabsOptions(1)">刷新当前选项卡</el-dropdown-item>
                <el-dropdown-item @click.native="handleTabsOptions(2)">关闭当前选项卡</el-dropdown-item>
                <el-dropdown-item @click.native="handleTabsOptions(3)">关闭其他选项卡</el-dropdown-item>
                <el-dropdown-item @click.native="handleTabsOptions(4)">关闭所有选项卡</el-dropdown-item>
              </el-popover>
              <el-tab-pane v-for="(item) in tabs" :key="item.name" :name="item.name" :closable="item.closable">
                <span slot="label">
                  <i v-show="currentTap == item.name" :class="item.icon||'fa fa-bookmark'"></i> {{item.title}}
                </span>
                <!-- <div class="iframewrapper">
                <div class="iframesubwrapper">
                  <iframe class="iframe" :src="item.link" frameborder="0" height="100%"></iframe>
                </div>
              </div> -->
              </el-tab-pane>
              <!-- <div v-tabclose></div> -->
            </el-tabs>
            <div style="width:100%;height:calc( 100% - 41px );background:#f900;">
              <transition name="move" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </div>

        </el-container>
      </el-main>
    </el-container>

  </el-container>
</template>
<script>
import HomeHeader from "./HomeHeader.vue";
import HomeSider from "./HomeSider.vue";
export default {
  components: {
    HomeHeader,
    HomeSider,
  },
  data() {
    return {
      tabs: [],
      currentTap: "",
    };
  },
  methods: {
    clickMenu(index, oMenu) {
      var newTap = "";
      this.tabs.forEach(function (item) {
        //循环打开的标签页，判断选中的菜单是否带开过
        if (item.name === index) {
          newTap = index;
        }
      });
      if (!newTap) {
        this.tabs.push({
          title: oMenu.title,
          name: index,
          link: oMenu.link,
          icon: oMenu.icon,
          closable: oMenu.closable,
        });
      }
      this.currentTap = index;
      this.$router.push("/home/demo");
    },
    removeTab(targetName) {
      var tabs = this.tabs;
      var activeName = this.currentTap;
      //如果当前显示的tab页被删除，更改当前显示的tab页为下一页
      if (activeName === targetName) {
        tabs.forEach(function (tab, index) {
          if (tab.name === targetName) {
            var nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      //设定当前显示的tab页
      this.currentTap = activeName;
      //在原数组中删除这个要被删除的tab
      this.tabs = tabs.filter(function (tab) {
        return tab.name !== targetName;
      });
    },
    handleTabsOptions(index) {
      var that = this;
      if (index == 1) {
        var id = "pane-" + this.currentTap;
        document
          .getElementById(id)
          .querySelector("iframe")
          .contentWindow.location.reload(true);
      }
      if (index == 2) {
        // 关闭当前选项卡
        this.removeTab(this.currentTap);
      }
      if (index == 3) {
        this.tabs = this.tabs.filter(function (tab) {
          return tab.name == that.currentTap || !tab.closable;
        });
      }
      if (index == 4) {
        this.tabs = this.tabs.filter(function (item) {
          return !item.closable;
        });
        this.currentTap = this.tabs[0] ? this.tabs[0].name : undefined;
      }
      this.$refs.popover.showPopper = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0;
}

.tabswrapper {
  width: 100%;
  height: 41px;
  background: #fff;
}

.tabswrapper .el-tabs__header {
  /* padding: 0 10px; */
  max-height: 41px;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  background: #fff;
}

.tabswrapper .el-tabs__content {
  width: 100%;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.tabswrapper .el-tabs__content .el-tab-pane {
  height: 100%;
}
</style>