import {createContext, useContext, useEffect, useReducer} from "react";

const ProjectContext = createContext()

const initialState = {
    projects: [],
    clients: [],
    status: '',
    currentProject: '',
    isLoading:true
}

function reducer(state, action) {
    switch (action.type){
        case "loading":
            return {...state, isLoading: true}
        case "loaded":
            return {...state, projects: action.payload.projects, clients: action.payload.clients,isLoading: false}
        case "project/add":
            return {...state, projects: [...state.projects,{id:crypto.randomUUID(), project_name:action.payload.title, project_description:action.payload.descrip, tasks:[], client_id:Number(action.payload.select)}]}

        default:
            return state
    }

}

function ProjectContxtProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
const {projects,clients,status,currentProject,isLoading}=state
    useEffect(() => {
        async function fetchProjects() {
            dispatch({type: 'loading'})
            try {

                const res = await fetch('http://localhost:9000/allProjects')
                const data = await res.json()
                dispatch({type: 'loaded', payload: data})
            } catch {
                dispatch({
                    type: 'rejected',
                    payload: "There is an error loading Projects"
                })
            }
        }

        fetchProjects()
    }, [])
    const getProject =  (id)=>{
        const currentProject = state.projects.filter(project => {
            return project.id === id
        });
        return currentProject
    }
    return (
        <ProjectContext.Provider value={{projects,clients,status,currentProject,isLoading, getProject,dispatch}}>
            {children}
        </ProjectContext.Provider>
    )
}

const useProjects = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) throw new Error('Provider called outside of context')
    return context
}
export {useProjects, ProjectContxtProvider}