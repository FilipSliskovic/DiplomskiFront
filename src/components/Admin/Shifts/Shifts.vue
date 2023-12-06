<template>
  <BasicAdminTable
    v-if="serverData"
    :parentData="serverData"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.CreateNewShift"
    @UpdateItem="this.UpdateShift"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="shiftName" label="Name"> </v-text-field>
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
  name: "admin-shifts",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    serverData: null,
    itemsPerPage: 0,
    shiftName: null,
    ItemToUpdate: {
      name: null,
      isActive: null,
    },
    setupProps: {
      Url: "http://localhost:5000/api/Shifts",
      AllowDelete: true,
      AllowUpdate: true,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Shifts",
      AllowCreate: true,
    },
  }),
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      console.log("asd");
      axios
        .get(this.setupProps.Url, {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          const updatedItems = response.data.data.map((item) => {
            item.isActive = item.isActive ? "Active" : "Not Active";
            return item;
          });
          that.serverData = updatedItems;
          that.itemsPerPage = response.data.itemsPerPage;
          console.log(that.serverData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    CreateNewShift() {
      // console.log(this.NewProduct);

      axios
        .post(
          "/api/shifts",
          { name: this.shiftName },
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
    UpdateShift() {
      axios
        .put(
          "/api/shifts",
          {
            id: this.ItemToUpdate.id,
            name: this.ItemToUpdate.name,
            isActive: this.ItemToUpdate.isActive,
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
