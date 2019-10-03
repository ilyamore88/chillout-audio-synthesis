import Vue from 'vue';
import App from './App.vue';
import router from './router';
import uniqueId from 'vue-unique-id';

Vue.config.productionTip = false;

Vue.use(uniqueId);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
