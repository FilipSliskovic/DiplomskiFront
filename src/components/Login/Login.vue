<template>
  <v-form>
    <v-container>
      <v-col offset="3" cols="5">
        <v-text-field v-model="formObj.name" label="Name" filled></v-text-field>
      </v-col>

      <v-col offset="3" cols="5">
        <v-text-field
          v-model="formObj.lastname"
          label="Lastname"
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

        <!-- <v-btn  @click=" this.mode=='login'? this.$store.dispatch('login') : signup(null,formObj)" color="primary"> -->
        <v-btn @click="submitForm">
          {{ submitButtonCaption }}
        </v-btn>
        <v-btn @click="switchMode">{{ switchModeButtonCaption }}</v-btn>
        
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
// import axios from "axios";
// import auth from "@/auth";
// import actions from "@/store/modules/auth/actions";

export default {
  name: "login-1",

  data: () => ({
    formObj: {
      name: "Filip",
      lastname: "Sliskovic",
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
    
    

    submitForm() {
      try{
        if (this.mode == "login") {
        this.$store.dispatch("login", this.formObj);
        this.$router.replace("/");
      } else {
        this.$store.dispatch("signup", this.formObj);
      }
      }
      catch(err){
        alert(err.message)
      }
     
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
