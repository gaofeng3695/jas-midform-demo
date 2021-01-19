<template>
  <div class="wrapper">
    <iframe class="frame" :src="url" border frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: "HomeFrameWrap",
  props: {
    url: {
      default: "https://www.baidu.com",
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
.wrapper {
  height: 100%;
  .frame {
    height: 100%;
    width: 100%;
  }
}
</style>