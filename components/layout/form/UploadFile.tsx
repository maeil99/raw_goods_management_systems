/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
// TODO need to revamp
import React, { useCallback, useContext, useMemo, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { ErrorMessage } from 'formik';

// assets
import images from '../../../assets';
import { IFormikProps } from '../../../types/form.interface';
// import StorageClient from '../../../shared/utils/StorageClient';
import TextError from './TextError';
import { GoodsContext } from '../../../context/GoodsContext';

interface IUploadFileProps extends IFormikProps {
  maxSize?: number;
  setFieldValue?: any;
}
const maxSizeFile = 10 * 1024 * 1024;
const UploadFile = ({
  label,
  name,
  maxSize = maxSizeFile,
  setFieldValue,
}: IUploadFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { uploadToIPFS } = useContext(GoodsContext);

  // drop function
  const onDropFunction = useCallback(async (acceptedFile: any) => {
    setFile(acceptedFile[0]);
    setIsVisible(true);
  }, []);
  const {
    fileRejections,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop: onDropFunction,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
      'image/svg+xml': ['.svg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize, // maximum file size
    maxFiles: 1, // maximum file for uplaod
  });

  // setup styles for each theme
  const fileStyles = useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
  
  ${isDragActive && 'border-file-action'}
  ${isDragAccept && 'border-file-accept'}
  ${isDragReject && 'border-file-reject'}
  
  
  
  `,
    [isDragAccept, isDragActive, isDragReject],
  );

  const uploadImage = async () => {
    if (file === null || uploadToIPFS === undefined) return;
    const url = await uploadToIPFS(file);
    // console.log({ url });
    setFieldValue('productPicLink', url);
  };

  return (
    <div className="mt-16">
      <label
        htmlFor={name}
        className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl"
      >
        {label}
      </label>
      <div className="mt-4">
        <div {...getRootProps()} className={fileStyles}>
          <input {...getInputProps()} name={name} />
          {isDragAccept && <p>The file will be accepted</p>}
          {isDragReject && <p>The file will be rejected</p>}
          {!isDragActive && file === null && <p>Drop some files here...</p>}
          {!isDragActive && file !== null && (
            <p>You can also click here to change image...</p>
          )}
          <div className="flexCenter flex-col text-center">
            {file !== null ? (
              <div>
                <div className="py-3">
                  {acceptedFiles.map((picture) => (
                    <li key={picture.name} className="list-none">
                      <img
                        src={URL.createObjectURL(picture)}
                        alt="asset_file"
                      />
                    </li>
                  ))}
                </div>
                <div className="py-3">
                  {fileRejections.map((picture) => (
                    <li key={picture.file.name}>
                      The following file is not accepted:
                      {picture.file.name} - {picture.file.size} bytes
                      <ul>
                        {picture.errors.map((e) => (
                          <li key={e.code}>{e.message}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, GIF, SVG, WEBM Max {maxSize / 1024 / 1024}mb.
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className="filter invert dark:filter-none dark:invert-0 "
                  />
                </div>

                <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>

                <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  or Browse media on your device
                </p>
              </>
            )}
          </div>
        </div>
        <ErrorMessage name={name} component={TextError} />
        {isVisible && (
          <div className="flexCenter space-x-4 text-center py-5">
            <button
              disabled={isUpload}
              type="button"
              className={`${
                isUpload ? 'bg-nft-gray-2' : 'nft-green'
              } border rounded-lg text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white`}
              onClick={() => {
                setFile(null);
                setIsVisible(false);
                open();
              }}
            >
              Change Image
            </button>
            <button
              type="button"
              className={`${
                isUpload ? 'bg-nft-gray-2' : 'nft-cyan'
              } border rounded-lg  text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white`}
              onClick={() => {
                setIsUpload(true);
                uploadImage()
                  .then(() => setIsUpload(false))
                  .catch((e) => console.log(e))
                  .finally(() => setIsVisible(false));
              }}
              disabled={isUpload}
            >
              {isUpload ? 'Uploading Image' : 'Use This Image'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
