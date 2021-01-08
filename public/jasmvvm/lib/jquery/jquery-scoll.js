/*
 * @Description:
 * @Author: dx
 * @Date: 2020-03-23 16:18:29
 * @LastEditTime: 2020-04-10 16:32:33
 * @LastEditors: dx
 */
(function ($) {
  $.fn.myScroll = function (options, callbcak) {

    //默认配置
    var defaults = {
      speed: 10, //滚动速度,值越大速度越慢
    };

    var opts = $.extend({}, defaults, options),
      intId = [];
    var setInObjs = [];

    function marquee(obj) {
      obj.find(".marquee").animate({
        marginTop: '-=1'
      }, 0, function () {
        var s = Math.abs(parseInt($(this).css("margin-top")));
        if (s >= $(this).find("p")[0].offsetHeight) {
          $(this).find("p").slice(0, 1).appendTo($(this));
          $(this).css("margin-top", 0);
        }
      });
    }

    this.each(function (i) {
      var speed = opts["speed"],
        _this = $(this);
      intId[i] = setInterval(function () {
        if (_this.find(".marquee").height() <= _this.height()) {
          clearInterval(intId[i]);
        } else {
          marquee(_this);
          setInObjs.push(intId[i]);
        }
      }, speed);

      _this.hover(function () {
        clearInterval(intId[i]);
      }, function () {
        intId[i] = setInterval(function () {
          if (_this.find(".marquee").height() <= _this.height()) {
            clearInterval(intId[i]);
          } else {
            marquee(_this);
            setInObjs.push(intId[i]);
          }
        }, speed);
      });
    });

  }

})(jQuery);