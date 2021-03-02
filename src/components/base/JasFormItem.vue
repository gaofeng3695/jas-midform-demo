
<template>
  <div>
    <jas-textarea v-if="config.type == 'textarea'" :title="config.name" :maxLength="config.maxLength || 200" v-model="_value"></jas-textarea>
    <el-form-item v-else :ref="field + 123" :label="config.name" prop="" :rules="config && config.rules">
      <template v-if="config.type == 'select'">
        <el-select :ref="field" v-model="_value" clearable :placeholder="'请选择'+config.name" size="small">
          <el-option v-for="option in config.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </template>
      <template v-if="config.type == 'multiSelect'">
        <jas-base-el-multi-select :ref="field" v-model="_value" :item="item" :options="config.options"></jas-base-el-multi-select>
      </template>

      <template v-if="config.type == 'input'">
        <el-input :ref="field" v-model="_value" :placeholder="config.placeholder || '请输入'+config.name" size="small" clearable></el-input>
      </template>
      <template v-if="config.type == 'number'">
        <el-input-number :ref="field" v-model="_value" :precision="precision(config.precision)" :step="1" :max="config.max || 999999" controls-position="right" clearable :placeholder="'请输入'+config.name" size="small"></el-input-number>
      </template>
      <template v-if="config.type == 'date'">
        <el-date-picker clearable value-format="yyyy-MM-dd" type="date" :placeholder="'请选择'+config.name" @change="fieldChanged(item.field)" :ref="field" v-model="_value" size="small" style="width: 100%;"></el-date-picker>
      </template>
    </el-form-item>
  </div>
</template>
<script>
/* 
name
field
type
maxLength
rules
options
precision
max
*/
export default {
  name: "JasFormItem",
  props: {
    value: {},
    field: {},
    config: {
      type: Object,
    },
  },
  components: {},
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
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 12px;
}
.el-select {
  width: 100%;
}
</style>  

