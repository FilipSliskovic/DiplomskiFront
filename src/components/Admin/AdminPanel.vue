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
                <router-link class="adminNavLink" :to="{path: '/Admin/Products'}"> <v-list-item title="Home" value="home"></v-list-item></router-link>
                <router-link class="adminNavLink" to="/Admin/Cafe"><v-list-item title="About" value="about"></v-list-item></router-link>
              </v-list>
            </v-navigation-drawer>
            <v-main style="min-height: 250px"> <router-view></router-view> </v-main>
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