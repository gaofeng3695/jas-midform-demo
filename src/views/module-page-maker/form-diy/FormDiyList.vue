<template>
  <div class="allwrap">
    <!-- <div class="topwrap">
      <el-button size="mini" type="primary">预览</el-button>
    </div>
    <div class="line"></div> -->
    <div class="middlewrap">
      <div class="mainbtn">
        <el-button size="mini" plain type="primary" @click="createNew">新增表单</el-button>
      </div>
      <div>
        <el-button size="mini" type="primary" plain icon="fa fa-refresh" @click="getData"></el-button>
      </div>
    </div>
    <div class="mainWrap">
      <el-table :data="tableData" border height="100%" align="center" style="width: 100%;height:100%;">

        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column v-for="item in formItems" :key="item.field" align="center" :prop="item.field" :label="item.name"></el-table-column>
        <el-table-column prop="address" fixed="right" align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewForm(scope.row)">预览</el-button>
            <el-button type="text" size="small" @click="showForm(scope.row)">表单配置</el-button>
            <el-button type="text" size="small" @click="deleteForm(scope.row)">删除</el-button>
            <!-- <el-button type="text" size="small">表格配置</el-button>
            <el-button type="text" size="small">详情配置</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="我的表单" :visible.sync="visible" top="10vh" v-if="visible" append-to-body width="80%" :center="true">
      <div style="height: calc( 90vh - 140px ) ;">
        <FormDiy :formid="formid" @save="visible = false;getData()" />
      </div>
    </el-dialog>

    <FormDialog v-model="viewVisible" v-if="viewVisible"></FormDialog>

  </div>
</template>

<script>
import FormDiy from "@/views/module-page-maker/form-diy/FormDiy";
import FormDialog from "@/views/module-page-maker/form-template/FormDialog";

export default {
  components: {
    FormDiy,
    FormDialog,
  },
  data() {
    return {
      formid: "",
      visible: false,
      viewVisible: false,
      tableData: [],
      formItems: [{ field: "name", name: "表单名称" }],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = JSON.parse(
        localStorage.getItem("formList") || "[]"
      ).map((item) => ({ name: item }));
    },
    createNew() {
      this.formid = undefined;
      this.visible = true;
    },
    showForm(item) {
      console.log(localStorage.getItem(item.name));
      this.formid = item.name;
      this.visible = true;
    },
    viewForm(item) {
      let id = item.name;
      if (id && localStorage.getItem(id)) {
        let oForm = JSON.parse(localStorage.getItem(id) || {});
        this.$jasStorage.set("formitems", JSON.stringify(oForm.formitems));
        this.$jasStorage.set("formform", JSON.stringify(oForm.formform));
        this.viewVisible = true;
      }
    },
    deleteForm(item) {
      console.log(localStorage.getItem(item.name));
      let formList = JSON.parse(localStorage.getItem("formList") || "[]");
      let index = formList.indexOf(item.name);
      formList.splice(index, 1);
      localStorage.setItem("formList", JSON.stringify(formList));
      this.getData();
    },
  },
};
</script>

<style lang="scss">
.allwrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  .topwrap {
    padding: 10px;
  }
  .middlewrap {
    padding: 10px;
    display: flex;
    flex-direction: row;
    .mainbtn {
      flex: 1;
    }
  }
  .line {
    margin: 0 10px;
    border-bottom: 1px solid #ececec;
  }
  .mainWrap {
    display: flex;
    flex: 1;
    height: 0;
    padding: 0 10px 10px;
  }
}
</style>