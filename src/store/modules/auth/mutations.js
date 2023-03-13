export default{
    setUser(state,payload) {
        state.Token = payload.Token
        state.UseCases = payload.u.UseCases
        state.Userid = payload.u.UserId
        state.Username = payload.u.Username
    },
    
};