<template>
  <div class="allwrap">
    <div class="btnwrap">
      <div style="flex:1;">
        <JasBaseModuleTitle :name="formform.formtitle" />
      </div>
      <div>
        <el-button size="mini" type="primary" @click="save">保存</el-button>
        <el-button size="mini" type="primary" @click="preview">预览</el-button>
      </div>
    </div>
    <div class="line"></div>
    <div class="formDiy">
      <div class="leftbox">
        <div class="container">
          <div class="pl8">
            <JasBaseModuleTitle name="基础组件" />
          </div>
          <draggable class="dragArea list-group" :list="typelist" :group="{ name: 'people', pull: 'clone', put: false }" :clone="createNewItem">
            <div class="list-group-item01" v-for="element in typelist" :key="element.value">
              <div class="item">
                {{ element.label }}
              </div>
            </div>
          </draggable>
          <div class="pl8">
            <JasBaseModuleTitle name="高级组件" />
          </div>
          <draggable class="dragArea list-group" :list="prolist" :group="{ name: 'people', pull: 'clone', put: false }" :clone="createNewItem">
            <div class="list-group-item01" v-for="element in prolist" :key="element.value">
              <div class="item">
                {{ element.label }}
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="centerbox">
        <div class="container">
          <el-form label-position="left" label-width="120px" style="width:100%;height:100%;overflow:auto;">
            <draggable class="dragArea02 list-group" :list="formitems" group="people">
              <div class="list-group-item" v-for="item in formitems" :key="item.field">
                <div class="item2wrap">
                  <div class="item2" @click="activeItem =item" :class="activeItem == item ? 'active' : ''">
                    <!-- {{ item.name }} -->
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                        <jas-form-item v-model="form[item.field]" :isview="true" :config="item"></jas-form-item>
                      </el-col>
                    </el-row>
                    <div v-show="activeItem == item" class="item2tool">
                      <el-button type="primary" @click.stop="copyItem(item)" size="mini" icon="fa fa-clone" plain round></el-button>
                      <el-button type="danger" @click.stop="deleteItem(item)" size="mini" icon="fa fa-trash" plain round></el-button>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
          </el-form>
        </div>
      </div>
      <div class="rightbox">
        <div class="container rightcon">

          <el-tabs>
            <el-tab-pane label="属性配置" class="tabBox">
              <el-form v-if="isReForm" :model="activeItem" label-position="left" label-width="100px">
                <el-col v-for="item in formItemAttrsObj[activeItem.type]" :key="item.field" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <jas-form-item v-model="activeItem[item.field]" :config="item">
                    <div slot="formbtn" style="padding-top:10px;text-align:right;">
                      <el-button size="mini" type="primary" @click="subFormShow = true">子表单配置</el-button>
                    </div>
                  </jas-form-item>
                </el-col>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="表单配置" class="tabBox">
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

    <FormDialog v-model="outerVisible" v-if="outerVisible"></FormDialog>

    <el-dialog title="子表单" :visible.sync="subFormShow" top="15vh" append-to-body v-if="subFormShow" width="80%" :center="true">
      <div style="height: calc( 85vh - 140px ) ;">
        <FormDiy />
      </div>
    </el-dialog>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import JasFormItem from "@/components/base/JasFormItem";
import FormDialog from "@/views/module-page-maker/form-template/FormDialog";
import formItemAttrsObj from "@/views/module-page-maker/form-diy/config/formItemAttrsObj";
import formItemTypesArr from "@/views/module-page-maker/form-diy/config/formItemTypesArr";
import JasBaseModuleTitle from "@/components/base/JasBaseModuleTitle";
export default {
  name: "FormDiy",
  components: {
    draggable,
    JasBaseModuleTitle,
    JasFormItem,
    FormDialog,
  },
  props: {
    formid: {},
  },
  data() {
    return {
      isReForm: true,
      form: {},
      outerVisible: false,
      subFormShow: false,
      activeItem: null,
      idGlobal: 1,
      typelist: formItemTypesArr,
      prolist: [
        {
          label: "表单组",
          value: "formarr",
        },
        {
          label: "按钮组",
          value: "buttonarr",
        },
        {
          label: "自定义插槽",
          value: "slot",
        },
      ],
      formItemAttrsObj: formItemAttrsObj,
      formitems: [
        {
          name: "基础信息",
          type: "grouptitle",
          field: "field",
          required: false,
        },
        { name: "姓名", type: "input", field: "name", required: "0" },
      ],
      formform: {
        formtitle: "新增表单",
        col: 2,
        buttonNames: "确定、上传、取消",
        createTime: new Date().getTime(),
        width: "900px",
      },
      formformConfs: [
        {
          name: "标题",
          field: "formtitle",
          type: "input",
          options: "",
        },
        {
          name: "列数",
          field: "col",
          type: "select",
          options: [
            { label: "单列", value: 1 },
            { label: "双列", value: 2 },
            { label: "三列", value: 3 },
            { label: "四列", value: 4 },
          ],
        },
        {
          name: "按钮组",
          field: "buttonNames",
          type: "input",
          placeholder: "输入以顿号分割的按钮名称",
        },
        {
          name: "对话框宽度",
          field: "width",
          type: "input",
          defaultVal: "900px",
          placeholder: "例： 800px  或者  60% ",
        },
        {
          name: "对话框高度",
          field: "height",
          type: "input",
          placeholder: "例： 800px  或者  70vh ",
        },
        {
          name: "对话框上边距",
          field: "top",
          type: "input",
          defaultVal: "15vh",
          placeholder: "例： 100px  或者  15vh ",
        },
      ],
    };
  },
  created() {
    if (this.formid && localStorage.getItem(this.formid)) {
      let oForm = JSON.parse(localStorage.getItem(this.formid) || {});
      this.formform = oForm.formform || this.formform;
      this.formitems = oForm.formitems || this.formitems;
    }
    this.activeItem = this.formitems[0];
  },
  watch: {
    activeItem() {
      this.isReForm = false;
      this.$nextTick(() => {
        this.isReForm = true;
      });
    },
  },
  methods: {
    save() {
      let formList = JSON.parse(localStorage.getItem("formList") || "[]");
      var formId = this.formform.formtitle;
      if (formList.indexOf(formId) == -1) {
        //新表单
        formList.push(formId);
        localStorage.setItem("formList", JSON.stringify(formList));
      }
      localStorage.setItem(
        formId,
        JSON.stringify({
          formform: this.formform,
          formitems: this.formitems,
        })
      );
      this.$emit("save");
    },
    preview() {
      this.$jasStorage.set("formitems", JSON.stringify(this.formitems));
      this.$jasStorage.set("formform", JSON.stringify(this.formform));
      this.outerVisible = true;
    },
    createNewItem(item) {
      let num = this.idGlobal++;
      let newItem = {
        name: item.label + num,
        type: item.value,
        field: "field" + num,
        required: "0",
      };
      this.activeItem = newItem;
      return newItem;
    },
    copyItem(item) {
      let num = this.idGlobal++;
      let newItem = {
        ...item,
        field: "field" + num,
      };
      let index = this.formitems.indexOf(item);
      this.formitems.splice(index + 1, 0, newItem);
      this.activeItem = newItem;
    },
    deleteItem(item) {
      if (this.formitems.length == 1) {
        this.$message.error("无法删除最后一个");
        return;
      }
      let index = this.formitems.indexOf(item);
      this.formitems.splice(index, 1);
      if (this.formitems.length > 0) {
        this.activeItem = this.formitems[index] || this.formitems[index - 1];
      } else {
        this.activeItem = null;
      }
    },
  },
};
</script>

<style lang="scss">
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
  height: 100%;
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
  .item2 {
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
      top: 12px;
    }
  }
}
</style>  