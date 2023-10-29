import { FormEvent, useState } from "react";
import Dragdrop from "../components/Dragdrop";
import { BaseValidation } from "../utils/validations";

function Home(){

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError]  = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('test')
    }

    return(
        <div className="flex flex-col w-full items-center space-y-8">
            <h1 className="mt-12 text-2xl font-bold p-2 max-sm:text-center">Send files right for your kindle</h1>
            <form id="book-form" onSubmit={handleSubmit}>
                <div className="form-control flex flex-row justify-center items-start
                                max-sm:flex-col max-sm:items-center max-sm:p-2">

                    <div className="input-container m-4 w-full">
                        <span className="font-bold">Kindle Email: </span>
                        <input type="text" 
                            placeholder="example@email.org" 
                            className="input input-bordered w-full"
                            onChange={(event) => setEmail(event?.target.value)} 
                        />
                        {   
                            
                            !BaseValidation.hasValue(email) && (
                                <label className="label">
                                    <span className="label-text-alt text-red-600">email required</span>
                                </label>
                            )
                        
                        }
                    </div>

                    <div className="input-container m-4 w-full pb-8">
                        <span className="font-bold">Title: </span>
                        <input type="text" 
                            placeholder="White Nights" 
                            className="input input-bordered w-full"
                            onChange={(event) => setTitle(event?.target.value)} 
                        />
                        {   
                            
                            !BaseValidation.hasValue(title) && (
                                <label className="label">
                                    <span className="label-text-alt text-red-600">
                                        title is required
                                    </span>
                                </label>
                            )
                        
                        }
                    </div>

                    <div className="input-container m-4 w-full">
                        <span className="font-bold">Author: </span>
                        <input type="text" 
                            placeholder="Fiodór Doistoiévski" 
                            className="input input-bordered w-full"
                            onChange={(event) => setAuthor(event?.target.value)} 
                        />
                        {   
                            
                            !BaseValidation.hasValue(author) && (<label className="label">
                                <span className="label-text-alt text-red-600">
                                    author is required
                                </span>
                            </label>)
                        
                        }
                    </div>
                </div>
            </form>
            <div>
                <Dragdrop />
            </div>
            <div>
                <button type="submit" form="book-form" className="btn btn-outline btn-disabled">Button</button>
            </div>
        </div>
    )

}


export default Home;