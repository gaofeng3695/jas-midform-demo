
<template>
  <el-form-item :prop="prop" :rules="rules" :label="title">
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" :rows="2" size="small" v-model.trim="_value" :maxLength="maxLength"></el-input>
    <p style="text-align:right;color:#999;position: absolute;top: 100%;right: 0;line-height: 1.4;">您还可以输入<span v-text="maxLength-_value.length"></span>字</p>
  </el-form-item>
</template>

<script>
export default {
  name: "JasBaseElTextarea",
  props: {
    value: {},
    prop: {},
    rules: {},
    title: {
      default: "备注",
    },
    maxLength: {
      default: 200,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    _value: {
      get: function () {
        return this.value || "";
      },
      set: function (newVal) {
        this.$emit("input", newVal);
      },
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>  