import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [ //
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: resolve => require(['../views/module-login/Login.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../views/module-home/Home.vue'], resolve),
      children: [{
        path: 'demo',
        component: resolve => require(['../views/module-page-maker/form-diy/FormDiy.vue'], resolve),

      }, ]
    },
    // {
    //   path: '/view-regist',
    //   component: resolve => require(['../views/view-regist/ViewRegist.vue'], resolve)
    // },
    // {
    //   path: '/view-reset',
    //   component: resolve => require(['../views/view-reset/ViewReset.vue'], resolve)
    // },
    // {
    //   path: '/view-home',
    //   component: resolve => require(['../views/view-home/ViewHome.vue'], resolve),
    //   children: [{
    //     path: '',
    //     redirect: 'dash-board'
    //   }, ]
    // },
    { // 错误路径重定向到登录页面
      path: '*',
      redirect: '/login'
    }
  ]
});

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
  next(); // 继续
});

export default router;