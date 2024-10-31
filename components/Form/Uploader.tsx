'use client';

import React, { useMemo, useRef, useState } from 'react';

import { classNames, readableFileSize } from '@/utils/string';
import Icon from '@/components/Icon';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onInputFile?: (file: File | undefined) => void;
  handleUploadFile?: (file: File) => void;
}

export default function FileUploader({
  className,
  onInputFile,
  handleUploadFile,
}: Props) {
  const allowed: any = {
    file: {
      extensions: ['xls', 'xlsx'],
      size: 5000000,
    },
  };

  const [file, setFile] = useState<File | undefined>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const previewFileName = useMemo(() => {
    if (!file) return '';
    return file.name;
  }, [file]);

  const handleInputUploadFile = async (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (allowed.file.extensions.includes(fileExtension)) {
        if (file.size > allowed.file.size) {
          // Handle file size error
          onInputFile?.(undefined);
          setFile(undefined);
        } else {
          onInputFile?.(file);
          setFile(file);
          if (handleUploadFile) {
            handleUploadFile(file);
          }
        }
      } else {
        // Handle invalid file type
        if (inputFileRef && inputFileRef.current) {
          inputFileRef.current.value = '';
        }
      }
    }
  };

  const handleClearUploadFile = () => {
    onInputFile?.(undefined);
    setFile(undefined);
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        className={classNames(
          'file-uploader p-4 w-full h-full flex justify-center items-center rounded-lg border border-dashed border-[#4A4A4A] bg-[#141414]',
          className,
        )}
      >
        <input
          className={file ? 'hidden' : ''}
          type="file"
          ref={inputFileRef}
          onChange={(e) => handleInputUploadFile(e.target.files)}
        />
        <div className="input-wrapper h-[200px]">
          <>
            <Icon.Upload className="fill-gray-400" width={40} height={40} />
            <p className="text-headline-2 text-gray-500">
              Drag and Drop file here or Choose File
            </p>
          </>
        </div>
      </div>
      <div className=" px-4 py-2 justify-between items-center rounded-lg border border-[#4A4A4A] flex gap-10">
        <Icon.ExcelImg width={75} height={60} />
        <div className="gap-1 flex flex-col w-full">
          <p> {file ? previewFileName : 'File Name'}</p>
          <p className="text-[14px] text-[#929292]">
            {readableFileSize(file?.size || 0)}
          </p>
        </div>
        <Icon.Remove
          onClick={handleClearUploadFile}
          className="clear-icon"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
