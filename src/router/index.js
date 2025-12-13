import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
  ,
  {
    path: '/category',
    name: 'Category',
    query: { gameCategoryId: 0, platformId: 0 },
    component: () => import('../views/Category.vue')
  }
  ,
  {
    path: '/promo',
    name: 'Promo',
    component: () => import('../views/Promo.vue')
  }
  ,
  {
    path: '/messages',
    name: 'MessageCenter',
    component: () => import('../views/MessageCenter.vue')
  }
  ,
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  }
  ,
  {
    path: '/recover',
    name: 'Recover',
    component: () => import('../views/Recover.vue')
  }
  ,
  {
    path: '/records',
    name: 'Records',
    component: () => import('../views/Records.vue')
  }
  ,
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: () => import('../views/Withdraw.vue')
  }
  ,
  {
    path: '/share',
    name: 'Share',
    component: () => import('../views/Share.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
