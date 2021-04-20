<template>
  <div class="allwrap">
    <div v-if="searchId">
      <div class="topwrap">
        <FormDialog ref="searchForm" :isdialog="false" :id="searchId" @clickbtn="clickbtn"></FormDialog>
      </div>
      <div class="line"></div>
    </div>
    <div class="middlewrap">
      <div class="mainbtn">
        <el-button @click="clicktopbtn(item)" v-for="item in tableConf.topBtns" :plain="item.isplain" :type="item.type" :size="item.size" :key="item.name">{{item.name}}</el-button>
      </div>
      <div>
        <el-button size="mini" type="primary" plain icon="fa fa-refresh" @click="getData"></el-button>
      </div>
    </div>
    <div class="mainWrap">
      <el-table :data="tableData" border height="100%" align="center" style="width: 100%;height:100%;">

        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column v-for="item in tableItems" :width="item.width || 'auto'" :key="item.field" :fixed="item.fixed" align="center" :prop="item.field" :label="item.name">
          <template slot-scope="scope">
            <div v-if="item.type == 'btn'">
              <el-button type="text" size="small" @click="viewForm(scope.row)">预览</el-button>
              <el-button type="text" size="small" @click="showForm(scope.row)">表单配置</el-button>
              <el-button type="text" size="small">表格配置</el-button>
              <el-button type="text" size="small">详情配置</el-button>
              <el-button type="text" size="small" @click="deleteForm(scope.row)">删除</el-button>
            </div>
            <div v-else>
              {{scope.row[item.field]}}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="我的表单" :visible.sync="visible" top="10vh" v-if="visible" append-to-body width="80%" :center="true">
      <div style="height: calc( 90vh - 140px ) ;">
        <FormDiy :formid="formid" @save="visible = false;getData()" />
      </div>
    </el-dialog>

    <FormDialog v-model="viewVisible" v-if="viewVisible" :id="formid"></FormDialog>

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
      searchId: "搜索栏demo",
      formid: "",
      tableConf: {
        topBtns: [
          {
            id: "new",
            isplain: false,
            type: "primary",
            size: "small",
            name: "新增",
          },
          {
            id: "upload",
            isplain: true,
            type: "primary",
            size: "small",
            name: "批量上传",
          },
        ],
      },
      tableItems: [
        { field: "name", name: "表单名称" },
        {
          type: "btn",
          field: "btn",
          name: "操作",
          fixed: "right",
          width: "300px",
        },
      ],
      visible: false,
      viewVisible: false,
      tableData: [],
      formItems: [],
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
    clicktopbtn(item) {
      console.log(item);
      this.$message("您点击了" + item.id);
      if (item.id == "new") {
        this.visible = true;
      } else if (item.id == "reset") {
        this.$refs.searchForm.form = {};
      }
    },
    clickbtn(item) {
      console.log(item);
      this.$message("您点击了" + item.id);
      if (item.id == "search") {
        let form = this.$refs.searchForm.form;
        console.log(form);
      } else if (item.id == "reset") {
        this.$refs.searchForm.form = {};
      }
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
      this.formid = item.name;
      this.viewVisible = true;
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

<style lang="scss" scoped>
.allwrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  .topwrap {
    padding: 10px 10px 0 10px;
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