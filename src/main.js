import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VueNoty from 'vuejs-noty';
import VueDisqus from 'vue-disqus';
import wysiwyg from "vue-wysiwyg";


import 'vuejs-noty/dist/vuejs-noty.css';



Vue.use(VueNoty);
Vue.use(VueDisqus);
Vue.use(wysiwyg, {});

Vue.config.productionTip = false;

const authData = localStorage.getItem('auth');

new Vue({
  //After registration, we save the user data on the root instance
  router,

  data: {
    auth: authData ? JSON.parse(authData) : {}
  },
 
  render: h => h(App),
}).$mount('#app')
