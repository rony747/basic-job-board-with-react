import DefaultPage from "@/components/Layouts/DefaultPage.jsx";
import { useSearchParams} from "react-router-dom";
import {useProjects} from "@/contexts/ProjectContext.jsx";
import Loading from "@/components/Loading.jsx";
import SingleProject from "@/components/SingleProject.jsx";
import TaskSingle from "@/components/pages/TaskSingle.jsx";



function ProjectSingle() {

    const {isLoading} = useProjects()

    const [searchParams]= useSearchParams()
    const hasTask = searchParams.get('task')
    if (isLoading) return;
    return (
        <DefaultPage>
            {isLoading && <Loading/>}
            {!isLoading && !hasTask && <SingleProject />}
            {!isLoading && hasTask && <TaskSingle taskId={searchParams.get('task')} />}

        </DefaultPage>
    );
}

export default ProjectSingle;