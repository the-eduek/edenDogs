import { createApp } from 'vue';
import router from './router';
import store from './store';
import './assets/styles/main.scss';
import App from './App.vue';
import lazyLoad from './assets/functions/lazyLoad';

const app = createApp(App);
app.directive('lazyLoad', lazyLoad)
app.use(router);
app.use(store);
app.mount('#app');
