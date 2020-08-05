import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/app.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import VueFuse from 'vue-fuse'
import store from './store'
const VueScrollTo = require('vue-scrollto');
 
Vue.use(VueScrollTo, {
  container: "body",
  duration: 400,
  easing: "ease-in-out",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(VueFuse)

Vue.config.productionTip = false

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
