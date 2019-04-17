import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import MiCalender from './pages/MiCalender.vue'
import School from './pages/School.vue'
import Exchange from './pages/Exchange.vue'
import Windows10 from './pages/Windows10.vue'
import MacOS from './pages/MacOS.vue'
import MIUI from './pages/MIUI.vue'
import EMUI from './pages/EMUI.vue'
import IOS from './pages/IOS.vue'
import Android from './pages/Android.vue'
import GoogleCalendar from './pages/GoogleCalendar.vue'
import Contact from './pages/Contact.vue'

const routes = [
  { path: '/', component: MiCalender },
  { path: '/school', component: School },
  { path: '/exchange', component: Exchange },
  { path: '/windows-10', component: Windows10 },
  { path: '/macos', component: MacOS },
  { path: '/miui', component: MIUI },
  { path: '/emui', component: EMUI },
  { path: '/ios', component: IOS },
  { path: '/android', component: Android },
  { path: '/google-calendar', component: GoogleCalendar },
  { path: '/contact', component: Contact }
]

const router = new VueRouter({
  routes
});

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
