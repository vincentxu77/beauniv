import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Posts from '@/components/Posts/Posts'
import Post from '@/components/Posts/Post'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/circle',
      component: Index,
      children: [
        {
          path: '/chats',
          name: 'chats',
          component: () => import('./views/Chats.vue')
        },
        {
          path: '/contacts',
          name: 'contacts',
          component: () => import('./views/Contacts.vue')
        },
        { path: '/circle', name: 'circle', component: () => import('./views/Circle.vue') },
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/Me.vue')
        }
      ]
    },
    { path: '/login', name: 'login', component: () => import('./views/Login.vue') },
    { path: '/register', name: 'register', component: () => import('./views/Register.vue') },
    { path: '/publish', name: 'publish', component: () => import('./views/Publish.vue') },
    { path: '/detail', name: 'detail', component: () => import('./views/Detail.vue') },
    { path: '/feed', name: 'feed', component: Posts },
    { path: '/post/:id', name: 'post', component: Post },
    {
      path: '/information',
      name: 'information',
      component: () => import('./views/Information.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/ChatView.vue')
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.stuToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router
