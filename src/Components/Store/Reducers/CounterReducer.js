import {INCREMENT} from '../Actions/ActionTypes'

export default function CounterReducer(state={count:1}, action){
    switch(action.type){
        case INCREMENT:
            console.log(action);
            return {
                count:state.count+action.payload.incrementBy
            }
            break;
    }
}