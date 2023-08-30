export default{
    showLoader({commit}){
        commit('setShowLoader',true)
    },
    hideLoader({commit}){
        commit('setShowLoader',false)
    }
}