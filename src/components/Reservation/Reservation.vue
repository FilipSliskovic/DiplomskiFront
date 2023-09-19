<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center" cols="12">Reservations</h1>
        <hr />
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="12" v-if="this.Reservations.length == 0">
        <h2 class="text-center">You dont have any reservations!</h2>
      </v-col>
      <v-col cols="auto">
        <v-dialog transition="dialog-bottom-transition" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn
              color="green darken-4"
              v-bind="props"
              @click="GetNewReservationData()"
              >Create a new Reservation</v-btn
            >
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-toolbar
                color="primary"
                title="Create a new reservaiton"
              ></v-toolbar>
              <v-card-text>
                <v-select
                  label="Cafe"
                  :items="this.Cafes"
                  item-title="name"
                  v-model="SelectedCafe"
                  return-object
                  @input="filteredTables"
                ></v-select>
                <v-select
                  label="Table"
                  :items="this.filteredTables"
                  item-title="name"
                  v-model="SelectedTable"
                  return-object
                >
                </v-select>
                <input
                  type="datetime-local"
                  v-model="this.ReservationDateTime"
                  class="ml-5"
                />
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  variant="outlined"
                  @click="
                    CreateNewReservaiton();
                    isActive.value = false;
                  "
                  >Create a reservation</v-btn
                >
                <v-btn variant="outlined" @click="isActive.value = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">From the bottom</v-btn>
      </template>
    </v-row>
    <v-row v-if="Reservations.length > 0" class="mt-10">
      <ReservationCard
        v-for="reservation in this.Reservations"
        :key="reservation.id"
        :reservation="reservation"
        :Cafes="Cafes"
        :Tables="Tables"
        @refreshReservations="GetReservations"
        @GetNewReservationData="GetNewReservationData"
      >
      </ReservationCard>
    </v-row>
  </v-container>
</template>
<script>
import axios from "@/axios";
import ReservationCard from "./ReservationCard.vue";
export default {
  name: "Reservation-1",
  data: () => ({
    Reservations: [],
    Cafes: [],
    Tables: [],
    SelectedCafe: null,
    SelectedTable: null,
    ReservationDateTime: null,
  }),
  components: {
    ReservationCard,
  },
  mounted() {
    this.GetReservations();
  },
  computed: {
    filteredTables() {
      if (!this.SelectedCafe) {
        return [];
      }
      return this.Tables.filter(
        (table) => table.cafeName === this.SelectedCafe.name
      );
    },
  },

  methods: {
    GetReservations() {
      var that = this;
      axios
        .get("/api/reservation?UserId=" + this.$store.getters.userId, {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Reservations = response.data.data;
          console.log(that.Reservations);
        });
    },
    GetNewReservationData() {
      this.GetCafes();
      this.GetTables();
    },
    GetCafes() {
      var that = this;
      axios
        .get("/api/cafe", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Cafes = response.data.data;
          console.log(that.Cafes);
        });
    },
    GetTables() {
      var that = this;
      axios
        .get("/api/table", {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          that.Tables = response.data.data;
          console.log(that.Tables);
        });
    },
    CreateNewReservaiton() {
      axios
        .post(
          "/api/Reservation",
          {
            userid: this.$store.getters.userId,
            tableid: this.SelectedTable.id,
            reservationDateTime: this.ReservationDateTime,
          },
          {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          }
        )
        .then((response) => {
          this.GetReservations();
          console.log(response);
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
  // beforeMount(){
  //   this.$store.dispatch("getData" , {url: "http://localhost:5000/api/cafe", token: "Bearer " + this.$store.getters.Token});
  // },
  // mounted() {

  //     console.log(this.$store.getters.Data);
  // //   var that = this;
  // //   axios
  // //     .get("http://localhost:5000/api/products", {
  // //       headers: { Authorization: "Bearer " + this.$store.getters.Token },
  // //     })
  // //     .then((response) => {
  // //       that.products = response.data.data;
  // //       console.log(that.products);
  // //     });
  // },
};
</script>
