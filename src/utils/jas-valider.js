export default {
  tel: {
    desc: '手机号',
    regexp: /^1\d{10}$/,
    tip: '请填写正确手机号',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  password: {
    desc: '密码',
    regexp: /^[\dA-z]{6,12}$/,
    tip: '支持数字、字母，6-12个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  password2: {
    desc: '确认密码',
    regexp: null,
    tip: '请再次输入密码',
    warning: '两次输入密码不一致',
    requirement: '必填项不能为空'
  },
  name: {
    desc: '姓名',
    regexp: /^[a-zA-Z\u4e00-\u9fa5]{1,20}$/,
    tip: '支持中文、字母，1-20个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  email: {
    desc: '邮箱',
    regexp: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
    tip: '请填写本人常用邮箱，例如sample@163.com',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  wechat: {
    desc: '微信',
    regexp: /^\S{1,50}$/,
    tip: '1-50个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  qq: {
    desc: 'qq',
    regexp: /^\d{5,11}$/,
    tip: '支持5-11位qq号码',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  enterprise: {
    desc: '企业名称',
    regexp: /^[0-9a-zA-Z\u4e00-\u9fa5 ()（）_-]{4,40}$/,
    tip: '支持中文、字母、数字、“_”、“-”、“（）”、“()”，4-40个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  register: {
    desc: '社会统一信用代码或注册号',
    regexp: /^[A-Z0-9]{15,18}$/,
    tip: '请输入18位的统一社会信用代码或15位工商注册号',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  phone: {
    desc: '电话',
    regexp: /^[0-9-()（）]{7,18}$/,
    tip: '请输入正确的电话号码，例如010-62660379',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  address: {
    desc: '详细地址',
    regexp: /^[0-9a-zA-Z\u4e00-\u9fa5_-]{2,200}$/,
    tip: '支持中文、字母、数字、“_”、“-”，2-200个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  department: {
    desc: '部门',
    regexp: /^[0-9a-zA-Z\u4e00-\u9fa5_-]{1,20}$/,
    tip: '支持中文、字母、数字、“-”、“_”，1-20个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  post: {
    desc: '职位',
    regexp: /^[a-zA-Z\u4e00-\u9fa5]{1,20}$/,
    tip: '支持中文、字母，1-20个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  role: {
    desc: '角色名称',
    regexp: /^[0-9a-zA-Z\u4e00-\u9fa5_-]{1,20}$/,
    tip: '支持中文、字母、数字、“-”、“_”，1-20个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  },
  text: {
    desc: '申请理由/审核意见/备注',
    regexp: /^\S{0,200}$/,
    tip: '最多200个字符',
    warning: '格式不正确',
    requirement: '必填项不能为空'
  }
};
