<template>
  <BasicAdminTable
    v-if="products"
    :parentData="products"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.CreateNewProduct"
    @UpdateItem="this.UpdateProduct"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewProduct.name" label="Name"> </v-text-field>
      </v-col>

      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewProduct.description" label="Description">
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewProduct.price" label="Price"> </v-text-field>
      </v-col>

      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewProduct.amount" label="Amount (ml)">
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="8" md="6">
        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Upload images for product"
          prepend-icon="mdi-camera"
          label="Images"
          multiple
          v-model="NewProduct.Image"
        ></v-file-input>
      </v-col>

      <v-col cols="12" sm="7" md="5">
        <v-select
          label="Category"
          :items="this.Categories"
          item-value="id"
          item-title="name"
          v-model="NewProduct.CategoryId"
        ></v-select>
      </v-col>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-products",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    products: null,
    itemsPerPage: 0,
    NewProduct: {
      CategoryId: null,
    },
    Categories: null,

    setupProps: {
      Url: "http://localhost:5000/api/products",
      AllowDelete: true,
      AllowUpdate: false,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Products",
      AllowCreate: true,
    },
  }),
  mounted() {
    this.getData();
    this.getCategories();
  },
  methods: {
    getData() {
      var that = this;
      axios
        .get(this.setupProps.Url, {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.products = response.data.data;
          that.itemsPerPage = response.data.itemsPerPage;
          console.log(that.products);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCategories() {
      var that = this;
      axios
        .get("/categories", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Categories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    CreateNewProduct() {
      // console.log(this.NewProduct);
      console.log(this.NewProduct);
      var data = new FormData();
      data.append("Image", this.NewProduct.Image[0]);
      data.append("name", this.NewProduct.name);
      data.append("description", this.NewProduct.description);
      data.append("price", this.NewProduct.price);
      data.append("amount", this.NewProduct.amount);
      data.append("CategoryId", this.NewProduct.CategoryId);
      axios
        .post("/api/products", data, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.Token,
          },
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
