<template>
  <v-card class="mx-auto mt-4" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          {{ "Cafe: " + reservation.cafeName }}
        </div>
        <div class="text-h6 mb-1">
          {{ reservation.reservationDateTime }}
        </div>
        <div class="text-h6 mb-1">
          {{ "Seats: " + reservation.tableSeats }}
        </div>
        <div class="text-caption">
          {{
            "You have a reservation at: " +
            reservation.cafeAdress +
            ", and your reservation id is: " +
            reservation.id
          }}
        </div>
      </div>
    </v-card-item>

    <v-card-actions class="justify-end">
      <v-btn variant="outlined" color="teal  darken-4" @click="openUpdate">
        Update
      </v-btn>
      <v-btn variant="outlined" color="red" @click="dialogDelete = true">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5"
        >Are you sure you want to delete this item?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
          >Cancel</v-btn
        >
        <v-btn color="blue-darken-1" variant="text" @click="DeleteReservation"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogUpdate" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Changing rezervation</v-card-title>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
          >Cancel</v-btn
        >
        <v-btn color="blue-darken-1" variant="text" @click="UpdateRezervation"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "@/axios";
export default {
  name: "Reservation-Card",
  emits: ["refreshReservations", "GetNewReservationData"],
  data: () => ({
    dialogDelete: false,
    dialogUpdate: false,
    SelectedCafe: null,
    SelectedTable: null,
    ReservationDateTime: null,
  }),
  props: {
    reservation: Object,
    Cafes: Array,
    Tables: Array,
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
    openUpdate() {
      this.dialogUpdate = true;
      this.$emit("GetNewReservationData");
    },
    UpdateRezervation() {
      axios
        .put(
          "/api/Reservation/",
          {
            id: this.reservation.id,
            tableid: this.SelectedTable.id,
            reservationDateTime: this.ReservationDateTime,
          },
          {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          }
        )
        .then((response) => {
          console.log(response);
          this.$emit("refreshReservations");
          // alert("Deleted!")
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
      this.dialogUpdate = false;
    },
    DeleteReservation() {
      axios
        .delete("/api/Reservation/" + this.reservation.id, {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          console.log(response);
          this.$emit("refreshReservations");
          // alert("Deleted!")
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

      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>
