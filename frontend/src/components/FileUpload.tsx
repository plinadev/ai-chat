import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelectFile } from "../hooks/file/useSelectFile";
import { IoCloudUpload } from "react-icons/io5";

function FileUpload() {
  const { selectFile } = useSelectFile();
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload PDF file only.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB.");
      return;
    }

    const userEmail = localStorage.getItem("userEmail")!;
    selectFile({ file, userEmail });
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) handleFileSelect(droppedFiles[0]);
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) handleFileSelect(files[0]);
  };
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-base-300 hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
        >
          <IoCloudUpload
            size={48}
            className="mx-auto text-[var(--color-logo-yellow)]/60 mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">
            Upload a PDF to get started
          </h3>
          <p className="text-base-content/70 mb-4">
            Drag & drop your PDF here, or click to browse
          </p>
          <button
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose PDF File
          </button>
          <p className="text-sm text-base-content/60 mt-2">
            Maximum file size: 10MB
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
}

export default FileUpload;
