define(["dojo/_base/declare","esri/map"],
function(declare,Map){
  //
  return declare("MapExt",Map,{
    
    constructor:function(domId,options){
      this._options = options;
      this.inherited(domId,options);
    },
    toMap:function(){
      if(this._options.cssScale != 1){
        arguments[0].x /= this._options.cssScale;
        arguments[0].y /= this._options.cssScale;
      }
      return this.inherited(arguments);
    },
    // toScreen:function(){
    //   var point = this.inherited(arguments);
    //   console.info(JSON.stringify(point))
    //   if(this._options.cssScale != 1){
    //     point.x *= this._options.cssScale;
    //     point.y *= this._options.cssScale;
    //   }
    //   console.info(JSON.stringify(point))
    //   return point;
    // }
  })
})