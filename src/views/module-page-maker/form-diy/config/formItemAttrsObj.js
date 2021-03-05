import formItemTypesArr from "@/views/module-page-maker/form-diy/config/formItemTypesArr";
import formItemRulesArr from "@/views/module-page-maker/form-diy/config/formItemRulesArr";

let oName = {
  name: "标题名",
  field: "name",
  type: "input",
};
let oType = {
  name: "组件类别",
  field: "type",
  type: "select",
  options: formItemTypesArr,
};
let oField = {
  name: "字段名",
  field: "field",
  type: "input"
};
let oRequired = {
  name: "必填",
  field: "required",
  type: "select",
  options: [{
    label: '是',
    value: true
  }, {
    label: '否',
    value: false
  }]
};
let oMaxlength = {
  name: "最大字数",
  field: "maxlength",
  type: "number"
};
let oRegexp = {
  name: "格式限制",
  field: "regexp",
  type: "select",
  options: formItemRulesArr,
};
let baseAttrs = [oName, oType, oField, oRequired];

const moduletitle = [ //
  oName, oType
];
const input = [ //
  ...baseAttrs,
  oMaxlength,
  oRegexp
];
const date = [
  ...baseAttrs,
];
const select = [
  ...baseAttrs,
];
const textarea = [
  ...baseAttrs,
];
const number = [
  ...baseAttrs,
];
const multiSelect = [
  ...baseAttrs,
];






export default {
  moduletitle,
  input,
  date,
  select,
  textarea,
  number,
  multiSelect,
}