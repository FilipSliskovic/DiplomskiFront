<template>
  <BasicAdminTable
    v-if="products"
    :parentData="products"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.CreateNewCafe"
    @UpdateItem="this.UpdateShift"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewCafe.name" label="Name"> </v-text-field>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewCafe.adress" label="Adress"> </v-text-field>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewCafe.description" label="Description">
        </v-text-field>
      </v-col>
    </template>
    <template #UpdateItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="ItemToUpdate.name" label="Name" type="text">
        </v-text-field>
      </v-col>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-cafe",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    products: null,
    itemsPerPage: 0,
    NewCafe: {
      name: null,
      description: null,
      adress: null,
    },
    setupProps: {
      Url: "/api/cafe",
      AllowDelete: true,
      AllowUpdate: false,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Cafes",
    },
  }),
  mounted() {
    this.getData();
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
    CreateNewCafe() {
      // console.log(this.NewProduct);

      axios
        .post(
          "/api/cafe",
          {
            name: this.NewCafe.name,
            description: this.NewCafe.description,
            adress: this.NewCafe.adress,
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
  },
};
</script>
