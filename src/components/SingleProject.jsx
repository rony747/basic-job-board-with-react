import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Eye, MessageCircle} from "lucide-react";
import {useProjects} from "@/contexts/ProjectContext.jsx";
import {useEffect} from "react";

function SingleProject() {
    const {id} = useParams()
    const {projects, clients, isLoading, getProject} = useProjects()
    const navigate = useNavigate()
    useEffect(() => {
        const is_project_valid = projects.find(project => project.id === id)
        if (!is_project_valid) return navigate('*')
    }, [id, navigate, projects])

    if (isLoading) return;
    const currentProject = projects.find(project => {
        return project.id === id
    })

    const { project_name, project_description, tasks} = currentProject
    const projectId = currentProject.id
    return (
        <>
            <div>
                <div className="pro_single_top p-5">
                    <h3 className={'font-semibold text-gray-700 text-2xl capitalize'}>{project_name}</h3>
                    <p>{project_description}</p>
                </div>

                <div className="tasks_area grid grid-cols-3 gap-4 bg-gray-50 p-5">
                    {tasks?.length > 0 ? tasks.map(task => {
                        return (
                            <Card key={task.task_id} className={'flex justify-between flex-col'}>
                                <div className="">
                                    <CardHeader className={''}>

                                        <CardTitle className={'text-lg block'}>
                                            <div className={'mb-2'}>
                                                <Badge className={`
                                                w-auto text-center inline-block
                                                ${task.task_priority === 'High' ? 'bg-red-100 text-red-700' : ''}
                                                ${task.task_priority === 'Medium' ? 'bg-blue-100 text-blue-700' : ''}
                                                ${task.task_priority === 'Low' ? 'bg-gray-100 text-gray-700' : ''}
                                                `}>
                                                    {task.task_priority}
                                                </Badge>
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