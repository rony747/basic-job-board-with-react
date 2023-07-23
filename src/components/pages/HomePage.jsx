import DefaultPage from "@/components/Layouts/DefaultPage.jsx";
import {useProjects} from "@/contexts/ProjectContext.jsx";

function HomePage() {
    const data = useProjects()
    return (
        <>
            <DefaultPage>
                <div className={'p-5'}>
                    <h1>Hi</h1>
                </div>
            </DefaultPage>
        </>
    );
}

export default HomePage;