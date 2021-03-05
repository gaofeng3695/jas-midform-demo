<template>
  <el-dialog :title="formform.formtitle" :visible.sync="visible">
    <div>
      <el-form :model="form" label-position="right" label-width="100px" style="overflow:hidden;">
        <el-row :gutter="20">
          <el-col v-for="item in formitems" :key="item.field" :xs="colNum(item)" :sm="colNum(item)" :md="colNum(item)" :lg="colNum(item)" :xl="colNum(item)">
            <JasFormItem v-model="form[item.field]" :config="item"></JasFormItem>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :type="btn == '取消'?'' :'primary'" size="small" v-for="btn in formform.buttonNames.split('、')" :key="btn" @click="visible = false">{{btn}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import JasFormItem from "@/components/base/JasFormItem";

export default {
  name: "FormDialog",
  props: {
    value: {},
  },
  components: {
    JasFormItem,
  },
  computed: {
    visible: {
      get: function () {
        this.get();
        return this.value;
      },
      set: function (newVal) {
        this.$emit("input", newVal);
      },
    },
  },
  data() {
    return {
      form: {},
      // outerVisible: false,
      typelist: [
        { name: "单行文本", type: "input" },
        { name: "时间日期", type: "date" },
        { name: "下拉单选框", type: "select" },
        { name: "多行文本", type: "textarea" },
        { name: "数字", type: " number" },
        { name: "下拉多选框", type: "multiSelect" },
      ],
      formitems: [{ name: "姓名", type: "input", field: "name" }],
      formform: {
        formtitle: "新增表单",
        col: 2,
        buttonNames: "确定、取消",
      },
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.formitems = JSON.parse(this.$jasStorage.get("formitems"));
      this.formform = JSON.parse(this.$jasStorage.get("formform"));
    },

    colNum(item) {
      if (item.type == "moduletitle") return 24;
      return 24 / this.formform.col;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>  