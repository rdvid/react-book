import { useState } from "react";
import { BaseValidator } from "../utils/validations";
import { DropzoneOptions, useDropzone} from 'react-dropzone';
import axios from "../utils/connection";

function Home(){

    const [form, setForm] = useState({
        email: '',
        title: '',
        author: ''
    });

    const [response, setResponse] = useState({
        status: 0,
        message: ''
    });
        
    const dropZoneOptions: DropzoneOptions = {
        maxFiles: 5,
        maxSize: 1000000,
        // TODO: implement queue and multiple files behaviour with celery 
        multiple: false,
        accept: {
        'document/*': ['.epub', '.pdf'],
        },
        validator: BaseValidator.nameLengthValidator        
    }

    const {acceptedFiles,
        getRootProps, 
        getInputProps
    } = useDropzone(dropZoneOptions);
  
    const files = acceptedFiles.map(file => (
        <tr key={file.name}>
            <th>1</th>
            <td>{file.name.split('.')[0]}</td>
            <td>{form.title}</td>
            <td>{form.author}</td>
        </tr>
    ));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // TODO: develop submit and return
        e.preventDefault();

        const { status, data } = await axios.post(
            `/send?title=${form.title}&author=${form.author}`, 
            {
                data: { 
                    file: acceptedFiles[0] 
                }
            }, 
        )

        setResponse({
            status,
            message: data.message
        });

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUpdate = e.target.name
        const value = e.target.value
        
        setForm({...form, [newUpdate]: newUpdate == 'email' ? value.trim() : value })
    }

    const clearForm = () => {
        setForm({...form,
            email: '',
            title: '',
            author: ''
        })
    }

    return(
        <div className="flex flex-col w-full items-center space-y-8">
            {
                response.message && response.status !== 201 && (
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{response.message}</span>
                    </div>)
            }
            {
                response.message && response.status === 201 && (
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{response.message}</span>
                    </div>)
            }
            <h1 className="mt-12 text-2xl font-bold p-2 max-sm:text-center">Send files straight to your kindle</h1>
            <form id="book-form" onSubmit={handleSubmit}>
                <div className="form-control flex flex-row justify-center items-start
                                max-sm:flex-col max-sm:items-center max-sm:p-2">

                    <div className="input-container m-4 w-full">
                        <span className="font-bold">Kindle Email: </span>
                        <input 
                            type="text" 
                            placeholder="example@email.org" 
                            name="email"
                            value={form.email}
                            className="input input-bordered w-full"
                            onChange={(e) => handleChange(e)} 
                        />
                        {   
                            
                            !form.email && (
                                <label className="label">
                                    <span className="label-text-alt text-red-600">email required</span>
                                </label>
                            )
                        
                        }
                        {
                            form.email && !BaseValidator.isEmail(form.email) && (
                                <label className="label">
                                    <span className="label-text-alt text-red-600">email invalid</span>
                                </label>
                            )
                        }
                    </div>

                    <div className="input-container m-4 w-full">
                        <span className="font-bold">Title: </span>
                        <input 
                            type="text" 
                            placeholder="White Nights"
                            name="title"
                            value={form.title}
                            className="input input-bordered w-full"
                            onChange={(e) => handleChange(e)} 
                        />
                        {   
                            
                            !form.title && (
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
                            name="author"
                            value={form.author}
                            className="input input-bordered w-full"
                            onChange={(e) => handleChange(e)} 
                        />
                        {   
                            
                            !form.author && (<label className="label">
                                <span className="label-text-alt text-red-600">
                                    author is required
                                </span>
                            </label>)
                        
                        }
                    </div>
                </div>
            </form>
            
            {/* <div className='flex w-full items-center mb-8 max-xl:flex-col'>
                <div className="m-4 items-center">
                    <button className="btn rounded-md"><i className="fa-solid fa-info fa-sm p-2"></i></button>
                </div>
            </div>   */}

            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                    {
                        acceptedFiles.length < 1 
                        ? <p className='px-4 py-8 border-dashed	border-2 border-black hover:cursor-pointer text-center'>Drag 'n' drop some files here, <br /> or click to select files: </p>
                        : <p className='px-4 py-8 border-dashed	border-2 border-black bg-green-400 hover:cursor-pointer text-center animate-pulse'>Ready to send files</p>
                    }
                <em>(Only Epubs and PDFs will be accepted)</em>
            </div>
            {/* <div className="divider divider-horizontal mx-16">OR</div>
            <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" /> */}
            <div className="m-4 items-center">
                <button className="btn" onClick={()=>{

                    if (document) {
                        (document.getElementById('file_table_model') as HTMLFormElement).showModal();
                    }
            
                }}><i className="fa-solid fa-rectangle-list fa-xl"></i></button>
                <dialog id="file_table_model" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">

                        <h3 className="font-bold text-lg">Files Sent: </h3>
                        
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Filename</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { 
                                    
                                    files.length > 0 ? files : <p>oh-oh no files sent yet</p>

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>    
            <div>
                <button onClick={() => clearForm()} className="btn btn-outline m-2">Clear</button>
            
                <button type="submit" form="book-form" className="btn btn-success m-2 animate-pulse">Submit</button>
            </div>
        </div>
    )

}


export default Home;