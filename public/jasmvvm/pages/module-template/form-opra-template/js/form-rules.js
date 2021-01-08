/*
 * @Description:
 * @Author: dx
 * @Date: 2020-04-23 09:24:33
 * @LastEditTime: 2020-08-04 13:55:36
 * @LastEditors: dx
 */
var formRules = [{
        "id": "RG_01",
        "name": "数字",
        "regexp": "new RegExp('^[0-9]*$')",
        "tip": "只能输入数字"
    },
    {
        "id": "RG_02",
        "name": "字母",
        "regexp": "new RegExp('^[A-Za-z]+$')",
        "tip": "只能输入字母"
    },
    {
        "id": "RG_03",
        "name": "中文",
        "regexp": "new RegExp('^[\u4e00-\u9fa5]{0,}$')",
        "tip": "只能输入中文"
    },
    {
        "id": "RG_04",
        "name": "中文、字母、数字",
        "regexp": "new RegExp('^[\u4E00-\u9FA5A-Za-z0-9]+$')",
        "tip": "只能输入中文、字母、数字"
    }, {
        "id": "RG_06",
        "name": "只能输入日期",
        "regexp": "new RegExp('^[0-9]{4}-[0-2]{2}-((0[1-9]{1})|(1[0-9]{1})|(2[0-9]{1})|(3[0-1]{1}))$')",
        "tip": "日期格式不正确"
    },
    {
        "id": "RG_07",
        "name": "手机号码",
        "regexp": "new RegExp('^(13|14|15|16|17|18|19)[0-9]{9}$')",
        "tip": "手机号码格式不正确"
    },
]


var formConfigSet = { //表示表单配置
    F000040: {
        cbCreated: function () {
            this.ifVideoAttach = true;
        },
    },
    F000010: {
        key: "MARKER_TYPE_ID", //表示哪一个选项触发
        selectVal: "MT_04", //表示下拉框选择的值
        childKey: "TEST_CYCLE", //key下拉选为 selectVal的时候 childKey为必填项
        childRule: {
            message: "测试周期(日/次)",
            required: true
        }
    },
    F000110: {
        key: "PROGRESS_OF_RECTIFICATION", //表示哪一个选项触发
        selectVal: "1", //表示下拉框选择的值
        childKey: "COMPLETION_TIME", //key下拉选为 selectVal的时候 childKey为必填项
        childRule: {
            disabled: true
        },
        inputWarning: '【实际整改完成时间】填写后将不再生成问题进度填报'
    },
    F000112: {
        inputWarning: '【办结实际时间】填写后将不再生成督办进展'
    },
    F000109: {
        isHasParentTable: true, //是否有父级表单
        addFiled: [{
            parentFiled: "OID",
            childFiled: "RECORD_ID"
        }, {
            parentFiled: "RECORD_NAME",
            childFiled: "RECORD_NAME"
        }], //保存需要的父级字段
    },
    F000129: {
        key: "QUOTA_ID", //表示哪一个选项触发
        selectVal: "9f0cac40-97f6-42d4-8338-ae1e0dd6e4eb,27593a5f-845e-4a1d-8e8b-2b17f234b793,f2f0dd04-2ca7-4e46-a8d7-6034de464668,39a42e8a-4841-48e8-ad0d-216dc795ce03,a58d246b-f20a-4eb9-9ceb-7309d7b19d8d,1110a0cd-ffba-4c54-b74b-50e8c6319909,872baa26-8d1c-4cb7-afc0-f53e64eebeae,b69fe422-1abc-4a54-95f7-9e29a52faec7,cecd1ffe-7791-4e2d-89f5-fa647d7b7352,66232f89-9de6-4af7-b477-f4c93baf962b,0f92eb30-3779-4123-83cc-abaed1ddcd69,ce58fb94-bf1f-4503-bb3a-3ac11822af08,513f264d-7889-4629-821b-f26ea2050a2e,914ca214-a4d9-4e64-9933-baa571ccef40,3138acfd-7e23-42b4-bdf3-d6db4f237e13,ea1f207a-2dc4-4563-9644-7796fa4d3c79,6e525dfd-a2ca-4d93-8581-35631d3d8b06,bab48107-ee82-4c59-938d-e42e65eda16a,423ab3a8-cbd1-4f56-941f-eb3a05e4da35,f5532e3c-a96f-4a79-8f56-64c531810510,bb63ad96-eec0-4898-890d-c285f8f4dc49,9c7888ef-306a-4a30-88a1-5795fc0265f8,5ca759ca-426e-4bb4-a388-febc4130b984,", //表示下拉框选择的值
        childKey: "PIPELINE_ID", //key下拉选为 selectVal的时候 childKey为必填项
        childRule: {
            message: "管道必填",
            required: true
        }
    }
}

var listConfigSet = { //表示列表配置
    F000107: {
        rowBtns: ['问题清单'],
        rowBtnsCallback: function (btn, row) { // this指向vue实例
            var that = this;
            console.log(btn, row)
            if (btn == '问题清单') {
                var that = this;
                top.jasTools.mask.show({
                    window: window, // 要在哪个window对象里面插入dom
                    params: {
                        menuCode: 'F000109',
                        privilegeCode: 'P-BI-0002',
                        parentObj: encodeURI(JSON.stringify(row)),
                        templateCode: 'questions_import',
                        exportTemplateCode: 'questions_export'
                    },
                    title: '【问题清单】- ' + row.RECORD_NAME,
                    src: jasTools.base.rootPath + '/jasmvvm/pages/module-template/form-opra-template/template-privilege.html',
                    cbForClose: function (a) {}
                });
            }
        },
    },
    F000109: {
        cbMounted: function () {
            if (parent.parent.location.href.indexOf('approve-dialog.html') > 0) {
                this.isHasSearch = false;
                this.isHasBtnRow = false;
            }
        },
        cbPrivilege: function () {
            var that = this;
            that.privilege.push('bt_import', 'bt_export');
            that.privilege = that.privilege.map(function (item) {
                if (['bt_report', 'bt_approve'].indexOf(item) > -1) return;
                if (that.parentObj.APPROVE_STATE == 1 || that.parentObj.APPROVE_STATE == 2) { //如果在审批状态以后
                    if (['bt_add', 'bt_update', 'bt_delete', 'bt_import', ].indexOf(item) > -1) return;
                }
                return item;
            }).filter(function (item) {
                return item
            });
            // console.log(this.privilege)
        }
    },
    F000110: {
        cbCreated: function () {
            this.editBtnName = '填报';
        },
    },
    F000112: {
        cbCreated: function () {
            this.editBtnName = '填报';
        },
    },
    F000113: {
        rowBtns: ['时间轴'],
        rowBtnsCallback: function (btn, row) { // this指向vue实例
            var that = this;
            console.log(btn, row)
            if (btn == '时间轴') {
                var baseSrc = jasTools.base.rootPath + '/jasmvvm/pages/module-template/form-opra-template/dialogs/timeline.html';
                var src = jasTools.base.setParamsToUrl(baseSrc, {
                    menuCode: that.menuCode,
                    oid: row[this.primaryKey]
                });
                top.jasTools.dialog.show({
                    title: '时间轴',
                    width: '50%',
                    height: '80%',
                    src: src,
                    cbForClose: function () {}
                });
            }
        },
    },
    F000120: {
        rowBtns: ['时间轴'],
        rowBtnsCallback: function (btn, row) { // this指向vue实例
            var that = this;
            console.log(btn, row)
            if (btn == '时间轴') {
                var baseSrc = jasTools.base.rootPath + '/jasmvvm/pages/module-template/form-opra-template/dialogs/timeline-problem.html';
                var src = jasTools.base.setParamsToUrl(baseSrc, {
                    menuCode: that.menuCode,
                    oid: row['OID']
                });
                top.jasTools.dialog.show({
                    title: '时间轴',
                    width: '50%',
                    height: '80%',
                    src: src,
                    cbForClose: function () {}
                });
            }
        },
    },
}

var detailConfigSet = { //表示详情配置
    F000040: {
        cbCreated: function () {
            this.ifVideoAttach = true;
        },
    },
    F000107: {
        cbMounted: function () {
            var url = jasTools.base.rootPath + '/jasmvvm/pages/module-template/form-opra-template/template-privilege.html';
            if (parent.location.href.indexOf('approve-dialog.html') > 0) {
                this.childPageUrl = jasTools.base.setParamsToUrl(url, {
                    menuCode: 'F000109',
                    privilegeCode: 'P-BI-0002',
                    parentObj: encodeURI(JSON.stringify({
                        APPROVE_STATE: 1,
                        OID: this.bizId
                    })),
                })
            }
        }
    },
}