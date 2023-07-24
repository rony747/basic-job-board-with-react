import {Button} from "@/components/ui/button.jsx";
import {Link, useParams} from "react-router-dom";
import {BadgeX, CheckCircle, MoreVertical, PenSquare, Plus} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useProjects} from "@/contexts/ProjectContext.jsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import './SideBar.css'
import AddProject from "@/components/AddProject.jsx";
import {useState} from "react";

function SideBar() {
    const {projects, clients,isLoading, dispatch} = useProjects()
    const {id} = useParams()
    const [showForm, setShowForm] = useState(false)

    if (isLoading) return;
    function getClientImg(id){
        let currClient = clients.find(client=>client.id === id)
        return currClient.client_logo
    }
    return (
        <>
            <div className={'basis-[20%] p-5 border-r-[1px] border-gray-200 flex justify-between flex-col'}>
                <div className="side_top">
                    <h3 className={'text-2xl font-semibold text-gray-700 mb-4'}>Projects</h3>
                    <div className="project_list">

                        {projects.map(project => {
                            return (
                                <div key={project.id}
                                     className={`project_list_item  border-[1px] border-gray-200 rounded-lg flex justify-between items-center mb-1 ${project.id === id ? 'active' : ''}`}>
                                    <Link to={`/projects/${project.id}`}
                                          className={'text-sm font-semibold pl-3 py-2 pr-1 block basis-5/6 text-gray-700 capitalize flex items-center'}>
                                        {(project.client_id && getClientImg(project.client_id)) ? <img className={'w-8 h-8 rounded-full mr-2'} src={getClientImg(project.client_id)} /> : ''}
                                        {project.project_name}
                                        </Link>
                                    <DropdownMenu className={'basis-1/6'}>
                                        <DropdownMenuTrigger className={'outline-0'}>
                                            <MoreVertical className={'text-gray-500 max-h-5'}/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>

                                            <DropdownMenuItem><CheckCircle className={'text-green-700 w-4 mr-2'}/>Mark as
                                                complete</DropdownMenuItem>
                                            <DropdownMenuItem><PenSquare className={'text-blue-700 w-4 mr-2'}/>Edit
                                                project</DropdownMenuItem>
                                            <DropdownMenuItem onClick={(e)=>{
                                                dispatch({type:'project/delete', payload:project.id})
                                            }}><BadgeX className={'text-red-700 w-4 mr-2'} />Delete
                                                Project</DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="side_bottom">
                    <Popover open={showForm} onOpenChange={(e)=>{setShowForm(e)}}>
                        <PopoverTrigger type={'outline'} className={'w-full border-dashed border-2 text-blue-700 border-blue-700 flex justify-center p-2 items-center text-sm rounded font-semibold'}>

                                <Plus className={'max-h-4'}/> Add New Project

                        </PopoverTrigger>
                        <PopoverContent>
                            <AddProject setShowForm={setShowForm} />
                        </PopoverContent>
                    </Popover>

                </div>

            </div>
        </>
    );
}

export default SideBar;