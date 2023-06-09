<template>
    Cafe
  </template>
  <script>
  import axios from "axios";
  export default {
    name:"Cafe-1",
    data: () => ({
        cafes: [],
    }),
    components: {
     
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
  