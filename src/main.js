import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Tabela from "./components/Tabela.vue";
import AllProducts from "./components/Products/AllProducts.vue";
import Login from "./components/Login/Login.vue";
import Cafe from "./components/Cafes/Cafe.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/Home", component: HelloWorld },
    { path: "/Tabela", component: Tabela },
    { path: "/Products", component: AllProducts, meta:{IsAuth: true} },
    { path: "/Login", component: Login },
    { path: "/Cafe", component: Cafe, meta:{IsAuth: true} },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.IsAuth && !store.getters.IsAuthenticated) {
    next("/Login");
  } else if (to.meta.notAuth && store.getters.IsAuthenticated) {
    next("/Home");
  } else {
    next();
  }
});

loadFonts();

createApp(App).use(vuetify).use(router).use(store).mount("#app");
