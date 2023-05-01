import { createStore } from "vuex";
const store = createStore({
    state: {
        userInfo: {}
    },
    actions:{

    },
    mutations:{
        SET_USERINFO(state, newData){
            state.userInfo = newData
        }
    },
    getters:{
        
    }
})

export default store