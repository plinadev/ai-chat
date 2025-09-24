import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  generateUploadUrl,
  uploadFileToS3,
  startProcessing,
} from "../services/fileService";

interface SelectFilePayload {
  file: File;
  userEmail: string;
}

export const useSelectFile = () => {
  const queryClient = useQueryClient();

  const { mutate: selectFile, isPending: isProcessing } = useMutation({
    mutationFn: async ({ file, userEmail }: SelectFilePayload) => {
      toast("Wait for a few seconds for processing to start...");

      // 1. Get presigned URL + fileId
      const { uploadUrl, fileId } = await generateUploadUrl({
        userEmail,
        originalFilename: file.name,
      });

      // 2. Upload file to S3
      await uploadFileToS3(file, uploadUrl);

      // 3. Trigger Step Function
      await startProcessing({ fileId, userEmail });

      return { fileId, userEmail };
    },
    onSuccess: ({ userEmail }) => {
      queryClient.invalidateQueries({ queryKey: ["file", userEmail] });
      queryClient.invalidateQueries({ queryKey: ["status", userEmail] });
    },
    onError: () => {
      toast.error(
        "Something went wrong while processing the file. Try again later."
      );
    },
  });

  return { selectFile, isProcessing };
};
