<template>
  <BasicAdminTable
    v-if="products"
    :parentData="products"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.CreateNewCategory"
    @UpdateItem="this.UpdateCategory"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="newCategory.categoryName" label="Name">
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          label="Parent"
          :items="this.products"
          item-value="id"
          item-title="name"
          v-model="newCategory.ParentCategoryId"
        ></v-select>
      </v-col>
      <!-- <v-col cols="12" sm="8" md="6">
        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Upload images for product"
          prepend-icon="mdi-camera"
          label="Image"
          multiple
          v-model="newCategory.categoryImage"
        ></v-file-input>
      </v-col> -->
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-categories",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    products: null,
    itemsPerPage: 0,
    newCategory: {
      categoryName: null,
      ParentCategoryId: null,
      categoryImage: null,
    },
    setupProps: {
      Url: "http://localhost:5000/Categories",
      AllowDelete: true,
      AllowUpdate: true,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Categories",
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
    CreateNewCategory() {
      // alert(this.tableName + " " + this.selectedCafe);
      // if (this.newCategory.ParentCategoryId <= 0) {
      //   this.newCategory.ParentCategoryId = null;
      // }
      axios
        .post(
          "/categories",
          {
            Name: this.newCategory.categoryName,
            ParentCategoryId:
              this.newCategory.ParentCategoryId > 0
                ? this.newCategory.ParentCategoryId
                : null,
            // ImageFileName: this.newCategory.categoryImage,
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
    UpdateCategory() {
      axios
        .put(
          "/categories",
          {
            Name: this.ItemToUpdate.name,
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
