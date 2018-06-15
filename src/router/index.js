import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard/Dashboard';
import Login from '@/components/Account/Login';
import Register from '@/components/Account/Register';
import Device from '@/components/Device/Details';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/device/:deviceId',
      name: 'Device',
      component: Device,
      props: true,
    },
  ],
});
