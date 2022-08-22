/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
// TODO need to revamp
import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useDropzone } from 'react-dropzone';

// assets
import images from '../../../assets';
import { IFormikProps } from '../../../types/form.interface';

interface IUploadFileProps extends IFormikProps {
  accept: 'image/*' | 'application/*' | 'video/*';
  maxSize?: number;
  setFieldValue: any;
}

const UploadFile = (props: IUploadFileProps) => {
  const { accept, maxSize, name, label, setFieldValue } = props;
  const [file, setFile] = useState<File | null>(null);
  const { theme } = useTheme();

  // drop function
  const onDropFunction = useCallback(async (acceptedFile: any) => {
    setFieldValue('productPic', acceptedFile[0]);
    setFile(acceptedFile[0]);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDropFunction,
    accept,
    maxSize,
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
          <input {...getInputProps()} />
          <div className="flexCenter flex-col text-center">
            <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
              JPG, GIF, SVG, WEBM Max 100mb.
            </p>
            <div className="my-12 w-full flex justify-center">
              <Image
                src={images.upload}
                width={100}
                height={100}
                objectFit="contain"
                alt="file upload"
                className={theme === 'light' ? 'filter invert' : ''}
              />
            </div>

            <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
              Drag and Drop File
            </p>

            <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
              or Browse media on your device
            </p>
          </div>
        </div>
        {file && (
          <aside>
            <div className="py-3">
              <img src={URL.createObjectURL(file)} alt="asset_file" />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
