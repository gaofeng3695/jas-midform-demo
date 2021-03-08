
<template>
  <div>
    <jas-textarea v-if="config.type == 'textarea'" :title="config.name" :length="config.length || 200" v-model="_value"></jas-textarea>
    <JasBaseGroupTitle v-else-if="config.type == 'grouptitle'" :name="config.name"></JasBaseGroupTitle>
    <JasBaseModuleTitle v-else-if="config.type == 'moduleTitle'" :name="config.name"></JasBaseModuleTitle>
    <el-form-item v-else :ref="config.field + 123" :label="config.name" :prop="config.field" :rules="config && config.rules">
      <template v-if="config.type == 'input'">
        <el-input :ref="config.field" v-model="_value" :maxlength="config.maxlength" :disabled="config.disabled" :placeholder="config.placeholder || '请输入'+config.name" size="small" clearable></el-input>
      </template>
      <template v-if="config.type == 'select'">
        <el-select :ref="config.field" v-model="_value" clearable :disabled="config.disabled" :placeholder="config.placeholder || '请选择'+config.name" size="small">
          <el-option v-for="option in config.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </template>
      <template v-if="config.type == 'multiSelect'">
        <jas-base-el-multi-select :ref="config.field" v-model="_value" :item="item" :options="config.options"></jas-base-el-multi-select>
      </template>
      <template v-if="config.type == 'number'">
        <el-input-number :ref="config.field" v-model="_value" :precision="precision(config.precision)" :step="1" :max="config.max || 999999" :min="config.min || 0" controls-position="right" clearable :placeholder="config.placeholder || '请输入'+config.name" size="small" style="text-align:left;"></el-input-number>
      </template>
      <template v-if="config.type == 'date'">
        <el-date-picker clearable value-format="yyyy-MM-dd" type="date" :placeholder="'请选择'+config.name" @change="fieldChanged(item.field)" :ref="config.field" v-model="_value" size="small" style="width: 100%;"></el-date-picker>
      </template>
    </el-form-item>
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
import JasBaseGroupTitle from "@/components/base/JasBaseGroupTitle";
import JasBaseModuleTitle from "@/components/base/JasBaseModuleTitle";
import formItemRulesArr from "@/views/module-page-maker/form-diy/config/formItemRulesArr";

export default {
  name: "JasFormItem",
  components: {
    JasBaseGroupTitle,
    JasBaseModuleTitle,
  },
  props: {
    value: {},
    config: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    "config.required": function () {
      this.formatRules();
    },
    "config.regexp": function () {
      this.formatRules();
    },
  },
  created() {
    this.formatConfig();
    this.formatRules();
  },
  mounted() {},
  methods: {
    formatConfig() {
      if (this.config.type == "select") {
        if (this.config.optnCode) {
          let arr = eval(this.config.optnCode);
          if (typeof arr == "object") {
            this.config.options = eval(this.config.optnCode);
          }
        }
      }
    },
    formatRules() {
      this.config.required = this.config.required || false;
      this.$set(this.config, "rules", []);
      this.config.required &&
        this.config.rules.push({
          required: true,
          message: this.config.name + "为必填项",
        });

      let rule = formItemRulesArr.filter(
        (item) => item.value == this.config.regexp
      );
      console.log(rule[0]);
      rule.length && this.config.rules.push(rule[0]);
    },
    precision: function (value) {
      if (!value) return 0;
      return value;
    },
  },
};
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 12px;
  min-height: 41px;
}
.el-select {
  width: 100%;
}
.el-input-number {
  width: 100%;
}
.el-input-number .el-input .el-input__inner {
  text-align: left;
}
.el-form-item__error {
  top: 90%;
}
</style>  

