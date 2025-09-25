import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteFile as deleteFileApi } from "../../services/fileService";

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteFile, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: deleteFileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["file"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["status"], exact: false });
    },
    onError: () => {
      toast.error(
        "Something went wrong while removing a file! Try again later"
      );
    },
  });

  return { deleteFile, isDeleting };
};
