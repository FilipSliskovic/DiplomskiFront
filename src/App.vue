<template>
  <v-app>
    <v-main>
      <Header></Header>
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component"  />
        </transition>
      </router-view>
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
  created(){
    this.$store.dispatch('tryLogin');
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


/* Transitions */
.route-enter-from{
  opacity: 0;
  transform: translateX(-100px);
}
.route-enter-active{
  transition: all 0.4s ease-out;
}

.route-leave-to{
  opacity: 0;
  transform: translateX(100px);
}

.route-leave-active{
  transition: all 0.4s ease-in;
}

</style>
