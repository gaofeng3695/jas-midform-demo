
<template>
  <div style="height:36px;padding:10px 0 0 0px;box-sizing: border-box;white-space:nowrap;">
    <span style="border-left:3px solid #409EFF;padding:0 2px 0 0;display: inline-block;height: 12px;vertical-align: middle;"></span>
    <span style="padding-left:4px;">{{name}}</span>
  </div>
</template>

<script>
export default {
  name: "JasBaseModuleTitle",
  props: {
    name: {
      default: "模块分组标题",
      type: String,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>  