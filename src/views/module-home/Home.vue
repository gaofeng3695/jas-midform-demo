<template>
  <el-container style="height:100%;">
    <el-header>
      <HomeHeader />
    </el-header>
    <el-container style="height: 0%;">
      <el-aside id="aside" style="background-color: #344052;width:auto;">
        <HomeSider />
      </el-aside>
      <el-main>
        <el-container style="height:100%">
        </el-container>
      </el-main>
    </el-container>

  </el-container>
</template>
<script>
import HomeHeader from "./HomeHeader.vue";
import HomeSider from "./HomeSider.vue";
export default {
  components: {
    HomeHeader,
    HomeSider,
  },
};
</script>
<style lang="scss" scoped>
</style>