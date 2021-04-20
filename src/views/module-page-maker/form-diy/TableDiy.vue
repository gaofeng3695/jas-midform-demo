<template>
  <div class="allwrap">
    <div class="btnwrap">
      <div style="flex:1;">
        <JasBaseModuleTitle :name="formform.formtitle" />
      </div>
      <div>
        <el-button size="mini" type="primary" @click="save(1)">保存</el-button>
        <el-button size="mini" type="primary" @click="preview">预览</el-button>
      </div>
    </div>
    <div class="line"></div>
    <div class="formDiy">
      <div class="leftbox">
        <div class="container">
          <div class="pl8">
            <JasBaseModuleTitle name="表单项" />
          </div>
          <draggable class="dragArea list-group" :list="formitems" :group="{ name: 'people', pull: 'clone', put: false }" :clone="createNewItem">
            <div class="list-group-item01" v-for="element in formitems" :key="element.field">
              <div class="item">
                {{ element.name }}
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="centerbox">
        <div class="container">
          <div class="pl8">
            <JasBaseModuleTitle name="表格项" />
          </div>
          <draggable class="dragArea02 list-group" :list="tableitems" group="people">
            <div class="list-group-item" v-for="item in tableitems" :key="item.field+( '_'+ Math.random())">
              <div class="item2wrap">
                <div class="tableitem" @click="activeItem = item" :class="activeItem == item ? 'active' : ''">
                  <div>
                    {{ item.name }}
                  </div>
                  <div v-show="activeItem == item" class="item2tool">
                    <el-button type="primary" @click.stop="copyItem(item)" size="mini" icon="fa fa-clone" plain round></el-button>
                    <el-button type="danger" @click.stop="deleteItem(item)" size="mini" icon="fa fa-trash" plain round></el-button>
                  </div>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="rightbox">
        <div class="container rightcon">
          <el-tabs>
            <el-tab-pane label="表格项属性" class="tabBox">
              <el-form v-if="showTable" :model="activeItem" label-position="left" label-width="100px">
                <el-col v-for="item in tableFormConf" :key="item.field" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <jas-form-item v-model="activeItem[item.field]" :config="item">
                    <div slot="formbtn" style="padding-top:10px;text-align:right;">
                      <el-button size="mini" type="primary" @click="subFormShow = true">子表单配置</el-button>
                    </div>
                  </jas-form-item>
                </el-col>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="表格属性" class="tabBox">
              <el-form label-position="left" label-width="100px">
                <el-row :gutter="20">
                  <el-col v-for="item in formformConfs" :key="item.field" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <jas-form-item v-model="formform[item.field]" :config="item"></jas-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>

    </div>

    <el-dialog v-if="outerVisible" width="90%" top="10vh" append-to-body :visible.sync="outerVisible">
      <div style="height: calc( 90vh - 140px ) ;">
        <TableTemplate :id="formid"></TableTemplate>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import JasFormItem from "@/components/base/JasFormItem";
import TableTemplate from "@/views/module-page-maker/form-template/TableTemplate";
import btnFormItems from "@/views/module-page-maker/form-diy/config/btnFormItems";
import JasBaseModuleTitle from "@/components/base/JasBaseModuleTitle";
export default {
  name: "FormDiy",
  components: {
    draggable,
    JasBaseModuleTitle,
    JasFormItem,
    TableTemplate,
  },
  props: {
    formid: {
      default: "个人信息",
    },
  },
  watch: {
    activeItem: function () {
      this.showTable = false;
      this.$nextTick(() => {
        this.showTable = true;
      });
    },
  },
  data() {
    return {
      tableitems: [],

      form: {},
      showTable: true,
      outerVisible: false,
      activeItem: null,
      tableFormConf: [
        {
          name: "标题名",
          field: "name",
          required: "1",
          type: "input",
        },
        {
          name: "字段名",
          field: "field",
          required: "1",
          type: "input",
        },
        {
          name: "组件类别",
          field: "tabletype",
          type: "select",
          required: "1",
          defaultVal: "txt",
          options: [
            {
              label: "文本",
              value: "txt",
            },
            {
              label: "标签",
              value: "label",
            },
            {
              label: "按钮",
              value: "btn",
            },
          ],
        },
        {
          field: "btns",
          groupName: "行内按钮",
          type: "formarr",
          formitems: btnFormItems,
        },
      ],

      formform: {},
      formformConfs: [
        {
          name: "搜索栏ID",
          field: "searchId",
          type: "input",
        },
        {
          name: "序号",
          field: "isIndex",
          type: "select",
          defaultVal: true,
          options: [
            { label: "有", value: true },
            { label: "无", value: false },
          ],
        },
        {
          name: "多选框",
          field: "isCheck",
          type: "select",
          defaultVal: true,
          options: [
            { label: "有", value: true },
            { label: "无", value: false },
          ],
        },
        {
          name: "分页器",
          field: "isPage",
          type: "select",
          defaultVal: true,
          options: [
            { label: "有", value: true },
            { label: "无", value: false },
          ],
        },
        {
          field: "btns",
          groupName: "顶部按钮",
          type: "formarr",
          formitems: btnFormItems,
        },
      ],
    };
  },
  created() {
    if (this.formid && localStorage.getItem(this.formid)) {
      let oForm = JSON.parse(localStorage.getItem(this.formid) || {});
      this.formform = oForm.formform || this.formform;
      this.formitems = oForm.formitems || this.formitems;
      this.tableitems = this.formitems.filter((item) => {
        return (
          [
            "input",
            "textarea",
            "select",
            "multiSelect",
            "number",
            "date",
          ].indexOf(item.type) > -1
        );
      });
      this.activeItem = this.tableitems[0];
    }
  },
  methods: {
    createNewItem(item) {
      let num = (Math.random() * 1000000).toFixed();
      let newItem = {
        name: item.name,
        type: item.type,
        field: item.field + num,
      };
      this.activeItem = newItem;
      return newItem;
    },
    copyItem(item) {
      let num = (Math.random() * 1000000).toFixed();
      let newItem = {
        ...JSON.parse(JSON.stringify(item)),
        field: item.field + num,
      };
      let index = this.tableitems.indexOf(item);
      this.tableitems.splice(index + 1, 0, newItem);
      this.activeItem = newItem;
    },

    save(isclose) {
      localStorage.setItem(
        this.formid + "-table",
        JSON.stringify({
          formform: this.formform,
          tableitems: this.tableitems,
        })
      );
      isclose && this.$emit("save");
    },
    preview() {
      this.save();
      this.outerVisible = true;
    },
    deleteItem(item) {
      if (this.tableitems.length == 1) {
        this.$message.error("无法删除最后一个");
        return;
      }
      let index = this.tableitems.indexOf(item);
      this.tableitems.splice(index, 1);
      if (this.tableitems.length > 0) {
        this.activeItem = this.tableitems[index] || this.tableitems[index - 1];
      } else {
        this.activeItem = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.allwrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  .btnwrap {
    display: flex;
    flex-direction: row;
    padding: 10px;
  }
  .line {
    margin: 0 10px;
    border-bottom: 1px solid #ececec;
  }
}

.formDiy {
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 0;
  .container {
    border-radius: 6px;
    border: 1px solid #ececec;
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
  }
  .leftbox {
    width: 150px;
    padding: 10px;
  }
  .centerbox {
    flex: 1;
    padding: 10px 0;
  }
  .rightbox {
    width: 350px;
    padding: 10px;

    .el-tabs {
      height: 100%;
      .el-tabs__content {
        height: calc(100% - 50px);
        overflow: auto;
      }
      .tabBox {
        padding-right: 10px;
      }
    }

    .el-form-item {
      margin-bottom: 6px;
    }
    .rightcon {
      padding: 10px 0 10px 10px;
    }
  }
}

.pl8 {
  padding-left: 8px;
}
.dragArea02 {
  height: calc(100% - 50px);
}

.list-group-item01 {
  padding: 6px 6px 0 6px;
  .item {
    border-radius: 4px;
    background: #f4f6fc;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    cursor: move;
    &:hover {
      background: #e0f3ff;
    }
  }
}

.item2wrap {
  padding: 3px 6px;
  .tableitem {
    line-height: 24px;
    border: 1px solid #ececec;
    // border-left: 1px solid #fff;
    padding: 6px;
    padding-left: 9px;
    cursor: move;
    overflow: hidden;
    position: relative;
    &:hover {
      background: #f3faff;
    }
    &.active {
      padding-left: 6px;
      background: #e0f3ff !important;
      border-left: 4px solid #7cc9fd;
    }
    .item2tool {
      height: 30px;
      width: 100px;
      position: absolute;
      z-index: 3;
      right: 10px;
      top: 5px;
    }
  }
}
</style>  