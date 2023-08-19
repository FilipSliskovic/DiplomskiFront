<template>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-center" cols="12" align>Locations</h1>
          <hr>
          
        </v-col>
      </v-row>
      <v-row>
          <CafeCard
          v-for="cafe in this.cafes" 
          :key="cafe.id"
          :cafe="cafe"
          >
          
          </CafeCard>
      </v-row>
    </v-container>
  </template>
  <script>
  import axios from "axios";
  import CafeCard from "./CafeCard.vue"
  export default {
    name:"Cafe-1",
    data: () => ({
        cafes: [],
    }),
    components: {
     CafeCard
    },
    mounted() {
    var that = this;
    axios
      .get("http://localhost:5000/api/cafe", {
        headers: { Authorization: "Bearer " + this.$store.getters.Token },
      })
      .then((response) => {
        that.cafes = response.data.data;
        console.log(that.cafes);
      });
  },
    // beforeMount(){
    //   this.$store.dispatch("getData" , {url: "http://localhost:5000/api/cafe", token: "Bearer " + this.$store.getters.Token});
    // },
    // mounted() {

        
    //     console.log(this.$store.getters.Data);
    // //   var that = this;
    // //   axios
    // //     .get("http://localhost:5000/api/products", {
    // //       headers: { Authorization: "Bearer " + this.$store.getters.Token },
    // //     })
    // //     .then((response) => {
    // //       that.products = response.data.data;
    // //       console.log(that.products);
    // //     });
    // },
  };
  </script>
  