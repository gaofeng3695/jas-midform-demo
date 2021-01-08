<template>
  <div>
    <div v-for="item in menus" :key="item.id">
      <el-submenu v-if="item.subs" :index="item.index">
        <div slot="title">
          <i :class="item.icon||'fa fa-folder' "></i>
          <span slot="title">{{ item.title }}</span>
        </div>
        <JasSideMenu :menus="item.subs"></JasSideMenu>
      </el-submenu>
      <el-menu-item :index="item.index" v-else>
        <i :class=" item.icon||'fa fa-folder' "></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
export default {
  name: "JasSideMenu",
  props: {
    menus: {
      default: () => [],
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