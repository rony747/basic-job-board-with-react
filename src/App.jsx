import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "@/components/pages/HomePage.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ProjectContxtProvider} from "@/contexts/ProjectContext.jsx";
import ProjectSingle from "@/components/pages/ProjectSingle.jsx";

function App() {


    return (
        <>
            <ProjectContxtProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/projects/:id'} element={<ProjectSingle/>}/>
                </Routes>
            </BrowserRouter>
            </ProjectContxtProvider>
        </>
    )
}

export default App
