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
        
        // headers: [    
        //   {
        //     title: 'ID',
        //     align:'start',
        //     key: 'id'
        //   } , 
        //   {     
        //     title: 'Name',        
        //     align: 'end',      
        //     key: 'name',        
        //   },        
        //   { title: 'Amount', align: 'end', key: 'amount', sortable:true },     
        //   { title: 'Category', align: 'end', key: 'categoryName' },       
        //   { title: 'Description', align: 'end', key: 'description' },       
        //   { title: 'Price', align: 'end', key: 'price' },
        //   { title: 'Image names', align: 'end', key: 'imageNames' },
        // ],

        headers: this.getHeaders(this.parentData),
      }
    },
    methods:
    {
      getHeaders(parentData)
      {
        var header = [];
        // header.push({title: "asd", align: 'end', key: "qwe", sortable:true});
        
        var prvi = parentData[0];
          // console.log(d);
          for(let h in prvi)
          {
            // console.log(h);
            header.push({title: h.toUpperCase(), align: 'start', key: h, sortable:true})
          }
        
        return header; 
      }
    },
    
    mounted(){
      // this.getHeaders(this.parentData);
    },
    // setup(props){
      
      
    //   // console.log(props);
      
    // }
  }
</script>