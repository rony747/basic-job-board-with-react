import {NavLink} from "react-router-dom";
import {BarChart3, Home, LogOut, TableProperties, Users} from "lucide-react";

function NavBar() {
    return (
        <>
            <div className="navBar flex border-r-[1px] border-gray-200  basis-[5%] items-center flex-col px-3 py-5">
                <div className="logo flex items-center">
                    <NavLink to={'/'}>
                        <Home className={'mb-12 mx-auto'} />
                    </NavLink>
                </div>
                <nav className={' '}>

                    <NavLink to={'/'}>
                        <Users className={'text-gray-400 mb-8 mx-auto'} />
                    </NavLink>
                    <NavLink to={'/'}>
                        <TableProperties className={'text-gray-400 mb-8 mx-auto'} />
                    </NavLink>
                    <NavLink to={'/'}>
                        <BarChart3 className={'text-gray-400 mb-8 mx-auto'} />
                    </NavLink>
                    <NavLink to={'/'}>
                        <LogOut className={'text-gray-400 mt-12 mx-auto'} />
                    </NavLink>
                </nav>
            </div>

        </>
    );
}

export default NavBar;