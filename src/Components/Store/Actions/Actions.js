import {AddTask, AddAllTask, DeleteTask, UpdateTask} from './ActionTypes'

const addTaskAction = (newTask)=>({
    type: AddTask,
    payload: {
        newTask : newTask 
    }
})


const addAllTaskAction = (allTasks)=>({
    type: AddAllTask,
    payload: {
        allTasks : allTasks 
    }
})

const deleteTaskAcion = (id)=>({
    type: DeleteTask,
    payload: {
        id:id
    }
})

const updateTaskAction = (updatedTask)=>({
    type:UpdateTask,
    payload:{
        updatedTask: updatedTask
    }
})

export {addTaskAction, addAllTaskAction, deleteTaskAcion, updateTaskAction}
