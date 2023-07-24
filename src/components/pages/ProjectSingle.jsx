import DefaultPage from "@/components/Layouts/DefaultPage.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useProjects} from "@/contexts/ProjectContext.jsx";
import Loading from "@/components/Loading.jsx";
import SingleProject from "@/components/SingleProject.jsx";
import TaskSingle from "@/components/pages/TaskSingle.jsx";



function ProjectSingle() {

    const {isLoading} = useProjects()

    const [searchParams]= useSearchParams()
    const hasTask = searchParams.get('task')
    const projectID = useParams().id
    if (isLoading) return;
    return (
        <DefaultPage>
            {isLoading && <Loading/>}
            {!isLoading && !hasTask && <SingleProject />}
            {!isLoading && hasTask && <TaskSingle taskId={searchParams.get('task')} projectID = {projectID} />}

        </DefaultPage>
    );
}

export default ProjectSingle;