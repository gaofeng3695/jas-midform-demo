import Vue from 'vue';
import Router from 'vue-router';
import jasStorage from '@/utils/jas-storage';
import localMenu from '@/router/menu';




Vue.use(Router);

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
      // },
      //{
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
  _aMenu = _aMenu ? _aMenu : localMenu;
  jasStorage.set("menus", JSON.stringify(_aMenu))

  var routerMenus = [];
  var switcher = function (arr) {
    if (typeof arr === "object") {
      console.log('11111111', _aMenu)
      arr.forEach(function (item) {
        item.index = item.id || "";
        item.icon = item.icon || ""; //fa-bars fa-bookmark
        item.title = item.text;
        if (item.attributes && item.attributes.URL) {
          if (item.attributes.URL.indexOf(".vue") > -1) {
            console.log(item.attributes.URL)
            // newItem.component = resolve => require([`@/views/${item.component}`], resolve)

            routerMenus.push({
              path: item.index,
              component: (resolve) =>
                require([
                  `@/views/${item.attributes.URL}`
                  // `@/views/module-page-maker/form-diy/FormDiy.vue`
                ], resolve),
            });
          } else {
            routerMenus.push({
              path: item.index,
              component: (resolve) =>
                require([
                  "@/views/module-home/components/HomeFrameWrap.vue",
                ], resolve),
              props: () => ({
                url: item.attributes.URL,
              }),
            });
          }

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
  console.log('2222222', to, to.path, router.options.routes)
  if (to.path.indexOf("/home") > -1 && router.options.routes[2].children.length == 0) {
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