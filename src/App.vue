<template>
  <v-app>
    <v-main>
      <Header></Header>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header/Header.vue'

export default {
  name: 'App',

  

  components: {
    Header,
  },

  data: () => ({
    //
   


  }),
}
</script>

<style>

a{
  color: white;
  text-decoration: none;
}

</style>
