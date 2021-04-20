import formItemTypesArr from "@/views/module-page-maker/form-diy/config/formItemTypesArr";
import formItemRulesArr from "@/views/module-page-maker/form-diy/config/formItemRulesArr";


let oBaseTitle = {
  name: "基础信息",
  type: "moduletitle",
};
let oLimitTitle = {
  name: "输入限制",
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
  oLimitTitle,
  oRequired,
  {
    name: "不大于今天",
    field: "isBeforeToday",
    type: "select",
    defaultVal: '0',
    options: [{
      label: '是',
      value: '1'
    }, {
      label: '否',
      value: '0'
    }]
  },
  {
    name: "时间类型",
    field: "dateType",
    type: "select",
    defaultVal: 'date',
    options: [{ // year/month/date/week/ datetime/datetimerange/daterange
      label: '年',
      value: 'year'
    }, {
      label: '年-月',
      value: 'month'
    }, {
      label: '年-月-日',
      value: 'date'
    }, {
      label: '年-月-日 时:分:秒',
      value: 'datetime'
    }]
  },
  {
    name: "大于此字段",
    field: "minField",
    placeholder: '填写此表单内日期类型的字段名',
    type: "input"
  }, {
    name: "小于此字段",
    field: "maxField",
    placeholder: '填写此表单内日期类型的字段名',
    type: "input"
  },
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
  ...baseAttrs, oLimitTitle, oRequired, {
    name: "最大值",
    field: "max",
    type: "number",
    max: Infinity,
    min: -Infinity,
  }, {
    name: "最小值",
    field: "min",
    type: "number",
    defaultVal: 0,
    max: Infinity,
    min: -Infinity,
  }, {
    name: "步长",
    field: "step",
    defaultVal: 1,
    max: Infinity,
    min: 0,
    type: "number"
  }, {
    name: "小数位数",
    field: "precision",
    defaultVal: 0,
    precision: 0,
    type: "number",
    step: 1,
  },

];
const multiSelect = [
  ...baseAttrs,
  oLimitTitle,
  oRequired,
  {
    name: "选项信息",
    type: "moduletitle",
  },
  oOptnCode
];

const formarr = [{
  name: "分组标题",
  field: "groupName",
  defaultVal: '子表单',
  required: '1',
  type: "input",
}, oField, {
  ...oWidthRate,
  defaultVal: '1',
}, {
  type: "slot",
  slotname: 'formbtn'
}];


const btnarr = [ //
  oField, {
    name: "对齐方式",
    field: "textalign",
    type: "select",
    defaultVal: 'right',
    options: [{
      label: '左对齐',
      value: 'left'
    }, {
      label: '居中',
      value: 'center'
    }, {
      label: '右对齐',
      value: 'right'
    }]
  }, {
    ...oWidthRate,
    defaultVal: 1,
  }, {
    name: "最小高度",
    field: "minheight",
    type: "number",
    defaultVal: 53,
  }, {
    name: "上边距",
    field: "paddingtop",
    type: "number",
    defaultVal: 6,
  }, {
    field: 'btns',
    groupName: "按钮",
    type: "formarr",
    formitems: [ //
      {
        name: "名称",
        field: "name",
        defaultVal: '按钮',
        widthRate: 1,
        type: "input",
      }, {
        name: "唯一标识",
        field: "id",
        widthRate: 1,
        type: "input",
      }, {
        name: "朴素按钮",
        field: "isplain",
        type: "select",
        widthRate: 1,
        defaultVal: false,
        options: [{
          label: '是',
          value: true
        }, {
          label: '否',
          value: false
        }]
      }, {
        name: "类型",
        field: "type",
        type: "select",
        widthRate: 1,
        defaultVal: 'primary',
        options: [{
          label: '主要按钮',
          value: 'primary'
        }, {
          label: '成功按钮',
          value: 'success'
        }, {
          label: '信息按钮',
          value: 'info'
        }, {
          label: '警告按钮',
          value: 'warning'
        }, {
          label: '危险按钮',
          value: 'danger'
        }]
      }, {
        name: "大小",
        field: "size",
        type: "select",
        defaultVal: 'mini',
        widthRate: 1,
        options: [{
          label: '默认按钮',
          value: 'large'
        }, {
          label: '中等按钮',
          value: 'medium'
        }, {
          label: '小型按钮',
          value: 'small'
        }, {
          label: '超小按钮',
          value: 'mini'
        }]
      }
    ],
  }
]




const slot = [{
  name: "插槽英文名",
  field: "slotname",
  required: '1',
  regexp: 'rule02',
  type: "input",
}, {
  ...oWidthRate,
  defaultVal: 1,
}]




export default {
  moduletitle,
  grouptitle,
  input,
  date,
  select,
  textarea,
  number,
  multiSelect,
  formarr,
  btnarr,
  slot,
}