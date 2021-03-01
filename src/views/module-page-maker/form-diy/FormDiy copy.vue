<template>
  <div class="formDiy">
    <div class="leftbox">
      <div class="container">

      </div>
    </div>
    <div class="centerbox">
      <div class="container">
        <el-form>
          <div>
            <JasBaseModuleTitle name="自定义"></JasBaseModuleTitle>
            <JasFormItem v-for="field in fields" v-model="form[field]" :key="field" :config="fieldsConf[field]"></JasFormItem>
          </div>
        </el-form>
      </div>
    </div>
    <div class="rightbox">
      <div class="container">
      </div>
    </div>

  </div>
</template>

<script>
import JasBaseModuleTitle from "@/components/base/JasBaseModuleTitle";
import JasFormItem from "@/components/base/JasFormItem";

export default {
  components: {
    JasBaseModuleTitle,
    JasFormItem,
  },
  data() {
    return {
      form: {},
      fields: ["a", "b", "c"],
      fieldsConf: {
        a: {
          type: "input",
          name: "姓名",
        },
        b: {
          type: "input",
          name: "年龄",
        },
        c: {
          type: "date",
          name: "生日",
        },
      },
      tabs: [],
      currentTap: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.formDiy {
  display: flex;
  flex-direction: row;
  height: 100%;
  .container {
    border-radius: 6px;
    border: 1px solid #ececec;
    height: 100%;
  }
  .leftbox {
    width: 150px;
    padding: 10px;
  }
  .centerbox {
    flex: 1;
    padding: 10px 0;
  }
  .rightbox {
    width: 150px;
    padding: 10px;
  }
}
</style>  