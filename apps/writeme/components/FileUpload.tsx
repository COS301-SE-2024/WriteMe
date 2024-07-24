'use client';

import { useDropzone } from 'react-dropzone';
import { useNextUpload } from 'next-upload/react';

const FileUpload = () => {
  const nup = useNextUpload();

  const onDropAccepted = (acceptedFiles: File[]) =>
    nup.upload(
      acceptedFiles.map((file) => ({
        file,
      }))
    );

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
      {nup.isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUpload;