import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getFileStatus } from "../services/fileService";

export const useStatus = () => {
  const userEmail = localStorage.getItem("userEmail");
  const queryClient = useQueryClient();

  const {
    data: status,
    isFetching,
    error,
  } = useQuery<string, Error>({
    queryKey: ["status", userEmail],
    queryFn: () => {
      if (!userEmail) throw new Error("User email not found");
      return getFileStatus({ userEmail });
    },
    enabled: !!userEmail,
    retry: 1,
    refetchInterval: (query) => {
      const status = query.state.data;
      if (status === "pending") return 3000;
      return false;
    },
  });

  useEffect(() => {
    if (status === "success" || status === "error") {
      queryClient.invalidateQueries({ queryKey: ["file", userEmail] });
    }
  }, [status, queryClient, userEmail]);

  return {
    status,
    isFetching,
    error,
  };
};
