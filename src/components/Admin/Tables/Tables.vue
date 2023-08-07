<template>
    <p>Tables</p>
    <BasicAdminTable v-if="serverData" :parentData='serverData' :ParItemsPerPage="itemsPerPage" :Url="Url"/>
</template>
<script>
import axios from 'axios';
import BasicAdminTable from '../Components/BasicAdminTable.vue';
export default{
    name:"admin-Tables",
    components:{
        BasicAdminTable,
    },
    data: ()=> ({
        serverData : null,
        itemsPerPage: 0,
        Url: "http://localhost:5000/api/Table",
    }),
    mounted(){
        this.getData();
    },
    methods:{
      getData()
      {
        var that = this;
        axios
          .get(this.Url, {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          })
          .then((response) => {
            that.serverData = response.data.data;
            that.itemsPerPage = response.data.itemsPerPage;
            console.log(that.serverData);
          })
          .catch(error => {
          console.error(error);
          });
      }
    }
    
}
</script>