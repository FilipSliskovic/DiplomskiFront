<template>
  <v-container class="justify-space-between v-row">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></ProductCard>
  </v-container>
</template>
<script>
import axios from "axios";
import ProductCard from "./ProductCard.vue";
export default {
  data: () => ({
    products: [],
  }),
  components: {
    ProductCard,
  },
  mounted() {
    var that = this;
    axios
      .get("http://localhost:5000/api/products", {
        headers: { Authorization: "Bearer " + this.$store.getters.Token },
      })
      .then((response) => {
        that.products = response.data.data;
        // console.log(that.products);
      });
  },
};
</script>
