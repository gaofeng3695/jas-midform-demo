import formItemTypesArr from "@/views/module-page-maker/form-diy/config/formItemTypesArr";
import formItemRulesArr from "@/views/module-page-maker/form-diy/config/formItemRulesArr";


let oBaseTitle = {
  name: "基础信息",
  type: "moduletitle",
};
let oLimitTitle = {
  name: "验证信息",
  type: "moduletitle",
};

let oName = {
  name: "标题名",
  field: "name",
  required: '1',
  type: "input",
};
let oType = {
  name: "组件类别",
  field: "type",
  type: "select",
  required: '1',
  options: formItemTypesArr,
};
let oField = {
  name: "字段名",
  field: "field",
  required: '1',
  type: "input"
};
let oDefaultVal = {
  name: "默认值",
  field: "defaultVal",
  required: '0',
  type: "input"
};
let oPlaceholder = {
  name: "输入提示",
  field: "placeholder",
  type: "input"
};
let oDisabled = {
  name: "冻结",
  field: "disabled",
  type: "select",
  defaultVal: '0',
  options: [{
    label: '是',
    value: '1'
  }, {
    label: '否',
    value: '0'
  }]
};
let oWidthRate = {
  name: "宽度占比",
  field: "widthRate",
  type: "select",
  options: [{
    label: '整行',
    value: 1
  }, {
    label: '1/2',
    value: 0.5
  }, {
    label: '1/3',
    value: 1 / 3
  }, {
    label: '1/4',
    value: 0.25
  }]
};
let oRequired = {
  name: "必填",
  field: "required",
  type: "select",
  options: [{
    label: '是',
    value: '1'
  }, {
    label: '否',
    value: '0'
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
let oOptnCode = {
  name: "选项代码",
  field: "optnCode",
  defaultVal: JSON.stringify([{
    label: '是',
    value: '1'
  }, {
    label: '否',
    value: '0'
  }]),
  // placeholder: '输入值必须可被代码解析',
  placeholder: "例如：[{label:'是',value: true}]",
  type: "textarea"
};
let baseAttrs = [oBaseTitle, oName, oType, oField, oDefaultVal, oDisabled, oPlaceholder, oWidthRate];

const moduletitle = [ //
  oBaseTitle, oName, oType, oWidthRate
];
const grouptitle = [ //
  oBaseTitle, oName, oType, oWidthRate
];
const input = [ //
  ...baseAttrs,
  oLimitTitle,
  oRequired,
  oMaxlength,
  oRegexp,
];
const date = [
  ...baseAttrs,
];
const select = [
  ...baseAttrs,
  oLimitTitle,
  oRequired,
  {
    name: "选项信息",
    type: "moduletitle",
  },
  oOptnCode
];
const textarea = [
  ...baseAttrs, oLimitTitle, oRequired, {
    ...oMaxlength,
    defaultVal: 200,
  },
];
const number = [
  ...baseAttrs,

];
const multiSelect = [
  ...baseAttrs,

];






export default {
  moduletitle,
  grouptitle,
  input,
  date,
  select,
  textarea,
  number,
  multiSelect,
}