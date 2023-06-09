// import axios from "axios";

// export default{
//     getData(context,payload)
//     {
//     axios
//     .get(payload.url, {headers: { Authorization: payload.token},
//         })
//       .then((response) => {
//         console.log(response.status);
//         context.commit("setData",{Data: response.data});
//       })
//       .catch((e) => {
//         console.log(payload.token);
//         console.log(e.response.data.errors);
//       });
//     }
// }