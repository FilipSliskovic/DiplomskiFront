<template>
  <BasicAdminTable
    v-if="products"
    :parentData="products"
    :ParItemsPerPage="itemsPerPage"
    :setupProps="setupProps"
  >
    <template #newItemSlot>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="(value, propertyName) in editedItem"
              :key="propertyName.key"
            >
              <v-text-field
                v-if="propertyName != 'id' && propertyName != 'isActive'"
                v-model="editedItem[propertyName]"
                v-bind:label="propertyName"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </template>
  </BasicAdminTable>
</template>
<script>
import axios from "@/axios";
import BasicAdminTable from "../Components/BasicAdminTable.vue";
export default {
  name: "admin-products",
  components: {
    BasicAdminTable,
  },
  data: () => ({
    products: null,
    itemsPerPage: 0,

    setupProps: {
      Url: "http://localhost:5000/api/products",
      AllowDelete: true,
      AllowUpdate: true,
      AllowDateSearch: false,
      AllowSearch: true,
      formTitle: "Products",
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
          that.products = response.data.data;
          that.itemsPerPage = response.data.itemsPerPage;
          console.log(that.products);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
