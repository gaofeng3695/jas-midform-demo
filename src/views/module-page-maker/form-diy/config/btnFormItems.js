export default

[{
    name: "名称",
    field: "name",
    defaultVal: "按钮",
    widthRate: 1,
    type: "input",
  },
  {
    name: "唯一标识",
    field: "id",
    widthRate: 1,
    type: "input",
  },
  {
    name: "朴素按钮",
    field: "isplain",
    type: "select",
    widthRate: 1,
    defaultVal: false,
    options: [{
        label: "是",
        value: true,
      },
      {
        label: "否",
        value: false,
      },
    ],
  },
  {
    name: "类型",
    field: "type",
    type: "select",
    widthRate: 1,
    defaultVal: "primary",
    options: [{
        label: "主要按钮",
        value: "primary",
      },
      {
        label: "成功按钮",
        value: "success",
      },
      {
        label: "信息按钮",
        value: "info",
      },
      {
        label: "警告按钮",
        value: "warning",
      },
      {
        label: "危险按钮",
        value: "danger",
      },
    ],
  },
  {
    name: "大小",
    field: "size",
    type: "select",
    defaultVal: "mini",
    widthRate: 1,
    options: [{
        label: "默认按钮",
        value: "large",
      },
      {
        label: "中等按钮",
        value: "medium",
      },
      {
        label: "小型按钮",
        value: "small",
      },
      {
        label: "超小按钮",
        value: "mini",
      },
    ],
  },
]