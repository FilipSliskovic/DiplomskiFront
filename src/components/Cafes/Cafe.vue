<template>
    Cafe
  </template>
  <script>
  
  export default {
    name:"Cafe-1",
    data: () => ({
      
    }),
    components: {
     
    },
    mounted() {

        this.$store.dispatch("getData" , {url: "http://localhost:5000/api/cafe", token: "Bearer " + this.$store.getters.Token});
    //   var that = this;
    //   axios
    //     .get("http://localhost:5000/api/products", {
    //       headers: { Authorization: "Bearer " + this.$store.getters.Token },
    //     })
    //     .then((response) => {
    //       that.products = response.data.data;
    //       console.log(that.products);
    //     });
    },
  };
  </script>
  