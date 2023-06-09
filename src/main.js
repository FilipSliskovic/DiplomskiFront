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
import Admin from "./components/Admin/AdminPanel.vue";
import AdminCafe from "./components/Admin/Cafes/Cafe.vue";
import AdminProduct from "./components/Admin/Products/Products.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HelloWorld },
    { path: "/Tabela", component: Tabela },
    { path: "/Products", component: AllProducts, meta:{IsAuth: true} },
    { path: "/Login", component: Login },
    { path: "/Cafe", component: Cafe, meta:{IsAuth: true} },
    { path: "/Admin", component: Admin, children:[
      {path: "Products", component: AdminProduct,},
      {path: "Cafe", component: AdminCafe,}
    ] , meta:{IsAuth: true}},
    // { path: "/Admin/Products", component: AdminProduct, meta:{IsAuth: true} },
    // { path: "/Admin/Cafes", component: AdminCafe, meta:{IsAuth: true} },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.IsAuth && !store.getters.IsAuthenticated) {
    next("/Login");
  } else if (to.meta.notAuth && store.getters.IsAuthenticated) {
    next("/");
  } else {
    next();
  }
});


loadFonts();

createApp(App).use(vuetify).use(router).use(store).mount("#app");
