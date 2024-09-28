'use client';

import { useDropzone } from 'react-dropzone';
// import { useNextUpload } from 'next-upload/react';
import { upload } from 'next-upload/client';
import { createContext, useContext, useState } from 'react';


export const FileUploadContext = createContext({
  currentFile: "",
  setCurrentFile: (newFile: string) => {}
});

const FileUpload = () => {
  // const nup = useNextUpload();
  const [isUploading, setIsUploading] = useState(false);
  const {currentFile, setCurrentFile} = useContext(FileUploadContext);

  const onDropAccepted = async (acceptedFiles: File[]) => {
    
    setIsUploading(true);
    const res: any[] = await upload(
      acceptedFiles.map((file) => ({
        file
      })), 
      {
        api: "/upload"
      }
    );
    setIsUploading(false);
    if (res.length > 0){
      let file = res.pop();
      setCurrentFile(file.url + "/" + file.data.key);
      
    }

    // console.log(res);

  }
    
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {/* {nup.isUploading && <p>Uploading...</p>} */}
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUpload;