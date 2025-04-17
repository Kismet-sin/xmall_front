//异步组件加载
const Index = () => import('@/views/Index');
const Login = () => import('@/views/Login');
const Home = () => import('@/views/Home')
const Goods = () => import('@/views/Goods')
const Thanks = () => import('@/views/Thanks')



import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '@/views/Index'
// import Login from '@/views/Login'
// import Home from '@/views/Home'
// import Goods from '@/views/Goods'
// import Thanks from '@/views/Thanks'
// import GoodsDetail from '@/views/GoodsDetail'
// import User from '@/views/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Home',
    component:Index,
    children:[
      {
        path:'/home',
        component:Home,
        meta: {
          auth: false
        }

      },
      {
        path:'/goods',
        component:Goods,
        meta: {
          auth: false
        }

      },
      {
        path:'/thanks',
        component:Thanks,
        meta: {
          auth: false
        }
      },{
        path:'goodsDetail',
        name:'goodsDetail',
        component:GoodsDetail,
        meta: {
          auth: false
        }
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta: {
      auth: false
    }

  },
  {
    path: '/user',
    name:'user',
    component:User,
    meta:{
      auth:true
    }
  }
  
]

const router = new VueRouter({
  mode : 'history',
  routes
})

export default router
