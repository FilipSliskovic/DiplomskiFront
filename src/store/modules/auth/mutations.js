export default{
    setUser(state,payload) {
        state.Token = payload.Token
        state.UseCases = payload.u.UseCases
        state.UserId = payload.u.UserId
        state.Username = payload.u.Username
        state.IsSuperUser = payload.u.IsSuperUser
    },
    clearUser(state)
    {
        state.Token = null
        state.UseCases = null
        state.Userid = null
        state.Username = null
        state.IsSuperUser = false
    }
    
};