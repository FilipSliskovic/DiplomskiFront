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
      <v-btn variant="outlined" color="teal  darken-4"> Update </v-btn>
      <v-btn variant="outlined" color="red"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "Reservation-Card",
  data: () => ({}),
  props: {
    reservation: {},
  },
};
</script>
