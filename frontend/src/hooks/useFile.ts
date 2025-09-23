import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { File as FileType } from "../types";
import { getFile } from "../services/fileService";

export const useFile = () => {
  const userEmail = localStorage.getItem("userEmail");

  const {
    data: file,
    isFetching,
    error,
  } = useQuery<FileType, Error>({
    queryKey: ["file", userEmail],
    queryFn: () => {
      if (!userEmail) {
        toast.error("User email not found");
        throw new Error("User email not found");
      }
      return getFile({ userEmail });
    },
    enabled: !!userEmail,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    file,
    isFetching,
    error,
  };
};
