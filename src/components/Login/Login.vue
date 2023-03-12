<template>
  <v-form>
    <v-container>

      <v-col offset="3" cols="5">
        <v-text-field
          v-model="formObj.username"
          label="Email"
          filled
        ></v-text-field>
      </v-col>

      <v-col offset="3" cols="5">
        <v-text-field
          v-model="formObj.username"
          label="Email"
          filled
        ></v-text-field>
      </v-col>



      <v-col offset="3" cols="5">
        <v-text-field
          v-model="formObj.username"
          label="Email"
          filled
        ></v-text-field>
      </v-col>

      <v-col offset="3" cols="5">
        <v-text-field
          v-model="formObj.Password"
          label="Password"
          filled
          type="password"
        ></v-text-field>

        <v-btn @click="logovanje" color="primary">
          {{ submitButtonCaption }}
        </v-btn>
        <v-btn @click="switchMode">{{ switchModeButtonCaption }}</v-btn>
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import auth from "@/auth";

export default {
  name: "login-1",

  data: () => ({
    formObj: {
      username: "Filip@mail.com",
      Password: "Lozinka123$",
    },
    mode: "login",
  }),

  computed: {
    submitButtonCaption() {
      if (this.mode == "login") {
        return "login";
      } else {
        return "Sign Up";
      }
    },
    switchModeButtonCaption() {
      if (this.mode == "login") {
        return "Sign Up instead";
      } else {
        return "Login instead";
      }
    },
  },

  methods: {
    logovanje() {
      axios
        .post("http://localhost:5000/api/token", this.formObj)
        .then((response) => {
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token);

          var user = auth.parseJWT(response.data.token);
          console.log(user);

          this.$emit("Ulogovan", user);
        });
    },
    switchMode() {
      if (this.mode == "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>
