
<template>
  <div>
    <div v-if="!_value.length">
      <div class="mytitle">
        <JasBaseGroupTitle :name="groupName"></JasBaseGroupTitle>
        <div class="btns">
          <el-button type="text" size="small" @click="addForm">新增</el-button>
        </div>
      </div>
      <div>暂无数据</div>
    </div>
    <div>
      <div v-for="(subform,index) in _value" :key="'thisform'+index">
        <div class="mytitle">
          <JasBaseGroupTitle :name="groupName + ' ' + (index+1) "></JasBaseGroupTitle>
          <div class="btns">
            <el-button type="text" size="small" @click="removeForm(subform)">删除</el-button>
            <el-button v-show="index == _value.length-1" type="text" size="small" @click="addForm">新增</el-button>
          </div>
        </div>
        <el-form :model="subform" label-position="right" label-width="100px" style="overflow:hidden;">
          <el-row :gutter="20">
            <el-col v-for="item in formitems" :key="item.field" :xs="colNum(item)" :sm="colNum(item)" :md="colNum(item)" :lg="colNum(item)" :xl="colNum(item)">
              <jas-form-item v-model="subform[item.field]" :form="subform" :config="item"></jas-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>

</template>
<script>
/* 
name
field
type
rule
regexp
required
options
precision
maxlength
max
min
step
*/
// import JasFormItem from "@/components/base/JasFormItem";
import JasBaseGroupTitle from "@/components/base/JasBaseGroupTitle";
// import formItemRulesArr from "@/views/module-page-maker/form-diy/config/formItemRulesArr";

export default {
  name: "JasSubForms",
  components: {
    // myJasFormItem: JasFormItem,
    JasBaseGroupTitle,
  },
  props: {
    isview: {
      default: false,
    },
    value: {
      default: function () {
        return [{}];
      },
    },
    groupName: {
      default: "子表单",
    },
    formitems: {
      default: function () {
        return [
          { name: "姓名1", type: "input", field: "name2", required: "0" },
        ];
      },
    },
    formform: {
      default: function () {
        return {
          col: 2,
        };
      },
    },
  },
  data() {
    return {
      refresh: false,
    };
  },
  computed: {
    _value: {
      get() {
        this.$emit("input", this.value);
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    addForm() {
      this.value.push({});
    },
    removeForm(item) {
      let index = this.value.indexOf(item);
      this.value.splice(index, 1);
    },
    colNum(item) {
      if (item.widthRate) {
        return 24 * item.widthRate;
      }
      if (item.type == "moduletitle") return 24;
      if (item.type == "grouptitle") return 24;
      return 24 / this.formform.col;
    },
  },
};
</script>

<style lang="scss">
.mytitle {
  position: relative;
  .btns {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>  

