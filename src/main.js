import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta' 
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index'
import dateFilter from '@/filtres/date.filter.js'
import currencyFilter from '@/filtres/currency.filter.js'
import localizeFilter from '@/filtres/localize.js'
import tooltipDirective from '@/directives/tooltip.directive.js'
import messagePlugin from '@/utils/message.plugin.js'
import titlePlugin from '@/utils/title.plugin.js'
import store from './store/index'
import 'materialize-css/dist/js/materialize.min'
import Loader from '@/components/app/Loader.vue'
import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/database'


Vue.config.productionTip = false


Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter )
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDEfagmVtrBPyNbNrpDct7eLo4qlnkDuYs",
  authDomain: "vue-crm-582f7.firebaseapp.com",
  projectId: "vue-crm-582f7",
  storageBucket: "vue-crm-582f7.appspot.com",
  messagingSenderId: "1035579326149",
  appId: "1:1035579326149:web:c0b43a7ad855331d413aac",
  measurementId: "G-LEV447RJGB"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App) 
    }).$mount('#app')
  }

}) 



