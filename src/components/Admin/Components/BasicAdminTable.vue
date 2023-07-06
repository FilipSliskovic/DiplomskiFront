<template>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="parentData"
      item-value="name"
      class="elevation-1"
    ></v-data-table>
  </template>

  <script>
  export default {
    props:{
      ParItemsPerPage:null,
      parentData:{
        type:Object,
        required: true
      }
    },
    data () {

      return {
        itemsPerPage: this.ParItemsPerPage,
        keys: Object.keys(this.parentData),
            
        headers: [    
          {
            title: 'ID',
            align:'start',
            key: 'id'
          } , 
          {     
            title: 'Name',        
            align: 'end',      
            key: 'name',        
          },        
          { title: 'Amount', align: 'end', key: 'amount', sortable:true },     
          { title: 'Category', align: 'end', key: 'categoryName' },       
          { title: 'Description', align: 'end', key: 'description' },       
          { title: 'Price', align: 'end', key: 'price' },
          { title: 'Image names', align: 'end', key: 'imageNames' },
        ],
      }
    },
    // mounted(){
    //   console.log(this.parentData);
    // },
    setup(props){
      
      
      console.log(props);
      
    }
  }
</script>