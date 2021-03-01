<template>
  <div class="allwrap">
    <div class="btnwrap">
      <el-button size="mini" type="primary" @click="outerVisible = !outerVisible">预览</el-button>
    </div>
    <div class="line"></div>
    <div class="formDiy">
      <div class="leftbox">
        <div class="container">
          <draggable class="dragArea list-group" :list="typelist" :group="{ name: 'people', pull: 'clone', put: false }" :clone="createNewItem" @change="log">
            <div class="list-group-item01" v-for="element in typelist" :key="element.type">
              <div class="item">
                {{ element.name }}

              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="centerbox">
        <div class="container">
          <el-form label-position="left" label-width="80px" style="width:100%;height:100%;">
            <draggable class="dragArea list-group" :list="formitem" group="people" @change="log">
              <div class="list-group-item" v-for="item in formitem" :key="item.field">
                <div class="item2wrap">
                  <div class="item2" @click="activeItem =item" :class="activeItem == item ? 'active' : ''">
                    <!-- {{ item.name }} -->
                    <JasFormItem v-model="form[item.field]" :config="item"></JasFormItem>
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
          <el-form label-position="left" label-width="60px">
            <el-form-item v-for="(item,key) in activeItem" :key="key" :label="key">
              <el-input v-model="activeItem[key]" size="small" clearable></el-input>
            </el-form-item>
          </el-form>

        </div>
      </div>

    </div>

    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <div>
        <el-form label-position="left" label-width="80px" style="overflow:hidden;">
          <JasFormItem v-for="item in formitem" :key="item.field" v-model="form[item.field]" :config="item"></JasFormItem>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import JasFormItem from "@/components/base/JasFormItem";

export default {
  components: {
    draggable,
    JasFormItem,
  },
  data() {
    return {
      form: {},
      outerVisible: false,
      activeItem: null,
      idGlobal: 11,
      typelist: [
        { name: "单行文本", type: "input" },
        { name: "时间日期", type: "date" },
        { name: "下拉单选框", type: "select" },
        { name: "多行文本", type: "textarea" },
        { name: "数字", type: " number" },
        { name: "下拉多选框", type: "multiSelect" },
      ],
      formitem: [{ name: "姓名", type: "input", field: "name" }],
    };
  },
  created() {
    this.activeItem = this.formitem[0];
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    createNewItem(item) {
      var newItem = {
        name: item.name,
        type: item.type,
        field: "name" + this.idGlobal++,
      };
      this.activeItem = newItem;
      return newItem;
    },
    copyItem(item) {
      var that = this;
      let index = this.formitem.indexOf(item);
      let newItem = {
        ...item,
        field: "name" + this.idGlobal++,
      };
      this.formitem.splice(index + 1, 0, newItem);
      this.activeItem = newItem;
    },
    deleteItem(item) {
      let index = this.formitem.indexOf(item);
      this.formitem.splice(index, 1);
      if (this.formitem.length > 0) {
        this.activeItem = this.formitem[index] || this.formitem[index - 1];
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
    text-align: right;
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
  height: 100%;
  .container {
    border-radius: 6px;
    border: 1px solid #ececec;
    box-sizing: border-box;
    height: 100%;
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
    .rightcon {
      padding: 10px;
      .el-form-item {
        margin-bottom: 6px;
      }
    }
  }
}
.dragArea {
  height: 100%;
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
      right: 10px;
      top: 12px;
    }
  }
}
</style>  