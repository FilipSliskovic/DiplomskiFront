<template>
  <BasicAdminTable
    v-if="serverData"
    :parentData="serverData"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.UpdateSuperUser"
    @UpdateItem="this.UpdateSuperUser"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="7" md="5">
        <v-select
          label="User"
          :items="this.Users"
          item-value="id"
          item-title="username"
          v-model="ChangeSuperUser.UserId"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="7" md="5">
        <v-checkbox
          v-model="ChangeSuperUser.GiveWorker"
          :label="`Worker: ${ChangeSuperUser.GiveWorker.toString()}`"
        ></v-checkbox>
      </v-col>
    </template>
    <template #UpdateItemSlot>
      <v-col cols="12" sm="7" md="5">
        <v-select
          label="User"
          :items="this.Users"
          item-value="id"
          item-title="username"
          v-model="ChangeSuperUser.UserId"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="7" md="5">
        <v-checkbox
          v-model="ChangeSuperUser.GiveWorker"
          :label="`Worker: ${ChangeSuperUser.GiveWorker.toString()}`"
        ></v-checkbox>
      </v-col>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-Workers",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    serverData: null,
    itemsPerPage: 0,
    Users: null,
    ChangeSuperUser: {
      UserId: null,
      GiveWorker: new Boolean(),
    },
    setupProps: {
      Url: "http://localhost:5000/api/Worker",
      AllowDelete: false,
      AllowUpdate: true,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "SuperUsers",
      AllowCreate: true,
    },
  }),
  mounted() {
    this.getData();
    this.getUsers();
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
    getUsers() {
      var that = this;
      axios
        .get("/api/users", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Users = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    UpdateSuperUser() {
      axios
        .put("/api/SuperUsers", this.ChangeSuperUser, {
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
    GetUpdateItem(item) {
      this.ChangeSuperUser = item;
      this.ChangeSuperUser.UserId = item.id;
      this.ChangeSuperUser.GiveWorker = true;
      console.log(this.ChangeSuperUser);
    },
  },
};
</script>
