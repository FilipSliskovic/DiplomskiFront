<template>
  <BasicAdminTable
    v-if="serverData"
    :parentData="serverData"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.NewTable"
    @UpdateItem="this.UpdateTable"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="tableName"> </v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-select
          label="Cafe"
          :items="this.Cafes"
          item-value="id"
          item-title="name"
          v-model="selectedCafe"
        ></v-select>
      </v-col>
    </template>

    <template #UpdateItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          v-model="ItemToUpdate.name"
          label="Table name"
          type="text"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-select
          label="Amount"
          :items="this.SeatsOptions"
          v-model="ItemToUpdate.seats"
        ></v-select>
      </v-col>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-Tables",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    serverData: null,
    SeatsOptions: Array.from({ length: 10 }, (_, i) => i),
    SelectedSeats: 0,
    ItemToUpdate: null,
    itemsPerPage: 0,
    tableName: "",
    setupProps: {
      Url: "http://localhost:5000/api/table",
      AllowDelete: true,
      AllowUpdate: true,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Tables",
      AllowCreate: true,
    },
    Cafes: [],
    selectedCafe: 0,
  }),
  mounted() {
    this.getData();
    this.getCafes();
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
    NewTable() {
      // alert(this.tableName + " " + this.selectedCafe);
      axios
        .post(
          "/api/table",
          { name: this.tableName, cafeId: this.selectedCafe },
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
    UpdateTable() {
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
