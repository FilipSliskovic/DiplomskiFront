<template>
    <p>Logs</p>
    <BasicAdminTable v-if="serverData" :parentData='serverData' :ParItemsPerPage="itemsPerPage" :setupProps='setupProps'/>
</template>
<script>
import axios from 'axios';
import BasicAdminTable from '../Components/BasicAdminTable.vue';
export default{
    name:"admin-usecaselogs",
    components:{
        BasicAdminTable,
    },
    data: ()=> ({
        serverData : null,
        itemsPerPage: 0,
        
        setupProps : {
          Url : "http://localhost:5000/api/usecaselogs",
          AllowDelete : false,
          AllowUpdate : false
        }
    }),
    mounted(){
        this.getData();
    },
    methods:{
      getData()
      {
        var that = this;
        axios
          .get(this.setupProps.Url + "?datefrom=2023-08-01&dateto=2023-10-01", {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          })
          .then((response) => {
            that.serverData = response.data;
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