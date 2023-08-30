<template>
  <v-app>
    <v-main>
      <Header></Header>
      <Loader :isLoading="$store.getters.isLoading"></Loader>
      <GlobalAlert :Message="$store.getters.Message" :Show="$store.getters.Show" :Type="$store.getters.AlertType"></GlobalAlert>
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component"  />
        </transition>
      </router-view>
      
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header/Header.vue';
import Loader from './components/Loader/Loader.vue';
import GlobalAlert from './components/GlobalAlert/GlobalAlert.vue';

export default {
  name: 'App',

  

  components: {
    Header,
    Loader,
    GlobalAlert
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
