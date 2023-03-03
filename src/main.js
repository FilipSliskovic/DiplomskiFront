import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createRouter,createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Tabela from './components/Tabela.vue'

const router = createRouter({
  history:createWebHistory(),
  routes: [
    {path: '/Home', component: HelloWorld},
    {path: '/Tabela',component: Tabela},
  ]
});




loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
