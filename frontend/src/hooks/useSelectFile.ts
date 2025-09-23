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
      // get pre-signed URL and document metadata
      const { uploadUrl, fileId } = await generateUploadUrl({
        userEmail,
        originalFilename: file.name,
      });

      // upload file to S3
      await uploadFileToS3(file, uploadUrl);

      return { fileId, userEmail };
    },
    onSuccess: ({ userEmail }) => {
      toast.success("File processing has successfully started!");
      queryClient.invalidateQueries({
        queryKey: ["file", userEmail],
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
