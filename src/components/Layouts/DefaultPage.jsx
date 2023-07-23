import NavBar from "@/components/parts/NavBar.jsx";
import SideBar from "@/components/parts/SideBar.jsx";
import SearchBar from "@/components/parts/SearchBar.jsx";

function DefaultPage({children}) {
    return (
        <>
            <div className={'main_wrap h-full py-4 '}>
                <div className={'bg-white container mx-auto p-0  min-h-[80vh] flex rounded-2xl overflow-hidden'}>
                    <NavBar/>
                    <SideBar/>
                    <div className={'basis-[75%]'}>
                        <SearchBar/>
                        <div className="content_area ">

                            {children}
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
}

export default DefaultPage;