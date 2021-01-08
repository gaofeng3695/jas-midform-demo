<template>
  <div style="height:100%;" class="jas-flex-box is-vertical menuwrapper">

    <div class="is-grown menusubwrap" :style="menuStyle" ref="menubar">

      <el-scrollbar :wrap-style="{height:'calc( 100% + 17px )'}" :view-style="{height:'calc ( 100% + 17% )'}" style="height: 100% ">
        <el-menu unique-opened :default-active="currentTap" class="el-menu-vertical-demo" @select="selectMenu" :collapse="!isExpend">
          <JasSideMenu :menus="items"></JasSideMenu>
        </el-menu>
      </el-scrollbar>

    </div>
    <div class="switchwrapper" @click="isExpend=!isExpend">

      <i v-show="isExpend" class="fa fa-angle-left" aria-hidden="true"></i>
      <i v-show="!isExpend" class="fa fa-angle-right" aria-hidden="true"></i>

    </div>

  </div>

</template>
<script>
import JasSideMenu from "./components/JasSideMenu";

export default {
  components: {
    JasSideMenu,
  },
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
  mounted() {
    this._queryMenuData();
  },
  methods: {
    selectMenu(index) {
      console.log(index);
      this.$emit(
        "menuclick",
        index,
        this._getMenuInfoByIndex(index, this.items)
      );
    },
    _getMenuInfoByIndex(index, aMenu) {
      var _icon = "";
      var _title = "";
      var _closable = true;
      var _link = "";
      var isGetResult = false;

      var getTitle = function (index, aMenu) {
        for (var i = 0; i < aMenu.length; i++) {
          var item = aMenu[i];

          if (item.subs) {
            //如果有子集递归处理

            if (!isGetResult) {
              _icon = item.icon;
              _title = item.title;
              getTitle(index, item.subs);
            }
          } else {
            if (index === item.index) {
              isGetResult = true;
              _icon = item.icon;
              _title = item.title;
              _link = item.link;
              _closable = item.closable !== false ? true : false;
              return;
            }
          }
        }
      };
      getTitle(index, aMenu);
      return {
        icon: _icon,
        title: _title,
        closable: _closable,
        link: _link || "",
      };
    },
    _queryMenuData() {
      var that = this; // 获取左侧菜单

      this.$jasHttp
        .get("/jasframework/privilege/privilege/getAllUserFuntion.do", {
          menutype: "0",
          appId: "402894a152681ba30152681e8b320003",
          language: "zh_CN",
        })
        .then((data) => {
          if (typeof data === "object" && data.length > 0) {
            that.items = that._formatMenus(data);
            if (!that.currentTap || that.currentTap == 0) {
              that.currentTap = that._getFirstMenuId(that.items);
              that.selectMenu(that.currentTap);
            }
          }
        });
    },
    _getFirstMenuId(items) {
      var obj = items[0];
      if (obj.subs && obj.subs.length > 0) {
        return this._getFirstMenuId(obj.subs);
      }
      return obj.id;
    },
    _formatMenus(aMenu) {
      var _aMenu = JSON.parse(JSON.stringify(aMenu));
      var switcher = function (arr) {
        if (typeof arr === "object") {
          arr.forEach(function (item) {
            item.index = item.id || "";
            item.icon = item.icon || ""; //fa-bars fa-bookmark
            item.title = item.text;
            if (!item.attributes) {
              item.attributes = {};
              item.attributes.URL =
                "jasmvvm/pages/module-jasdoc/doc-verify/doc-verify.html";
            }

            if (item.attributes && item.attributes.URL) {
              if (item.attributes.URL.indexOf("http") > -1) {
                item.link = item.attributes.URL;
              } else {
                // item.link = jasTools.base.rootPath + "/" + item.attributes.URL;
              }
            }
            item.subs = item.children;
            if (item.subs) {
              switcher(item.subs);
            }
          });
        }
      };
      switcher(_aMenu);
      return _aMenu;
    },
  },
};
</script>

<style lang="scss">
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

.el-menu {
  background: #344052;
}

.el-submenu__title {
  color: #ececec;
}

.el-menu-item {
  /* font-size: 12px; */
  color: #ececec;
}
.el-menu-item.is-active {
  color: #319ce4;
}
.el-submenu__title:hover,
.el-submenu__title:focus {
  outline: none;
  background-color: #1f2630;
}

.el-menu .el-menu-item:hover {
  background: #1f2630;
}

.el-menu .el-menu-item.is-active {
  /* border-left: 3px solid #5fb8ff; */
  background: #1f2630;
  /* color:#ececec */
}

.el-submenu__title i {
  color: #ececec;
}

.el-menu-item i {
  color: #ececec;
}
.el-menu-item.is-active i {
  color: #319ce4;
}

.is-opened .el-menu-item {
  background: #222e3c;
}

.is-opened .el-menu {
  background: #222e3c;
}

.el-menu-item [class^="fa"] {
  margin-right: 5px;
  width: 20px;
  text-align: center;
  font-size: 16px;
  line-height: 18px;
  vertical-align: middle;
}

.el-submenu [class^="fa"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 20px;
  text-align: center;
  font-size: 16px;
  line-height: 18px;
}

.el-scrollbar__wrap {
  height: calc(100% + 17px);
}

.el-menu--collapse .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse .el-submenu__icon-arrow {
  display: none;
}
</style>