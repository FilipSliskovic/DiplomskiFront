export default{
    showAlert(context,payload)
    {
        context.commit('setShow',true);
        context.commit('setMessage',payload.Message)
        context.commit('setAlertType',payload.AlertType)
        
        setTimeout(() => {
            context.dispatch('hideAlert');
          }, "5000");

    },
    hideAlert(context)
    {
        context.commit('setShow',false)
    }

}