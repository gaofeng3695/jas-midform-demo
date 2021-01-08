/**
 * 扩展featurelayer类
 * Created by kc on 2017/7/12.
 * 功能描述 :
 *  1、具有默认的高亮样式和mouse-over事件；
 *  2、图形定位
 *  由于业务数据是通过featureLayer按照显示范围动态绘制的，当要定位时关联的图形不一定已在地图上绘制，所以有可能要查询一次rest api，默认根据objectid索引查询；
 *  3、动态图标
 *  对定位的目标图形进行动态显示
 *  4、延时加载优化
 *  LastUpdate on 2019/04/02 修改要素查询接口属性名称为小写的情况
 */
define([
    "dojo/_base/declare",
    "dojo/_base/event",
    "dojo/_base/lang",
    'dojo/promise/all',
    "dojo/dom-construct",
    "esri/graphic",
    "esri/graphicsUtils",
    "esri/tasks/query",
    "esri/layers/FeatureLayer"
],function (declare,Event,lang,all,domConstruct,
            Graphic,graphicsUtils,Query ,FeatureLayer) {

    return declare( "HeatLayer",FeatureLayer,{
        constructor :function(url,options,api){
            this._options = options;
            this._mapApi = api;//扩展属性
            this.inherited(url,options);
        }
    });

});