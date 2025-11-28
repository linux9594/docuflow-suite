import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes: string;
  multiple?: boolean;
  maxFiles?: number;
}

const FileUpload = ({ onFileSelect, acceptedFileTypes, multiple = false, maxFiles = 1 }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      if (multiple) {
        acceptedFiles.forEach(file => onFileSelect(file));
      } else {
        onFileSelect(acceptedFiles[0]);
      }
    }
  }, [onFileSelect, multiple]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.split(',').reduce((acc, type) => {
      acc[type.trim()] = [];
      return acc;
    }, {} as Record<string, string[]>),
    multiple,
    maxFiles,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary hover:bg-primary/5'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-card flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          {isDragActive ? (
            <p className="text-lg font-medium text-primary">Drop your file{multiple ? 's' : ''} here</p>
          ) : (
            <>
              <p className="text-lg font-medium text-foreground">
                Drag and drop your file{multiple ? 's' : ''} here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Accepted formats: {acceptedFileTypes}
              </p>
            </>
          )}
        </div>
      </div>
      
      {acceptedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          {acceptedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
              <File className="w-5 h-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
