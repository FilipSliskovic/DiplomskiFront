<template>
    <v-data-table
      :headers="headers"
      :items="this.Orders"
      :sort-by="[{ key: 'calories', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>My Orders</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            transition="dialog-top-transition"
            
            max-width="450"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
                @click="getTables()"
              >New Order</v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar
                  color="primary"
                  title="Create a new Order"
                ></v-toolbar>
                <v-select
                  label="Table"
                  :items=this.Tables
                  item-value="id"
                  item-title="name"
                  v-model="SelectedTable"
                  
                ></v-select>
                <v-card-actions class="justify-end">
                  <v-btn
                    variant="text"
                    @click="createNewOrder(this.SelectedTable); isActive.value = false"
                  >Create</v-btn>
                  <v-btn
                    variant="text"
                    @click="isActive.value = false"
                  >Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-dialog
            v-model="dialog"
            transition="dialog-top-transition"
            max-width="950px"
          >
            
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  

              <v-card-text>
                <v-container v-if="SingleOrder.length">
                  
                  <v-card 
                  v-for="cafeProductOrder in SingleOrder" :key="cafeProductOrder.id"
                  variant="outlined"
                  >
                  <v-row align="center">
                    
                      <v-col>
                      <v-card-text>
                        Name: {{cafeProductOrder.cafeProducts.productName}}
                      </v-card-text>
                      </v-col>
                      <v-col>
                      <v-card-text>
                        Price per: {{cafeProductOrder.cafeProducts.price}}RSD
                      </v-card-text>
                      </v-col>  
                      <v-col>
                      <v-card-text>
                        Amount: {{cafeProductOrder.amountOfProducts}}
                      </v-card-text>
                      </v-col>
                      <v-col>
                      <v-card-text>
                        Total: {{cafeProductOrder.totalProductsPrice}}RSD
                      </v-card-text>
                    </v-col>
                    <v-col>
                      <v-btn
                      rounded="xl"
                      color="error"
                      @click="deleteCafeProductOrder(cafeProductOrder.id)"
                      >
                      Delete
                      </v-btn>
                    </v-col>
                  </v-row>
                  </v-card>
                </v-container>
                <v-container v-else>
                  <v-card-text>
                    This order doesnt have any products
                  </v-card-text>
                </v-container>
              </v-card-text>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-select
                      label="Product"
                      :items= this.CafeProducts
                      item-value="id"
                      item-title="productName"
                      v-model="SelectedCafeProductId"
                    ></v-select>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                      label="Amount"
                      :items= this.AmountOptions
                      
                      v-model="SelectedAmount"
                    ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      
                    >
                    <v-btn
                    color="teal-darken-4"
                    variant="outlined"
                    
                    :disabled="SelectedAmount === 0 || SelectedCafeProductId === 0"
                    @click="save"
                  >
                    Add Order
                  </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="outlined"
                  @click="close"
                  
                >
                  Cancel
                </v-btn>
                

                <v-btn
                  color="blue-accent-4"
                  variant="elevated"
                  elevation="8"
                  :disabled="!SingleOrder.length"
                  @click="checkout"
                >
                  Checkout
                  <!-- <v-tooltip
                  activator="parent"
                  location="top"
                  >Must have products to checkout</v-tooltip> -->
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Actions`]="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="getSingleOrder(item.raw)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteOrder(item.raw.orderId , 'Deleted')"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>
  <script>
  import axios from 'axios';
    export default {
        name: "Orders-1",
      data: () => ({
        dialog: false,
        dialogDelete: false,
        
        desserts: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
        Orders : [],
        SingleOrder : [],
        CafeProducts : [],
        Tables : [],
        headers: [],
        WorkerCafe : new Object,
        SelectedTable: 0,
        AmountOptions: Array.from({length:16},(_,i) => i),
        SelectedCafeProductId: 0,
        SelectedAmount: 0,
        SelectedOrderId: 0
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Order' : 'Edit Order'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      mounted()
      {
        this.getOrders()

        this.getWorkersCafe()
        
      },

      methods: {
        
        initialize () {
          
        },

        getOrders()
        {

          var that = this
          axios
          .get("http://localhost:5000/api/orders?workerid=" + this.$store.getters.userId, {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          })
          .then((response) => {
            that.Orders = response.data.data;
            that.headers = this.getHeaders(that.Orders);
            //console.log(that.Orders);
          });

        },

        getWorkersCafe()
        {
          var that = this

          axios
          .get("http://localhost:5000/api/workerscafe?workerid=" + this.$store.getters.userId, {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          })
          .then((response) => {
            that.WorkerCafe = response.data.data.slice(-1);
            //console.log(that.WorkerCafe[0].cafeName);
          });
        },

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
            // if (this.setupProps.AllowDelete || this.setupProps.AllowUpdate) {
              header.push({title: "Actions", align: 'end', key: "Actions", sortable:false})
            // }
            
          
          return header; 
        },

        getTables()
        {
          var that = this
          if(this.Orders)
          {
            axios
            .get("http://localhost:5000/api/table?keyword=" + this.WorkerCafe[0].cafeName, {
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            })
            .then((response) => {
              that.Tables = response.data.data;
              //console.log(that.Tables);
            });
          }

        },
        
        createNewOrder(tableId)
        {

          if(tableId && tableId > 0)
          {
            var Order = {
              tableId: tableId,
              DateAndTime: new Date()
            }
            axios
            .post("http://localhost:5000/api/orders",Order,{
                headers: { Authorization: "Bearer " + this.$store.getters.Token },
              })
            .then(response=>{
              console.log(response)
              this.getOrders()
              alert("Created!")
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            })
          }

          


        },

         getSingleOrder(order)
        {
          if(order !== undefined)
          {
            this.SelectedOrderId = order.orderId




            axios
            .get("http://localhost:5000/api/cafeproducts?CafeName=" + order.cafeName, {
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            })
            .then((response) => {
              that.CafeProducts = response.data.data;
              //console.log(that.CafeProducts);
              
            });
          }
          
          var that = this
          
            axios
            .get("http://localhost:5000/api/CafeProductOrders?OrderId=" + this.SelectedOrderId, {
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            })
            .then((response) => {
              that.SingleOrder = response.data.data;
              //console.log(that.SingleOrder);
              
            });


            
          
            this.dialog = true
          
        },

        deleteCafeProductOrder(id)
        {
          
          axios
          .delete("http://localhost:5000/api/CafeProductOrders" + "/" + id,{
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            })
          .then(response=>{
            console.log(response)
            this.getSingleOrder()
            //alert("Deleted!")
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
        },

        deleteOrder(id, message)
        {
          axios
          .delete("http://localhost:5000/api/Orders" + "/" + id,{
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            })
          .then(response=>{
            console.log(response)
            this.getOrders()
            alert(message)
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
        },

        checkout()
        {
          axios
            .get("http://localhost:5000/api/Orders/" + this.SelectedOrderId, {
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            })
            .then((response) => {
              console.log(response.data);
              //console.log(that.CafeProducts);
              this.dialog = false
            });
            this.deleteOrder(this.SelectedOrderId,"Checked out!")
            
        },
  
        editItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          //alert(this.SelectedCafeProductId + " " + this.SelectedAmount)
          
          //var that = this

          axios
          .post("http://localhost:5000/api/CafeProductOrders",{ cafeProductId:  this.SelectedCafeProductId,productamount : this.SelectedAmount, orderId : this.SelectedOrderId },{
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            })
          .then(response=>{
            console.log(response)
            this.getSingleOrder()
            // alert(this.SelectedOrderId)
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          })






          //this.close()
        },
      },
    }
  </script>