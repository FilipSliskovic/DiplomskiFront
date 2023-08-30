import {createStore} from 'vuex';

import authModule from './modules/auth/index.js';

import loader from './modules/loader/index.js';

import globalAlert from './modules/globalAlert/index.js';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
    modules: {
        auth: authModule,
        loader : loader,
        globalAlert
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