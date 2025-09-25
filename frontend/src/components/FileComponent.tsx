import { IoClose, IoDocument } from "react-icons/io5";
import { useDeleteFile } from "../hooks/file/useDeleteFile";
import { useFile } from "../hooks/file/useFile";

function FileComponent() {
  const userEmail = localStorage.getItem("userEmail")!;
  const { file } = useFile();
  const { deleteFile, isDeleting } = useDeleteFile();
  if (!file) return;
  return (
    <div className="flex mt-8 py-2 px-4 mx-4 bg-gradient-to-r from-[var(--color-logo-yellow)]/70 via-[var(--color-success)]/70 to-[var(--color-logo-teal)]/70 rounded-xl lg:w-[50%] lg:self-center">
      <div className="flex w-full items-center justify-between">
        <div className="flex space-x-2 items-center">
          <IoDocument size={20} />
          <div className="font-medium">{file.userFilename}</div>
        </div>
        {(file.status === "success" || file.status === "error") && (
          <button
            className="btn btn-ghost btn-sm btn-circle text-accent hover:text-white hover:bg-primary"
            onClick={() => deleteFile({ fileId: file._id, userEmail })}
            title="Remove file"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <IoClose size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default FileComponent;
