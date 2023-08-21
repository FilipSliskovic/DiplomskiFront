<template>
    
        <v-tabs
        fixed-tabs
        bg-color="indigo-darken-2"
      >
        <router-link to="/"><v-tab>
           Home 
          
        </v-tab></router-link>
        <!-- <router-link to="/tabela">
        <v-tab>
           Tabela
        </v-tab></router-link>
  
        <router-link to="/Products">
        <v-tab>
          Products
       </v-tab></router-link> -->
  
       <router-link to="/Cafe">
        <v-tab>
          Cafes
       </v-tab></router-link>

       <router-link to="/Orders">
        <v-tab v-if="IsSuperUser">
          My Orders
       </v-tab></router-link>

       <router-link to="/Admin" >
        <v-tab v-if="IsSuperUser">
          Admin
       </v-tab></router-link>

       <router-link to="/Login">
        <v-tab v-if="!IsLoggedIn">
          Login
       </v-tab></router-link>
       <router-link to="/">
        <v-tab v-if="IsLoggedIn" @click="this.$store.dispatch('logout')">Logout</v-tab>
       </router-link>
       
       
      </v-tabs>
      
   
  </template>
  <script>
  export default {
    name: "nav-bar",
    data: () => ({
    }),
    components: {
    },
    computed:{
    IsLoggedIn(){
      return this.$store.getters.IsAuthenticated

    },
    IsSuperUser(){
      return this.$store.getters.IsSuperUser
    }
  },
  };
  </script>