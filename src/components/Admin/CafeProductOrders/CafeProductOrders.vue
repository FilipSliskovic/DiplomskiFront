<template>
  <BasicAdminTable
    v-if="serverData"
    :parentData="serverData"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
  >
    <template #newItemSlot>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewCafe.name" label="Name"> </v-text-field>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewCafe.adress" label="Adress"> </v-text-field>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="NewCafe.description" label="Description">
        </v-text-field>
      </v-col>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-CafeProductOrder",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    serverData: null,
    itemsPerPage: 0,

    setupProps: {
      Url: "http://localhost:5000/api/CafeProductOrders",
      AllowDelete: true,
      AllowUpdate: false,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Cafe Product orders",
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
          console.log(that.serverData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
