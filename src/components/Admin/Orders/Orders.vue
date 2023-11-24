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
  name: "admin-Orders",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    serverData: null,
    itemsPerPage: 10,

    setupProps: {
      Url: "http://localhost:5000/api/Orders",
      AllowDelete: true,
      AllowUpdate: true,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Orders",
      AllowCreate: false,
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
          that.serverData = response.data.data;
          that.itemsPerPage = response.data.itemsPerPage;
          //console.log(that.serverData);

          that.serverData = that.serverData.map((order) => {
            const date = new Date(order.dateAndTime);
            // console.log(date);
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              //timeZoneName: "short",
            };

            const formattedDate = date.toLocaleString("sr-RS", options);

            return { ...order, dateAndTime: formattedDate };
          });

          // console.log(formattedOrders);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
