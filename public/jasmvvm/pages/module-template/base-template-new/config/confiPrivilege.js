// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  ifHideSearch: false,
  privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete'],
  searchPath: '/jdbc/commonData/processRule/getPage.do',
  deletePath: '/jdbc/commonData/processRule/delete.do',
  detailPath: '/jdbc/commonData/processRule/get.do',
  savePath: '/jdbc/commonData/processRule/save.do',
  updatePath: '/jdbc/commonData/processRule/update.do',
  topBtns: [{
    name: '新增', // 必填
    icon: 'fa fa-plus', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    isDefaultMethod: 'true', //选填，是否采用默认方法,需要搭配privilegeCode使用，仅在rowBtns生效
    privilegeCode: 'bt_add', //选填，表明按钮的权限，仅在rowBtns生效
  }, 
  {
    name: '添加', // 必填
    icon: 'el-icon-circle-plus', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    method: 'addRule'
  },
  {
      name: '复制新增', // 必填
      icon: 'fa fa-plus', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
      method: 'copyCreateRule'
  },{
    name: '排序', // 必填
    icon: 'fa fa-sort', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    method: 'sortItem'
  }, {
    name: '发布', // 必填
    icon: 'el-icon-upload', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    method: 'publish'
  }],
  rowBtns: [{
    name: '详情',
    isTip: true,
    icon: 'fa fa-eye',
    privilegeCode: 'bt_select',
    isDefaultMethod: true,
    isShow: function (rows) { 
        if (rows.length == 1){
          return rows[0].ruleType == null;
        } 
        return false;
     }    
  }, {
    name: '编辑',
    isTip: true,
    icon: 'fa fa-edit',
    privilegeCode: 'bt_update',
    isDefaultMethod: true,
    isShow: function (rows) { 
        if (rows.length == 1){
          return rows[0].ruleType == null;
        } 
        return false;
     }    
  }, {
    name: '删除',
    icon: 'fa fa-delete',
    method: 'deleteRule',
    isShow: function (rows) { 
       if (rows.length == 1){
         return rows[0].ruleType == null;
       } 
       return false;
    }    
  }, {
    name: '卸载',
    icon: 'fa fa-delete',
    method: 'removeRule',
    isShow: function (rows) { 
       if (rows.length == 1){
         return rows[0].ruleType == 'public';
       } 
       return false;
    }    
  }, ],
  addParams: {
    businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
    processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeQueryAdvice'
  },
  searchParams: {
    businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
    processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeQueryAdvice'
  },
  searchFields: [

  ],
  tableFields: [
	'ruleType',
    'service',
    'method',
    'conditionExpression',
    'description',
    
  ],
  addFields: [{
    title: '基本信息',
    fields: [
      'service',
      'method',
      'conditionExpression',
      'description',
    ]
  }],
  detailFields: [{
    title: '基本信息',
    fields: [
      'service',
      'method',
      'conditionExpression',
      'description',
    ]
  }],
  fieldsConfig: {

    service: {
      name: '服务',
      type: 'mediuminput',
      isRequired: true
    },
    method: {
      name: '方法',
      type: 'textarea',
      isRequired: true
    },
    conditionExpression: {
      name: '条件表达式',
      type: 'textarea',
      isRequired: false
    },
    description: {
      name: '描述',
      type: 'textarea',
      isRequired: false
    },
    ruleType: {
      name: '规则类别',
      width: '100px',
    	 
    },
  },
  methods: {
	  addRule: function () {
		  	var that = this;
		  	var src = jasTools.base.setParamsToUrl('/jasmvvm/pages/module-template/common-dialogs/system-rule.html', {
		  		 businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
		         processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeQueryAdvice',
			})
			
			top.jasTools.dialog.show({
				width: '1200px',
				height: '60%',
				title: '通用脚本库',
				src: jasTools.base.rootPath + src,
				cbForClose: function (param) {
					 that.$refs.table.refresh();
				}
			});
	  },
	  
	  deleteRule: function (rows) {
		  var that = this;
		  //私有脚本库：删除
		  var url = jasTools.base.rootPath + "/jdbc/commonData/processRule/delete.do";
	      jasTools.ajax.post(url, {
	    	  oid: rows[0].oid
	      }, function (data) {
	    	  that.$refs.table.refresh();
	        window.top.Vue.prototype.$message({
	          message: '删除成功',
	          type: 'success'
	        })
	      });
	  },
	  removeRule: function (rows) {
		  var that = this;
		 //公有脚本库：移除
		  var url = jasTools.base.rootPath + "/serviceMvc/processRule/removeProcessRule.do";
	      jasTools.ajax.get(url, {
	    	  processBusinessRefOid: rows[0].processBusinessRefOid
	      }, function (data) {
	    	  that.$refs.table.refresh();
	        window.top.Vue.prototype.$message({
	          message: '移除成功',
	          type: 'success'
	        })
	      });
	  },

      copyCreateRule: function(){
          var that = this;
          var src = jasTools.base.setParamsToUrl('/jasmvvm/pages/module-template/common-dialogs/copy-create-rule.html', {
              businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
              processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeQueryAdvice',
          })

          top.jasTools.dialog.show({
              width: '1200px',
              height: '60%',
              title: '脚本复制选择',
              src: jasTools.base.rootPath + src,
              cbForClose: function (param) {
                  that.$refs.table.refresh();
              }
          });
	  },
	  sortItem: function () {
      var that = this;
      var url = jasTools.base.rootPath + '/jasmvvm/pages/module-template/common-dialogs/sort-list.html';
      url = jasTools.base.setParamsToUrl(url, {
        businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
        processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeQueryAdvice',
        modelId: 'cn.jasgroup.framework.process.entity.ProcessBusinessRef',
        displayField: 'name',
        rowIndexField: 'orderNum',
      });
      top.jasTools.dialog.show({
        height: '70%',
        width: '600px',
        title: '排序',
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    publish: function () {
      var that = this;
      var url = jasTools.base.rootPath + "/serviceMvc/processRule/publish.do";
      jasTools.ajax.get(url, {
        businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
        processType: jasTools.base.getParamsInUrl(location.href).processType|| 'beforeQueryAdvice',
        processRefreshStrategyName: jasTools.base.getParamsInUrl(location.href).processRefreshStrategyName
      }, function (data) {
    	  that.$refs.table.refresh();
        window.top.Vue.prototype.$message({
          message: '发布成功',
          type: 'success'
        })
      });
    }
  }
};