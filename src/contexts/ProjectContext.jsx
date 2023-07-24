import {createContext, useContext, useEffect, useReducer} from "react";

const ProjectContext = createContext()

const initialState = JSON.parse(localStorage.getItem("allProjects")) || {
    projects: [],
    clients: [],
    status: '',
    currentProject: '',
    isLoading: true
}

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {...state, isLoading: true}
        case "loaded":
            return {...state, projects: action.payload.projects, clients: action.payload.clients, isLoading: false}
        case "project/add": {
            return {
                ...state,
                projects: [...state.projects, {
                    id: crypto.randomUUID(),
                    project_name: action.payload.title,
                    project_description: action.payload.descrip,
                    tasks: [],
                    client_id: Number(action.payload.client_id)
                }]
            }
        }
        case "project/delete": {
            return {...state, projects: state.projects.filter(project => project.id !== action.payload)}
        }

        case "task/add": {
            const newData = state.projects.map(project => {
                if (project.id === action.payload.projectId) {
                    return {
                        ...project, tasks: [...project.tasks,
                            {
                                task_id: crypto.randomUUID(),
                                task_title: action.payload.taskTitle,
                                task_description: action.payload.taskDescription,
                                task_status: action.payload.taskStatus,
                                task_priority: action.payload.taskPriority,
                                task_notes: action.payload.taskNotes,
                            }
                        ]
                    }
                }
                return project
            })
            return {...state, projects: newData}
        }
        case "task/delete": {
            const deletedTasks = state.projects.map(project => {
                if (project.id === action.payload.projectId) {
                    return {
                        ...project, tasks: project.tasks.filter(task=>task.task_id!==action.payload.taskId)
                    }
                }
                return project
            })
            return {...state, projects: deletedTasks}
        }
        default:
            return state
    }

}

function ProjectContxtProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {projects, clients, status, currentProject, isLoading} = state
    useEffect(() => {
        async function fetchProjects() {
            dispatch({type: 'loading'})
            try {

                const res = await fetch('http://localhost:9000/allProjects')
                const data = await res.json()
                dispatch({type: 'loaded', payload: JSON.parse(localStorage.getItem("allProjects")) || data})
            } catch {
                dispatch({
                    type: 'rejected',
                    payload: "There is an error loading Projects"
                })
            }
        }

        fetchProjects()
    }, [])

    useEffect(() => {
        // storing input name
        localStorage.setItem("allProjects", JSON.stringify(state));
    }, [state]);

    const getProject = (id) => {
        const currentProject = state.projects.find(project => {
            return project.id === id
        });
        return currentProject
    }

    const currentTask = (pID, tID) => {
        const current_project = state.projects.find(project => {
            return project.id === pID
        });
        const current_task = current_project.tasks.find(task => {
            return task.task_id === tID
        })
        return current_task
    }

    return (
        <ProjectContext.Provider
            value={{projects, clients, status, currentProject, isLoading, getProject, dispatch, currentTask}}>
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