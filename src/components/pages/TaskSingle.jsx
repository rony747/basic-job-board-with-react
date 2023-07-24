import {useProjects} from "@/contexts/ProjectContext.jsx";
import {Badge} from "@/components/ui/badge.jsx";

function TaskSingle({taskId, projectID}) {
    const {currentTask} = useProjects()
    const task = currentTask(projectID, taskId)
    if (!task) return;
    return (
        <>
            <div className="p-5">

                <h1 className={'font-semibold text-xl mb-2'}>{task.task_title}</h1>
                <p className={'mb-3'}>{task.task_description}</p>
                <div className="flex justify-between">
                    <div>Status: {task.task_status}</div>
                    <div>Priority: <span className={`${task.task_priority === 'High' ? 'text-red-700' : ''} ${task.task_priority === 'Medium' ? 'text-blue-700' : ''} ${task.task_priority === 'Low' ? 'text-gray-700' : ''}`}>{task.task_priority}</span></div>                </div>
                <div className={'border-[1px] border-gray-100 p-5 mt-5 bg-gray-50'}>
                    <h4 className={'font-semibold text-blue-700'}>Notes:</h4>
                    <p>{task.task_notes}</p>
                </div>
            </div>
        </>
    );
}

export default TaskSingle;