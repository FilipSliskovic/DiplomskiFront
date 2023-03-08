<template>

    <v-form>
    <v-container>
     
        <v-col
        offset="3"
          cols="5"
        >
          <v-text-field
            v-model="formObj.username"
            label="Email"
            filled
          ></v-text-field>
        </v-col>

        <v-col
        offset="3"
          cols="5"
        >
          <v-text-field
            v-model="formObj.Password"
            label="Password"
            filled
            type="password"
          ></v-text-field>


          <v-btn @click="logovanje()" color="primary">
      Primary
    </v-btn>
        </v-col>
    </v-container>
  </v-form>

</template>

<script>

import axios from "axios"
import auth from '@/auth'


export default {
    name:"login-1",

    data:()=>({
        formObj:{
            username:"Filip@mail.com",
            Password:"Lozinka123$"
        }
    }),

    methods:{
        logovanje(){
            axios.post("http://localhost:5000/api/token",this.formObj).then((response)=>{
                console.log(response.data.token)
                localStorage.setItem("token", response.data.token)
                
                var user = auth.parseJWT(response.data.token)
                console.log(user)
                
                this.$emit("Ulogovan",user)
            })
        }
    }
    
}
</script>