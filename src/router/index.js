import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/compat/app'
import record from '../store/record'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/login',
      name:'login',
      meta:{layout: 'empty'},
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name:'register',
      meta:{layout: 'empty'},
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/categories',
      name:'categories',
      meta:{layout: 'main', auth: true},
      component: () => import('@/views/Categories.vue')
    },
    {
      path: '/detail/:id',
      name:'detail',
      meta:{layout: 'main', auth: true},
      component: () => import('@/views/Detail.vue')
    },
    {
      path: '/history',
      name:'history',
      meta:{layout: 'main', auth: true},
      component: () => import('@/views/History.vue')
    },
    {
      path: '/record',
      name:'record',
      meta:{layout: 'main', auth: true},
      component: () => import('@/views/Record.vue')
    },
    {
      path: '/',
      name:'home',
      meta:{layout: 'main', auth: true},
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/planning',
      name:'planning',
      meta:{layout: 'main', auth: true},
      component: () => import('@/views/Planning.vue')
    },
    {
      path: '/profile',
      name:'profile',
      meta:{layout: 'main', auth: true},
      component: () => import('@/views/Profile.vue')
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login') 
  } else {
    next()
  }
})

export default router

