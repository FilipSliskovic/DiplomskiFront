<template>
  <v-table height="300px">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";
// import { response } from 'express'
export default {
  name: "tabela-products",

  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
  mounted() {
    var that = this;
    axios
      .get("http://localhost:5000/api/products", {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjY5YzEzMi1jZTBhLTRjNmYtOTc1OS1jMzEyZDQ4NjI2YzQiLCJpc3MiOiJJQ1RfQVNQIiwiaWF0IjoxNjU0NzExMzE0LCJVc2VySWQiOiI2IiwiVXNlQ2FzZXMiOiJbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw0OCw0OSw1MCw1MSw1Miw1Myw1NCw1NSw1Niw1Nyw1OCw1OSw2MCw2MSw2Miw2Myw2NCw2NSw2Niw2Nyw2OCw2OSw3MCw3MSw3Miw3Myw3NCw3NSw3Niw3Nyw3OCw3OSw4MCw4MSw4Miw4Myw4NCw4NSw4Niw4Nyw4OCw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Niw5Nyw5OCw5OV0iLCJVc2VybmFtZSI6IkZpbGlwIiwibmJmIjoxNjU0NzExMzE0LCJleHAiOjE4MzQ3MTEzMTQsImF1ZCI6IkFueSJ9.T5czGBRgX5dfxrxm_vmccBm4aV0a4XJ-z48cJu-Itnc",
        },
      })
      .then((response) => {
        that.desserts = response.data;
        console.log(response.data);
      });
  },
};
</script>
