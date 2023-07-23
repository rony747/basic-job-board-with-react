import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function SearchBar() {
    return (
        <>
        <div className="search_area flex justify-between p-5 border-b-[1px] border-gray-200">
            <div className="search_field flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Search" className={'bg-gray-100 focus:border-0'} />
                    <Button type="submit">Search</Button>
            </div>
            <div className="user_area">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </div>
        </div>
        </>
    );
}

export default SearchBar;