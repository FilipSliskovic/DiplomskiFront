export default{
    setUser(state,payload) {
        state.Token = payload.Token
        state.UseCases = payload.u.UseCases
        state.Userid = payload.u.UserId
        state.Username = payload.u.Username
    },
    clearUser(state)
    {
        state.Token = null
        state.UseCases = null
        state.Userid = null
        state.Username = null

    }
    
};