<template>
  <BasicAdminTable
    v-if="serverData"
    :parentData="serverData"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
    @CreateNewItem="this.CreateNewWorkerCafe"
    @UpdateItem="this.UpdateProduct"
    @GetUpdateItem="this.GetUpdateItem"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="7" md="5">
        <v-select
          label="User"
          :items="this.Users"
          item-value="id"
          item-title="username"
          v-model="NewWorkerCafe.userid"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="7" md="5">
        <v-select
          label="Cafe"
          :items="this.Cafes"
          item-value="id"
          item-title="name"
          v-model="NewWorkerCafe.CafeId"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="7" md="5">
        <v-select
          label="Shift"
          :items="this.Shifts"
          item-value="id"
          item-title="name"
          v-model="NewWorkerCafe.shiftid"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="7" md="5">
        <input
          type="datetime-local"
          v-model="NewWorkerCafe.date"
          class="ml-5"
        />
      </v-col>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-WorkersCafe",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    serverData: null,
    itemsPerPage: 0,
    Users: null,
    Shifts: null,
    Cafes: null,
    NewWorkerCafe: {
      userid: null,
      CafeId: null,
      shiftid: null,
      date: new Date(),
    },
    setupProps: {
      Url: "http://localhost:5000/api/WorkersCafe",
      AllowDelete: true,
      AllowUpdate: false,
      AllowDateSearch: true,
      AllowSearch: true,
      formTitle: "Schedule",
      AllowCreate: true,
    },
  }),
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )
        .toISOString()
        .split("T")[0];
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      )
        .toISOString()
        .split("T")[0];

      var that = this;
      axios
        .get(
          this.setupProps.Url + "?DateFrom=" + startDate + "&DateTo=" + endDate,
          {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          }
        )
        .then((response) => {
          that.serverData = response.data.data;
          that.itemsPerPage = response.data.itemsPerPage;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      this.getUsers();
      this.getShifts();
      this.getCafes();
    },
    getUsers() {
      var that = this;
      axios
        .get("/api/Worker", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Users = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getShifts() {
      var that = this;
      axios
        .get("/api/Shifts", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Shifts = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCafes() {
      var that = this;
      axios
        .get("/api/Cafe", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Cafes = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    CreateNewWorkerCafe() {
      // console.log(this.NewProduct);

      axios
        .post("/api/WorkersCafe", this.NewWorkerCafe, {
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
