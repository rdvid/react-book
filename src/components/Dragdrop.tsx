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

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone(dropZoneOptions);
  
  const files = acceptedFiles.map(file => (
    <li key={file.name}>
        {file.name.split('.')[0]} - {file.size} bytes
    </li>
      
  ));

  return (
    <section>
      <div className='flex w-full items-center mb-8'>
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className='p-4 border-dashed	border-2 border-black hover:cursor-pointer text-center'>Drag 'n' drop some files here, <br /> or click to select files: </p>
            <em>(Only Epubs and PDFs will be accepted)</em>
        </div>
        {/* <div className="divider divider-horizontal mx-16">OR</div>
        <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" /> */}
      </div>
      <aside className='my-8'>
        <h4 className='text-center font-extrabold text-xl '>Files:</h4>
        <ul className='list-disc'>{files}</ul>
      </aside>
      
    </section>
  );
}

export default Dragdrop;

