<template>
  <div class="allwrap">
    <div v-if="tableConf.searchId">
      <div class="topwrap">
        <FormDialog ref="searchForm" :isdialog="false" :id="tableConf.searchId" @clickbtn="clickbtn"></FormDialog>
      </div>
      <div class="line"></div>
    </div>
    <div class="middlewrap">
      <div class="mainbtn">
        <el-button @click="clicktopbtn(item)" v-for="item in tableConf.btns" :plain="item.isplain" :type="item.type" :size="item.size" :key="item.name">{{item.name}}</el-button>
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
              <el-button v-for="btn in item.btns" :key="btn.id" type="text" size="small" @click="clickrowbtn(btn,scope.row)">{{btn.name}}</el-button>
              <!-- <el-button type="text" size="small" @click="showForm(scope.row)">表单配置</el-button>
              <el-button type="text" size="small">表格配置</el-button>
              <el-button type="text" size="small">详情配置</el-button>
              <el-button type="text" size="small" @click="deleteForm(scope.row)">删除</el-button> -->
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

    <el-dialog title="我的表格" :visible.sync="tablevisible" top="10vh" v-if="tablevisible" append-to-body width="80%" :center="true">
      <div style="height: calc( 90vh - 140px ) ;">
        <TableDiy :formid="formid" @save="visible = false;getData()" />
      </div>
    </el-dialog>

    <FormDialog v-model="viewVisible" v-if="viewVisible" :id="formid"></FormDialog>

  </div>
</template>

<script>
import FormDiy from "@/views/module-page-maker/form-diy/FormDiy";
import TableDiy from "@/views/module-page-maker/form-diy/TableDiy";
import FormDialog from "@/views/module-page-maker/form-template/FormDialog";

export default {
  components: {
    FormDiy,
    TableDiy,
    FormDialog,
  },
  props: {
    id: {},
  },
  data() {
    return {
      searchId: "搜索栏demo",
      formid: "",
      tableConf: {
        searchId: "",
        isIndex: true,
        isCheck: true,
        isPage: true,
        btns: [
          // {
          //   id: "new",
          //   isplain: false,
          //   type: "primary",
          //   size: "small",
          //   name: "新增",
          // }
        ],
      },
      tableItems: [],
      visible: false,
      tablevisible: false,
      viewVisible: false,
      tableData: [],
      formItems: [],
    };
  },
  created() {
    this.getTableConfig();
  },
  mounted() {
    this.getData();
  },
  watch: {
    id() {
      this.getTableConfig();
    },
  },
  methods: {
    getTableConfig() {
      if (this.id && localStorage.getItem(this.id + "-table")) {
        let oForm = JSON.parse(localStorage.getItem(this.id + "-table") || {});
        this.tableItems = oForm.tableitems;
        this.tableConf = oForm.formform;
      } else {
        this.tableConf = {
          searchId: "搜索栏demo",
          btns: [
            {
              id: "new",
              isplain: false,
              type: "primary",
              size: "small",
              name: "新增表单",
            },
          ],
        };
        this.tableItems = [
          { field: "name", name: "表单名称" },
          {
            type: "btn",
            field: "btn",
            name: "表单操作",
            fixed: "right",
            width: "200px",
            btns: [
              {
                name: "预览",
                id: "formview",
                isplain: true,
                type: "",
                size: "mini",
              },
              {
                name: "配置",
                id: "formconf",
                isplain: true,
                type: "",
                size: "mini",
              },
              {
                name: "删除",
                id: "formdelect",
                isplain: true,
                type: "",
                size: "mini",
              },
            ],
          },
          {
            type: "btn",
            field: "btn2",
            name: "表格操作",
            fixed: "right",
            width: "200px",
            btns: [
              {
                name: "预览",
                id: "tableview",
                isplain: true,
                type: "",
                size: "mini",
              },
              {
                name: "配置",
                id: "tableconf",
                isplain: true,
                type: "",
                size: "mini",
              },
            ],
          },
          {
            type: "btn",
            field: "btn3",
            name: "详情操作",
            fixed: "right",
            width: "200px",
            btns: [
              {
                name: "预览",
                id: "detailview",
                isplain: true,
                type: "",
                size: "mini",
              },
              {
                name: "配置",
                id: "detailconf",
                isplain: true,
                type: "",
                size: "mini",
              },
            ],
          },
        ];
      }
    },
    getData() {
      if (!(this.id && localStorage.getItem(this.id + "-table"))) {
        this.tableData = JSON.parse(
          localStorage.getItem("formList") || "[]"
        ).map((item) => ({ name: item }));
      } else {
        this.tableData = [{}, {}, {}];
      }
    },
    clicktopbtn(item) {
      console.log(item);
      this.$message("您点击了" + item.id);
      if (item.id == "new") {
        this.createNew();
      } else if (item.id == "reset") {
        this.$refs.searchForm.form = {};
      }
    },
    clickrowbtn(btn, item) {
      console.log(btn);
      this.$message("您点击了" + btn.id);
      if (btn.id == "formview") {
        this.viewForm(item);
      } else if (btn.id == "formconf") {
        this.showForm(item);
      } else if (btn.id == "tableconf") {
        this.showTableConf(item);
      }

      // tablevisible
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
    viewForm(item) {
      this.formid = item.name;
      this.viewVisible = true;
    },
    showForm(item) {
      console.log(localStorage.getItem(item.name));
      this.formid = item.name;
      this.visible = true;
    },
    showTableConf(item) {
      console.log(localStorage.getItem(item.name));
      this.formid = item.name;
      this.tablevisible = true;
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