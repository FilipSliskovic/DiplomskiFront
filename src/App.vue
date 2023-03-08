<template>
  <v-app>
    <v-main>
      <v-tabs
      fixed-tabs
      bg-color="indigo-darken-2"
    >
      <router-link to="/home"><v-tab>
         Home 
        
      </v-tab></router-link>
      <router-link to="/tabela">
      <v-tab>
         Tabela
      </v-tab></router-link>

      <router-link to="/Products">
      <v-tab>
        Products
     </v-tab></router-link>

     <router-link to="/Login">
      <v-tab>
        Login
     </v-tab></router-link>


    </v-tabs>
      <!-- <HelloWorld/> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>

<style>

a{
  text-decoration: none;
  color: white;
}

</style>
