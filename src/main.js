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
import UseCaseLogs from "./components/Admin/UseCaseLogs/UseCaseLogs.vue";
import AdminCategories from "./components/Admin/Categories/Categories.vue";
import CafeProductOrder from "./components/Admin/CafeProductOrders/CafeProductOrders.vue"
import CafeProducts from "./components/Admin/CafeProducts/CafeProducts.vue"
import Orders from "./components/Admin/Orders/Orders.vue"
import Shifts from "./components/Admin/Shifts/Shifts.vue"
import Tables from "./components/Admin/Tables/Tables.vue"
import Users from "./components/Admin/Users/Users.vue"
import WorkersCafe from "./components/Admin/WorkersCafe/WorkersCafe.vue"
import SuperUsers from "./components/Admin/SuperUsers/SuperUsers.vue"
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
      {path: "Products", component: AdminProduct},
      {path: "Categories", component: AdminCategories},
      {path: "CafeProductOrder", component: CafeProductOrder},
      {path: "CafeProducts", component: CafeProducts},
      {path: "Orders", component: Orders,},
      {path: "Shifts", component: Shifts,},
      {path: "Tables", component: Tables,},
      {path: "Cafe", component: AdminCafe,},
      {path: "Users", component: Users,},
      {path: "WorkersCafe", component: WorkersCafe,},
      {path: "SuperUsers", component: SuperUsers,},
      {path: "UseCaseLogs", component: UseCaseLogs},
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
