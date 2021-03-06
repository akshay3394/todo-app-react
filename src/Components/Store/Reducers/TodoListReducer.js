import { AssignmentReturnTwoTone } from '@material-ui/icons';
import {AddTask, AddAllTask, DeleteTask, UpdateTask} from '../Actions/ActionTypes'

const intialState = {
    taskList: []
}

export default function TodoListReducer(state=intialState, action){
    const payload = action.payload;
    switch(action.type){
        case AddAllTask:
            console.log("Add all task called");
            const newState = {
                taskList: [...payload.allTasks]
            }
            return newState
        case AddTask:
            console.log("Add task called");
            return {
                ...state,
                taskList: [...state.taskList,
                    payload.newTask
                    ]
            }
        case DeleteTask:
            console.log("Delete task called");
            const id = payload.id
            return {
                ...state,
                taskList: state.taskList.filter(task=>task.id!=id)
            }
        case UpdateTask:
            console.log("Update task called");
            
            const updatedTask = payload.updatedTask

            return {
                ...state,
                taskList: [
                    ...state.taskList.filter(task=>task.id!=updatedTask.id),
                    updatedTask
                ]
            }
        default:
            return state;
    }
}