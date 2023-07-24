import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";

function AddTaskForm({setShowDialog,dispatch,projectId}) {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskNotes, setTaskNotes] = useState('');

    const handleTaskadd = (e) => {
        e.preventDefault()

        dispatch({
            type:'task/add',
            payload:{projectId,taskTitle,taskDescription,taskStatus,taskPriority,taskNotes}
        })
        setShowDialog(false)
    }
    return (
        <>
            <form onSubmit={handleTaskadd}>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Input type="text" id="taskTitle" placeholder="Task Title" value={taskTitle} onChange={(e)=>{
                        setTaskTitle(e.target.value)
                    }}/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Textarea id="taskDesc" placeholder="Task Description" value={taskDescription} onChange={(e)=>{
                        setTaskDescription(e.target.value)
                    }}/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Select value={taskStatus} onValueChange={(e)=>{
                        setTaskStatus(e)
                    }}>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder={`Task Status`}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'To Do'}>To Do</SelectItem>
                            <SelectItem value={'In Progress'}>In Progress</SelectItem>
                            <SelectItem value={'Need Review'}>Need Review</SelectItem>
                            <SelectItem value={'Done'}>Done</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Select value={taskPriority} onValueChange={(e)=>{
                        setTaskPriority(e)
                    }}>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder={`Task Priority`}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'Low'}>Low</SelectItem>
                            <SelectItem value={'Medium'}>Medium</SelectItem>
                            <SelectItem value={'High'}>High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Textarea id="taskNotes" placeholder="Task Notes" value={taskNotes} onChange={(e)=>{
                        setTaskNotes(e.target.value)
                    }}/>
                </div>
                <Button className={'bg-blue-700 text-white'} type={"submit"} onClick={handleTaskadd}>Add Task</Button>
            </form>
        </>
    );
}

export default AddTaskForm;