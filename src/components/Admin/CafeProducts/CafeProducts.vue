<template>
  <BasicAdminTable
    v-if="serverData"
    :parentData="serverData"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.CreateNewCafeProduct"
    @UpdateItem="this.UpdateProduct"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="6" md="4">
        <v-select
          label="Product"
          :items="this.Products"
          item-value="id"
          item-title="name"
          v-model="NewCafeProduct.ProductId"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          label="Cafe"
          :items="this.Cafes"
          item-value="id"
          item-title="name"
          v-model="NewCafeProduct.cafeId"
        ></v-select>
      </v-col>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-CafeProducts",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    serverData: null,
    itemsPerPage: 0,
    NewCafeProduct: {
      ProductId: null,
      cafeId: null,
    },
    Cafes: null,
    Products: null,
    setupProps: {
      Url: "/api/CafeProducts",
      AllowDelete: true,
      AllowUpdate: false,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Cafe Products",
      AllowCreate: true,
    },
  }),
  mounted() {
    this.getData();
    this.getCafes();
    this.getProducts();
  },
  methods: {
    getData() {
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
        .catch((error) => {
          console.error(error);
        });
    },
    getCafes() {
      var that = this;
      axios
        .get("/api/cafe", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Cafes = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getProducts() {
      var that = this;
      axios
        .get("/api/products", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Products = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    CreateNewCafeProduct() {
      // console.log(this.NewProduct);

      axios
        .post("/api/CafeProducts", this.NewCafeProduct, {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          console.log(response);
          this.getData();
        })
        .catch((error) => {
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
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    UpdateProduct() {
      axios
        .put(
          "/api/table",
          {
            name: this.ItemToUpdate.name,
            id: this.ItemToUpdate.id,
            seats: this.ItemToUpdate.seats,
          },
          {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          }
        )
        .then((response) => {
          console.log(response);
          this.getData();
        })
        .catch((error) => {
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
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    GetUpdateItem(item) {
      this.ItemToUpdate = item;
      console.log(item);
    },
  },
};
</script>
