import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "@/components/pages/HomePage.jsx";
import {ProjectContxtProvider} from "@/contexts/ProjectContext.jsx";
import ProjectSingle from "@/components/pages/ProjectSingle.jsx";
import PageNotFound from "@/components/pages/PageNotFound.jsx";
import TaskSingle from "@/components/pages/TaskSingle.jsx";

function App() {


    return (
        <>
            <ProjectContxtProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/projects/:id'} element={<ProjectSingle/>}/>
                    <Route path={'/projects/:id?task/:id'} element={<TaskSingle/>}/>
                    <Route path={'*'} element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            </ProjectContxtProvider>
        </>
    )
}

export default App
