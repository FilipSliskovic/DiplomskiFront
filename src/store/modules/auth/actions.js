import axios from "axios";

export default {
  login(context, payload) {
    axios.post("http://localhost:5000/api/token", payload).then((response) => {
      var base64Url = response.data.token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const u = JSON.parse(jsonPayload);

      console.log(u);
      context.commit("setUser", { Token: response.data.token, u: u });
      //   localStorage.setItem("token", response.data.token);

      //   var user = auth.parseJWT(response.data.token);
      //   console.log(user);

      //   this.$emit("Ulogovan", user);
    });
  },
  signup(context, payload) {
    axios
      .post("http://localhost:5000/api/Register", payload)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e.response.data.errors);
      });
  },
  logout(context) {
    context.commit('clearUser');
  },
};
