<template>
    <p>Cafes</p>
    <BasicAdminTable v-if="products" :parentData='products' :ParItemsPerPage="itemsPerPage"/>
</template>
<script>
import axios from 'axios';
import BasicAdminTable from '../Components/BasicAdminTable.vue';
export default{
    name:"admin-cafe",
    components:{
        BasicAdminTable,
    },
    data: ()=> ({
        products : null,
        itemsPerPage: 0,
    }),
    mounted(){
        this.getData();
    },
    methods:{
      getData()
      {
        var that = this;
        axios
          .get("http://localhost:5000/api/cafe", {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          })
          .then((response) => {
            that.products = response.data.data;
            that.itemsPerPage = response.data.itemsPerPage;
            console.log(that.products);
          })
          .catch(error => {
          console.error(error);
          });
      }
    }
    
}
</script>