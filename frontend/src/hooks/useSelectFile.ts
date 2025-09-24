import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { generateUploadUrl, uploadFileToS3 } from "../services/fileService";

interface SelectFilePayload {
  file: File;
  userEmail: string;
}

export const useSelectFile = () => {
  const queryClient = useQueryClient();

  const { mutate: selectFile, isPending: isProcessing } = useMutation({
    mutationFn: async ({ file, userEmail }: SelectFilePayload) => {
      toast.success("Wait for a few seconds for processing to start!");

      const { uploadUrl, fileId } = await generateUploadUrl({
        userEmail,
        originalFilename: file.name,
      });

      // upload file to S3
      await uploadFileToS3(file, uploadUrl);

      return { fileId, userEmail };
    },
    onSuccess: ({ userEmail }) => {
      queryClient.invalidateQueries({
        queryKey: ["file", userEmail],
      });
      queryClient.invalidateQueries({
        queryKey: ["status", userEmail],
      });
    },
    onError: () => {
      toast.error(
        "Something went wrong while processing a file! Try again later"
      );
    },
  });

  return { selectFile, isProcessing };
};
