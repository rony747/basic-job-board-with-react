import DefaultPage from "@/components/Layouts/DefaultPage.jsx";
import {useParams} from "react-router-dom";
import {useProjects} from "@/contexts/ProjectContext.jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Eye, MessageCircle} from "lucide-react";


function ProjectSingle() {
    const {id} = useParams()
    const {projects, clients, isLoading, getProject} = useProjects()

    if (isLoading) return;

    const currentProject = projects.filter(project => {
        return project.id === id
    })
    console.log(currentProject)
    const {project_name, project_description, client_id, created_by, created_at, tasks} = currentProject[0]
    return (
        <DefaultPage>
            {!isLoading && <div>
                <div className="pro_single_top p-5">
                    <h3 className={'font-semibold text-gray-700 text-2xl capitalize'}>{project_name}</h3>
                    <p>{project_description}</p>
                </div>

                <div className="tasks_area grid grid-cols-3 gap-4 bg-gray-50 p-5">
                    {tasks.map(task => {
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

                                            {task.task_title}</CardTitle>
                                        <CardDescription>{task.task_description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                    </CardContent>
                                </div>

                                <CardFooter className={'border-t-[1px] border-gray-100 py-3 flex justify-between flex-row bg-gray-100'}>
                                   <h5 className={'italic text-gray-400 font-semibold text-sm'}>{task.task_status}</h5>
                                    <div className={'flex justify-end'}>

                                        <span className={' mr-2 flex text-gray-400'}><Eye className={' w-5 mr-1'} />10</span>
                                        <span className={' mr-2 flex text-gray-400'}><MessageCircle className={' w-5 mr-1'} />2</span>

                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>}

        </DefaultPage>
    );
}

export default ProjectSingle;