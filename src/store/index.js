import {createStore} from 'vuex';

import authModule from './modules/auth/index.js';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
    modules: {
        auth: authModule
    },
    // state(){
    //     return{
    //         Data:null
    //     }
    // },
    mutations,
    getters,
    actions
})

export default store;