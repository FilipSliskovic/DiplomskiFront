import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
    state() {
        return{
            UseCases: null,
            UserId: null,
            Username: null,
            Token: null
        };
    },
    actions,
    mutations,
    getters,
};