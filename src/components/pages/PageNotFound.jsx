import DefaultPage from "@/components/Layouts/DefaultPage.jsx";

function PageNotFound()
{
    return (
        <>
        <DefaultPage>
            <div className={'flex flex-col items-center'}>
                <h1 className={'text-[80px] text-center p-5 font-bold'}>4<span className={'text-blue-700'}>0</span>4</h1>
                <p>The page you looking for is not found ☹️</p>
            </div>

        </DefaultPage>
        </>
    );
}

export default  PageNotFound;