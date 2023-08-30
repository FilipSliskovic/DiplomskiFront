<template>
    <BasicAdminTable v-if="serverData" :parentData='serverData' :ParItemsPerPage="itemsPerPage" :setupProps="setupProps"/>
</template>
<script>
import axios from '@/axios';
import BasicAdminTable from '../Components/BasicAdminTable.vue';
export default{
    name:"admin-shifts",
    components:{
        BasicAdminTable,
    },
    data: ()=> ({
        serverData : null,
        itemsPerPage: 0,
       

        setupProps : {
          Url : "http://localhost:5000/api/Shifts",
          AllowDelete : true,
          AllowUpdate : true,
          AllowDateSearch: false,
          AllowSearch: true,
          formTitle : "Shifts"
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
          .get(this.setupProps.Url, {
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