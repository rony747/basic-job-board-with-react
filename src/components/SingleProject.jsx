import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BadgeX, CheckCircle, Eye, MessageCircle, MoreVertical, PenSquare, Plus} from "lucide-react";
import {useProjects} from "@/contexts/ProjectContext.jsx";
import {useEffect, useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddTaskForm from "@/components/AddTaskForm.jsx";

function SingleProject() {
    const {id} = useParams()
    const {projects, isLoading, getProject, dispatch} = useProjects()
    const navigate = useNavigate()
    useEffect(() => {
        const is_project_valid = projects.find(project => project.id === id)
        if (!is_project_valid) return navigate('*')
    }, [id, navigate, projects])
    const [showDialog, setShowDialog] = useState(false);
    if (isLoading) return;
    const currentProject = getProject(id)
    if (!currentProject) return;
    const {project_name, project_description, tasks} = currentProject
    const projectId = currentProject.id

    return (
        <>
            <div>
                <div className="pro_single_top p-5 flex items-center">
                    <div className="title_area basis-3/4">
                        <h3 className={'font-semibold text-gray-700 text-2xl capitalize'}>{project_name}</h3>
                        <p>{project_description}</p>
                    </div>
                    <div className="action_area basis-1/4 items-end text-right items-center flex content-end">
                        <Dialog open={showDialog} onOpenChange={(e) => {
                            setShowDialog(e)
                        }}>
                            <DialogTrigger
                                className={'bg-blue-700 text-white rounded px-4 py-2 flex items-center justify-end'}
                            ><Plus className={'max-h-4'}/> Add new Task</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className={'mb-4 text-2xl'}>Add new task to this project</DialogTitle>
                                </DialogHeader>
                                <AddTaskForm setShowDialog={setShowDialog} dispatch={dispatch} projectId={projectId}/>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>

                <div className="tasks_area grid grid-cols-3 gap-4 bg-gray-50 p-5">
                    {tasks?.length > 0 ? tasks.map(task => {
                        return (
                            <Card key={task.task_id} className={'flex justify-between flex-col'}>
                                <div className="">
                                    <CardHeader className={''}>

                                        <CardTitle className={'text-lg block'}>
                                            <div className={'mb-2 flex justify-between'}>
                                                <Badge className={`
                                                w-auto text-center inline-block
                                                ${task.task_priority === 'High' ? 'bg-red-100 text-red-700' : ''}
                                                ${task.task_priority === 'Medium' ? 'bg-blue-100 text-blue-700' : ''}
                                                ${task.task_priority === 'Low' ? 'bg-gray-100 text-gray-700' : ''}
                                                `}>
                                                    {task.task_priority}
                                                </Badge>
                                                <DropdownMenu className={'basis-1/6'}>
                                                    <DropdownMenuTrigger className={'outline-0'}>
                                                        <MoreVertical className={'text-gray-500 max-h-5'}/>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>

                                                        <DropdownMenuItem><CheckCircle
                                                            className={'text-green-700 w-4 mr-2'}/>Mark as
                                                            complete</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={()=>dispatch({type:'task/delete', payload:{
                                                                projectId, taskId : task.task_id
                                                            }})}><BadgeX className={'text-red-700 w-4 mr-2'} />Delete
                                                            Task</DropdownMenuItem>

                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <Link to={`/projects/${projectId}?task=${task.task_id}`}>
                                                {task.task_title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription>{task.task_description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                    </CardContent>
                                </div>

                                <CardFooter
                                    className={'border-t-[1px] border-gray-100 py-3 flex justify-between flex-row bg-gray-100'}>
                                    <h5 className={'italic text-gray-400 font-semibold text-sm'}>{task.task_status}</h5>
                                    <div className={'flex justify-end'}>

                                        <span className={' mr-2 flex text-gray-400'}><Eye className={' w-5 mr-1'}/>10</span>
                                        <span className={' mr-2 flex text-gray-400'}><MessageCircle className={' w-5 mr-1'}/>2</span>

                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    }) : 'No Task Found'}
                </div>
            </div>
        </>
    );
}

export default SingleProject;