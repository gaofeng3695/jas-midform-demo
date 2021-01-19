import Vue from 'vue';
import Router from 'vue-router';
import jasStorage from '@/utils/jas-storage';

Vue.use(Router);

// //解决编程式路由往同一地址跳转时会报错的情况
// const originalPush = Router.prototype.push
// const originalReplace = Router.prototype.replace
// //push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
// //replace
// Router.prototype.replace = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//   return originalReplace.call(this, location).catch(err => err)
// }



let defaultRoute = [ //
  {
    path: '/',
    redirect: 'login'
  }, {
    path: '/login',
    component: resolve => require(['@/views/module-login/Login.vue'], resolve)
  }, {
    path: '/home',
    component: resolve => require(['@/views/module-home/Home.vue'], resolve),
    children: [ //
      // {
      //   path: 'demo',
      //   component: resolve => require(['@/views/module-page-maker/form-diy/FormDiy.vue'], resolve),
      // }, {
      //   path: 'P-DW-000001',
      //   component: resolve => require(['@/views/module-home/components/HomeFrameWrap.vue'], resolve),
      //   props: (route) => ({
      //     url: route.query.url
      //   })
      // }, {
      // },
    ]
  },
];

const router = new Router({
  // mode: 'history',
  routes: [].concat(defaultRoute)
});

// import Home from '@/views/module-home/Home.vue';
// import { cosh } from 'core-js/fn/number';

const formatMenus = function () {

  let _aMenu = jasStorage.get("menus") && JSON.parse(jasStorage.get("menus"));

  var routerMenus = [];
  var switcher = function (arr) {
    if (typeof arr === "object") {
      arr.forEach(function (item) {
        item.index = item.id || "";
        item.icon = item.icon || ""; //fa-bars fa-bookmark
        item.title = item.text;
        if (!item.attributes) {
          item.attributes = {};
          item.attributes.URL =
            "jasmvvm/pages/module-jasdoc/doc-verify/doc-verify.html";
        }
        if (item.attributes && item.attributes.URL) {
          if (item.attributes.URL.indexOf("http") > -1) {
            item.link = item.attributes.URL;
          } else {
            // item.link = jasTools.base.rootPath + "/" + item.attributes.URL;
          }
          routerMenus.push({
            path: item.index,
            component: (resolve) =>
              require([
                "@/views/module-home/components/HomeFrameWrap.vue",
              ], resolve),
            props: (route) => ({
              url: route.query.url,
            }),
          });
        }
        item.subs = item.children;
        if (item.subs) {
          switcher(item.subs);
        }
      });
    }
  };
  switcher(_aMenu);
  console.log('_______', routerMenus)
  return routerMenus;
};


router.beforeEach((to, from, next) => { // 路由守卫
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // let isLogin = jasStorage.get('token', 1000 * 60 * 60 * 24); // 是否登录
  // if (to.path.indexOf('view-home') !== -1 && !isLogin) { // 主页并且没有登录
  //   next('/view-login'); // 去登陆
  //   return;
  // }
  // if (to.path.indexOf('view-login') !== -1 && isLogin) { // 登录并且已登录
  //   next('/view-home'); // 去主页
  //   return;
  // }
  // console.log(router.options.routes[2].children.length > 0)
  if (to.path == "/home" && router.options.routes[2].children.length == 0) {
    let routes = [].concat(defaultRoute);
    routes[2].children = formatMenus();
    router.addRoutes(routes);
    console.log(routes)
    next({
      ...to,
      replace: true
    })
  } else {
    next()
  }
});

export default router;