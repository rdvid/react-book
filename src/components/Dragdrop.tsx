import { DropzoneOptions, useDropzone} from 'react-dropzone';

function nameLengthValidator(file: File) {
  if (file.name.length > 150) {
    return {
      code: "file-name-too-large",
      message: `Name is larger than 150 characters`
    };
  }
  return null
}

const dropZoneOptions: DropzoneOptions = {
  maxFiles: 5,
  maxSize: 1000000,
  accept: {
    'document/*': ['.epub', '.pdf'],
  },
  validator: nameLengthValidator
}

function Dragdrop() {
  // TODO: make post-mail logic for list books sent (with pagination)
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone(dropZoneOptions);
  
  const files = acceptedFiles.map(file => (
    
      <tr key={file.name}>
        <th>1</th>
        <td>{file.name.split('.')[0]}</td>
        <td>{file.filename}</td>
        <td>Blue</td>
      </tr>
    
  ));

  return (
      <div className='flex w-full items-center mb-8 max-xl:flex-col'>
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className='px-4 py-8 border-dashed	border-2 border-black hover:cursor-pointer text-center'>Drag 'n' drop some files here, <br /> or click to select files: </p>
            <em>(Only Epubs and PDFs will be accepted)</em>
        </div>
        {/* <div className="divider divider-horizontal mx-16">OR</div>
        <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" /> */}

        <div className="m-4">
          <button className="btn" onClick={()=>document.getElementById('file_table').showModal()}>See files</button>
          
          <dialog id="file_table" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">

              <h3 className="font-bold text-lg">Files Sent: </h3>
              
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
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

      </div>  
  );
}

export default Dragdrop;

