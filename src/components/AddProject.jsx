import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useProjects} from "@/contexts/ProjectContext.jsx";

function AddProject() {
    const {clients,isLoading} = useProjects()
    if(isLoading) return
    return (
        <>
            <form>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="projectName" className={'mb-1'}>Project Name</Label>
                    <Input type="text" id="projectName" placeholder="Project Name"/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="projectDesc" className={'mb-1'}>Project Description</Label>
                    <Textarea id="projectDesc" placeholder="Project Description"/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Select>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Select Client" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients.map(client=>{
                                return(
                                    <SelectItem key={client.id} value={client.id}>{client.client_name}</SelectItem>
                                )
                            })}

                        </SelectContent>
                    </Select>
                </div>
            </form>

        </>
    );
}

export default AddProject;