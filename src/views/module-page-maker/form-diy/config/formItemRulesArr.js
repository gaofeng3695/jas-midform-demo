export default [{
    label: "数字",
    value: 'rule01',
    pattern: new RegExp('^[0-9]*$'),
    trggier: 'blur',
    message: "输入限制为数字"
  },
  {
    label: "字母",
    value: 'rule02',
    pattern: new RegExp('^[A-Za-z]+$'),
    trggier: 'blur',
    message: "输入限制为字母"
  },
  {
    label: "中文",
    value: 'rule03',
    pattern: new RegExp('^[\u4e00-\u9fa5]{0,}$'),
    trggier: 'blur',
    message: "输入限制为中文"
  },
  {
    label: "中文、字母、数字",
    value: 'rule04',
    pattern: new RegExp('^[\u4E00-\u9FA5A-Za-z0-9]+$'),
    trggier: 'blur',
    message: "输入限制为中文、字母、数字"
  }, {
    label: "日期",
    value: 'rule05',
    pattern: new RegExp('^[0-9]{4}-[0-2]{2}-((0[1-9]{1})|(1[0-9]{1})|(2[0-9]{1})|(3[0-1]{1}))$'),
    trggier: 'blur',
    message: "输入限制为日期"
  }, {
    label: "手机号码",
    value: 'rule06',
    pattern: new RegExp('^(13|14|15|16|17|18|19)[0-9]{9}$'),
    trggier: 'blur',
    message: "输入限制为手机号码"
  }
]