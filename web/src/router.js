import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'
import HomeBody from './views/HomeBody.vue'
import Info from './views/Info.vue'
import FundList from './views/FundList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path:'',
          component: HomeBody
        },
        {
          path: '/home',
          name: 'home',
          component: HomeBody
        },
        {
          path: '/info',
          name: 'info',
          component: Info
        },
        {
          path: '/fundList',
          name: 'fundList',
          component: FundList
        }
      ]
    },
    {
      path: '/register',
      name: 'resgister',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    },
  ]
})

// 导航守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  // 当访问登录和注册页面时正常访问
  if(to.path == '/login' || to.path == '/register') {
    next();
  } else {
  // 当有token时，可进入管理页面，否则跳转到登录页面
    isLogin ? next() : next("/login")
  } 
})

export default router;