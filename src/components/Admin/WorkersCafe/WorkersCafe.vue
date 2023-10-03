<template>
  <BasicAdminTable
    v-if="serverData"
    :parentData="serverData"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
  />
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
    },
  },
};
</script>
