import Dragdrop from "../components/Dragdrop";

function Home(){

    return(
        <div className="flex flex-col w-full items-center space-y-8">
            <h1 className="mt-12 text-2xl font-bold">Send files right for your kindle</h1>
            <div className="form-control flex flex-row justify-center items-center max-sm:flex-col">
                <label className="input-group m-2">
                    <span className="font-bold">Email</span>
                    <input type="text" placeholder="info@site.com" className="input input-bordered w-full" />
                </label>
                <label className="input-group m-2">
                    <span className="font-bold">Title: </span>
                    <input type="text" placeholder="i.e: White Nights" className="input input-bordered w-full" />
                </label>
                <label className="input-group m-2">
                    <span className="font-bold">Author: </span>
                    <input type="text" placeholder="Fiodor Dostoiévski" className="input input-bordered w-full" />
                </label>
            </div>
            <div>
                <Dragdrop />
            </div>
            <div>
                <button className="btn btn-outline btn-disabled">Button</button>
            </div>
        </div>
    
    )

}


export default Home;