<template>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
        cover
      ></v-img>
  
      <v-card-title >

        {{product.name}}
      </v-card-title>
  
      <v-card-subtitle>
        Price: {{product.price}}$
      
        
      </v-card-subtitle>
      <v-card-subtitle>
        Amount: {{product.amount}}
      </v-card-subtitle>
      <v-card-subtitle>
        Category: {{product.categoryName}}
      </v-card-subtitle>
      
      <v-card-actions>
        <v-btn
          color="orange-lighten-2"
          variant="text"
        >
          Show description
        </v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            {{product.description}}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>


  <script>



  export default {
    name: 'product-card',
    data: () => ({
      show: false,
      
    }),
    props:{
      product:{}
    }
    
    
  }
</script>