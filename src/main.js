import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// import { from } from 'core-js/core/array'
Vue.prototype.$http = axios;

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/json';
import { getStore } from '@/utils/storage'
//挂栽axios到Vue原型上
import axios from 'axios';
axios.interceptors.request.use(config => {
  const token = getStore('token');
  if (token) {
    //用户已登录
    
    // config.headers.common['Authorization'] = token;
    config.headers.Authorization = token;
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 未登录或 token 失效，重定向到登录页
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        },
      });
    }
    return Promise.reject(error);
  }
);
router.beforeEach((to, from, next) => {
  const publicPaths = ['/', '/home', '/login', '/goods', '/goodsDetail', '/thanks'];
  // if (to.path === '/login') {
  //   next();
  //   return;
  // }
  if (publicPaths.includes(to.path) || !to.matched.some((record) => record.meta.auth)) {
 // 尝试恢复登录状态
 if (getStore('token') && !store.state.login) {
  axios.post('/api/validate',{}).then(res => {
          // let data = res.data;
          if (res.data.state === 1) {
            // if (to.matched.some(record => record.meta.auth)) {
            //   //未登录 跳转登录界面
            //   next({
            //     path: '/login',
            //     query: {
            //       redirect: to.fullPath
            //     }
            //   })
            // } else {
            //   next();
            // }
            store.commit('ISLOGIN', res.data);
          }
          // else {
             //保存用户信息
            //  store.commit('ISLOGIN',data);
            //  if (to.path === '/login') {
            //    router.push({
            //      path: '/'
            //    })
            //  }
            next();
          
        }).catch(err =>{
          console.error('验证失败:', err.response?.data || err.message);
          store.commit('LOGOUT');
        next();
      });
    } else {
      next();
    }
      return } 
      axios
        .post('/api/validate', {}, {
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then((res) => {
          if (res.data.state === 1) {
            store.commit('ISLOGIN', res.data);
            next();
          } else {
            store.commit('LOGOUT');
            next({
              path: '/login',
              query: {
                redirect: to.fullPath
              }
            });
          }
        })
        .catch((err) => {
          console.error('验证错误:', err.response?.data || err.message);
          store.commit('LOGOUT');
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          });
        });
      });

      Vue.config.productionTip = false;

      new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')