<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="dataItems"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-col cols="1">
          <v-row>
            <v-toolbar-title>{{ setupProps.formTitle }}</v-toolbar-title>
          </v-row>
        </v-col>

        <v-divider
          class="mx-4"
          inset
          vertical
          v-if="setupProps.AllowSearch || setupProps.AllowDateSearch"
        ></v-divider>
        <!-- <v-spacer></v-spacer> -->
        <v-col>
          <v-row align="center">
            <v-text-field
              v-if="setupProps.AllowSearch"
              v-model="this.keyword"
              clearable
              density="comfortable"
              placeholder="Enter a keyword"
              variant="outlined"
              label="Search..."
              hide-details
            ></v-text-field>
            <v-label v-if="setupProps.AllowDateSearch" class="ml-5"
              >Date from:</v-label
            >
            <input
              type="date"
              v-model="this.DateFrom"
              v-if="setupProps.AllowDateSearch"
            />
            <v-label class="ml-5" v-if="setupProps.AllowDateSearch"
              >Date to:</v-label
            >
            <input
              type="date"
              v-if="setupProps.AllowDateSearch"
              v-model="this.DateTo"
              class="ml-5"
            />

            <v-btn
              v-if="setupProps.AllowSearch || setupProps.AllowDateSearch"
              variant="outlined"
              @click="this.searchWithKeyword()"
              class="ml-5"
            >
              Search
            </v-btn>
          </v-row>
        </v-col>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-col cols="1">
              <v-row>
                <v-btn color="primary" dark v-bind="props"> New Item </v-btn>
              </v-row>
            </v-col>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ setupProps.formTitle }}</span>
            </v-card-title>

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
            <v-card-text>
              <v-container>
                <v-row>
                  <slot name="newItemSlot">
                    <h2>Error: Can't create a new item</h2>
                  </slot>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <!-- <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn> -->
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="$emit('CreateNewItem')"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogUpdate" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ setupProps.formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <slot name="UpdateItemSlot" :ItemToUpdate="ItemToUpdate">
                    <h2>Error: Can't update that item</h2>
                  </slot>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <!-- <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn> -->
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="$emit('UpdateItem')"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.Actions`]="{ item }">
      <v-icon
        v-if="this.setupProps.AllowUpdate"
        size="small"
        class="me-2"
        @click="
          editItem(item.raw);
          ItemToUpdate = item.raw;
        "
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="this.setupProps.AllowDelete"
        size="small"
        @click="deleteItem(item.raw)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-col>
        <v-row>
          <v-alert>
            <v-alert-title
              >No data for search: '{{ this.keyword }}'</v-alert-title
            >
          </v-alert>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </v-row>
      </v-col>
    </template>
  </v-data-table>
</template>

<script>
import axios from "@/axios";
import moment from "moment";
export default {
  props: {
    ParItemsPerPage: null,
    setupProps: null,
    parentData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogUpdate: false,
      editedIndex: -1,
      editedItem: Object.assign(this.parentData[0]),
      defaultItem: Object.assign(this.parentData[0]),
      dataItems: this.parentData,
      ItemToUpdate: null,
      DateFrom: moment().startOf("month").format("YYYY-MM-DD"),
      DateTo: moment().endOf("month").format("YYYY-MM-DD"),
      itemsPerPage: this.ParItemsPerPage,
      keys: Object.keys(this.parentData),
      keyword: "",
      // headers: [
      //   {
      //     title: 'ID',
      //     align:'start',
      //     key: 'id'
      //   } ,
      //   {
      //     title: 'Name',
      //     align: 'end',
      //     key: 'name',
      //   },
      //   { title: 'Amount', align: 'end', key: 'amount', sortable:true },
      //   { title: 'Category', align: 'end', key: 'categoryName' },
      //   { title: 'Description', align: 'end', key: 'description' },
      //   { title: 'Price', align: 'end', key: 'price' },
      //   { title: 'Image names', align: 'end', key: 'imageNames' },
      // ],

      headers: this.getHeaders(this.parentData),
    };
  },
  methods: {
    initialize() {
      this.keyword = new String();
      this.DateTo = moment().endOf("month").format("YYYY-MM-DD");
      this.DateFrom = moment().startOf("month").format("YYYY-MM-DD");
      this.searchWithKeyword();
    },
    searchWithKeyword() {
      axios
        .get(
          this.setupProps.Url +
            "?datefrom=" +
            this.DateFrom +
            "&dateto=" +
            this.DateTo +
            "&keyword=" +
            this.keyword,
          {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          }
        )
        .then((response) => {
          if (this.setupProps.Url === "http://localhost:5000/api/usecaselogs") {
            this.dataItems = response.data;
          } else {
            this.dataItems = response.data.data;
          }

          this.itemsPerPage = response.data.itemsPerPage;
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getHeaders(parentData) {
      var header = [];
      // header.push({title: "asd", align: 'end', key: "qwe", sortable:true});

      var prvi = parentData[0];
      // console.log(d);
      for (let h in prvi) {
        // console.log(h);
        header.push({
          title: h.toUpperCase(),
          align: "start",
          key: h,
          sortable: true,
        });
      }
      if (this.setupProps.AllowDelete || this.setupProps.AllowUpdate) {
        header.push({
          title: "Actions",
          align: "end",
          key: "Actions",
          sortable: false,
        });
      }

      return header;
    },

    editItem(item) {
      this.editedIndex = this.parentData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogUpdate = true;
      this.$emit("GetUpdateItem", item);
    },

    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.parentData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(this.setupProps.Url + "/" + this.editedItem.id, {
          headers: { Authorization: "Bearer " + this.$store.getters.Token },
        })
        .then((response) => {
          console.log(response);
          this.dataItems.splice(this.editedIndex, 1);
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

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      //update
      if (this.editedIndex > -1) {
        axios
          .put(
            this.setupProps.Url + "/" + this.editedItem.id,
            this.editedItem,
            {
              headers: { Authorization: "Bearer " + this.$store.getters.Token },
            }
          )
          .then((response) => {
            console.log(response);
            Object.assign(this.dataItems[this.editedIndex], this.editedItem);
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
      }
      //post
      else {
        axios
          .post(this.setupProps.Url, this.editedItem, {
            headers: { Authorization: "Bearer " + this.$store.getters.Token },
          })
          .then((response) => {
            console.log(response);
            this.dataItems.push(this.editedItem);
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
      }

      console.log(this.editedItem);

      this.close();
    },
  },

  mounted() {
    // this.getHeaders(this.parentData);
  },
  // setup(props){

  //   // console.log(props);

  // }
};
</script>
