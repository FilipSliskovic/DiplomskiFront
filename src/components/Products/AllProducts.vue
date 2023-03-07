<template>

 <v-container class="justify-space-between v-row">

    <ProductCard v-for="product in products" :key="product.id"
    :product=product
    
    ></ProductCard>
</v-container>


    
</template>
<script>
import axios from 'axios'
import ProductCard from './ProductCard.vue'
export default {
    data: () => ({
      products: []
      
    }),
    components:{
        ProductCard
    },
    mounted(){
        var that = this;
        axios.get("http://localhost:5000/api/products",{headers:{Authorization:"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjY5YzEzMi1jZTBhLTRjNmYtOTc1OS1jMzEyZDQ4NjI2YzQiLCJpc3MiOiJJQ1RfQVNQIiwiaWF0IjoxNjU0NzExMzE0LCJVc2VySWQiOiI2IiwiVXNlQ2FzZXMiOiJbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw0OCw0OSw1MCw1MSw1Miw1Myw1NCw1NSw1Niw1Nyw1OCw1OSw2MCw2MSw2Miw2Myw2NCw2NSw2Niw2Nyw2OCw2OSw3MCw3MSw3Miw3Myw3NCw3NSw3Niw3Nyw3OCw3OSw4MCw4MSw4Miw4Myw4NCw4NSw4Niw4Nyw4OCw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Niw5Nyw5OCw5OV0iLCJVc2VybmFtZSI6IkZpbGlwIiwibmJmIjoxNjU0NzExMzE0LCJleHAiOjE4MzQ3MTEzMTQsImF1ZCI6IkFueSJ9.T5czGBRgX5dfxrxm_vmccBm4aV0a4XJ-z48cJu-Itnc"}}).then((response)=>{
          that.products = response.data.data;
          console.log(that.products);
        })
      }
  }

</script>