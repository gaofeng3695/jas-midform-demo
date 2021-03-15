
<template>
  <div>
    <JasBaseGroupTitle v-if="config.type == 'grouptitle'" :name="config.name"></JasBaseGroupTitle>
    <JasBaseModuleTitle v-else-if="config.type == 'moduletitle'" :name="config.name"></JasBaseModuleTitle>
    <el-form-item v-else :ref="config.field + 123" :label="config.name" :prop="config.field" :rules="config && config.rules">
      <template v-if="config.type == 'input'">
        <el-input :ref="config.field" v-model.trim="_value" :maxlength="config.maxlength" :disabled="isTrue(config.disabled)" :placeholder="config.placeholder || '请输入'+config.name" size="small" clearable></el-input>
      </template>
      <template v-if="config.type == 'textarea'">
        <el-input class="jastextarea" v-model.trim="_value" :maxlength="config.maxlength" :ref="config.field" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" :rows="2" :disabled="isTrue(config.disabled)" :placeholder="config.placeholder || '请输入'+config.name" size="small" clearable></el-input>
      </template>
      <template v-if="config.type == 'number'">
        <el-input-number :ref="config.field" v-model="_value" :precision="config.precision" :step="config.step" :disabled="isTrue(config.disabled)" :max="config.max || Infinity" :min="config.min || 0" controls-position="right" clearable :placeholder="config.placeholder || '请输入'+config.name" size="small" style="text-align:left;"></el-input-number>
      </template>
      <template v-if="config.type == 'select'">
        <el-select :ref="config.field" v-model.trim="_value" clearable :disabled="isTrue(config.disabled)" :placeholder="config.placeholder || '请选择'+config.name" size="small">
          <el-option v-for="option in config.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </template>
      <template v-if="config.type == 'multiSelect'">
        <el-select :ref="config.field" multiple v-model.trim="_value" clearable :disabled="isTrue(config.disabled)" :placeholder="config.placeholder || '请选择'+config.name" size="small">
          <el-option v-for="option in config.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </template>
      <template v-if="config.type == 'date'">
        <el-date-picker clearable :value-format="dateMap[config.dateType] ||dateMap.date" :type="config.dateType || date" :picker-options="config.pickerOptions" :disabled="isTrue(config.disabled)" :placeholder="config.placeholder || '请选择'+config.name" :ref="config.field" v-model="_value" size="small" style="width: 100%;"></el-date-picker>
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
    form: {},
    config: {
      type: Object,
    },
  },
  data() {
    return {
      dateMap: {
        year: "yyyy-MM",
        month: "yyyy-MM",
        date: "yyyy-MM-dd",
        datetime: "yyyy-MM-dd HH:mm:ss",
      },
    };
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
  mounted() {
    if (
      this.config.defaultVal !== null &&
      this.config.defaultVal !== undefined &&
      this.config.defaultVal !== ""
    ) {
      this.$emit("input", this.config.defaultVal);
    }
  },
  methods: {
    isTrue(val) {
      if (val == 0 || val == undefined || val == null) return false;
      return true;
    },
    formatConfig() {
      var config = this.config;
      if (config.type == "select" || config.type == "multiSelect") {
        if (config.optnCode) {
          let arr = eval(config.optnCode);
          if (typeof arr == "object") {
            config.options = eval(config.optnCode);
          }
        }
      }
      if (config.type == "date") {
        config.pickerOptions = {
          disabledDate: (time) => {
            let min = 0,
              max = Infinity;
            if (config.isBeforeToday == "1") {
              max = new Date().getTime();
            }
            if (config.minField && this.form && this.form[config.minField]) {
              min =
                new Date(this.form[config.minField]).getTime() -
                60 * 60 * 24 * 1000;
            }
            if (config.maxField && this.form && this.form[config.maxField]) {
              max = new Date(this.form[config.maxField]).getTime();
            }
            return time.getTime() < min || time.getTime() > max;
          },
        };
      }
    },
    formatRules() {
      this.config.required = this.config.required || false;
      this.$set(this.config, "rules", []);
      this.isTrue(this.config.required) &&
        this.config.rules.push({
          required: true,
          message: "必填",
        });

      let rule = formItemRulesArr.filter(
        (item) => item.value == this.config.regexp
      );
      rule.length && this.config.rules.push(rule[0]);
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
.el-textarea {
  padding: 3px 0;
}
.el-form-item__error {
  // top: 90%;
  padding-top: 0px;
}
.el-textarea__inner {
  // color: red;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
}
</style>  

