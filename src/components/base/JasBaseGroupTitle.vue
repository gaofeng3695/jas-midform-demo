
<template>
  <div style="margin:0px 0 6px;line-height:32px;padding-top:10px;border-bottom:1px solid #ecf5ff;">
    <span style="padding:0px 4px 0px 4px;height: 22px;line-height:22px;display:inline-block;background: #ecf5ff;border-left: 2px solid rgb(64, 158, 255)">{{name}}</span>
  </div>
</template>

<script>
export default {
  name: "JasBaseGroupTitle",
  props: {
    name: {
      default: "表单分组",
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