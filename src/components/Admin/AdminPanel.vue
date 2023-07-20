<template>
        <v-card>
          <v-layout>
            <v-navigation-drawer
              floating
              permanent
            >
              <v-list
                density="compact"
                nav
              >
                <router-link class="adminNavLink" :to="{path: '/Admin/Products'}"> <v-list-item title="Products" value="products"></v-list-item></router-link>
                <router-link class="adminNavLink" :to="{path: '/Admin/Categories'}"> <v-list-item title="Categories" value="categories"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/Cafe"><v-list-item title="Cafe" value="Cafe"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/CafeProductOrder"><v-list-item title="CafeProductOrder" value="CafeProductOrder"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/CafeProducts"><v-list-item title="CafeProducts" value="CafeProducts"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/Orders"><v-list-item title="Orders" value="Orders"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/Shifts"><v-list-item title="Shifts" value="Shifts"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/Tables"><v-list-item title="Tables" value="Tables"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/Users"><v-list-item title="Users" value="Users"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/WorkersCafe"><v-list-item title="WorkersCafe" value="WorkersCafe"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/SuperUsers"><v-list-item title="SuperUsers" value="SuperUsers"></v-list-item></router-link>
                <router-link class="adminNavLink" :to="{path: '/Admin/UseCaseLogs'}"> <v-list-item title="UseCaseLogs" value="usecaselogs"></v-list-item></router-link>
              </v-list>
            </v-navigation-drawer>
            <v-main style="min-height: 500px"> <router-view></router-view> </v-main>
          </v-layout>
        </v-card>
        
        
</template>
<script>
export default{
    name: "admin-1",
}


</script>

<style scoped>

.adminNavLink{
  color: black;
}

</style>