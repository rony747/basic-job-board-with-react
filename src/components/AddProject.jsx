import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Textarea} from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useProjects} from "@/contexts/ProjectContext.jsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";

function AddProject() {
    const {clients, isLoading, dispatch} = useProjects()
    const [title,setTitle]= useState('')
    const [descrip,setDescrip]= useState('')
    const [select, setSelect] = useState('')

    if (isLoading) return

    function getClient(id) {
        return clients.find(client => client.id === id).client_name
    }
const handleFormSubmit = (e)=>{
    e.preventDefault()
    dispatch({
        type:"project/add",
        payload:{title, descrip, select}
    })

}

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="projectName" className={'mb-1'}>Project Name</Label>
                    <Input type="text" id="projectName" value={title} placeholder="Project Name" onChange={(e)=>{
                       setTitle(e.target.value)
                    }}/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="projectDesc" className={'mb-1'}>Project Description</Label>
                    <Textarea id="projectDesc" placeholder="Project Description" value={descrip} onChange={(e)=>{
                        setDescrip(e.target.value)
                    }}/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Select onValueChange={(e) => {
                        setSelect(e)
                    }}>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder={`Select Client`} />
                        </SelectTrigger>
                        <SelectContent>
                            {clients.map(client => {
                                return (
                                    <SelectItem key={client.id} value={client.id}>{client.client_name}</SelectItem>
                                )
                            })}

                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleFormSubmit} className={'bg-blue-700 text-white'} type={"submit"}>Add Project</Button>
            </form>

        </>
    );
}

export default AddProject;