import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Chat } from "../../types";
import { getChatHistory } from "../../services/chatService";

export const useChat = () => {
  const userEmail = localStorage.getItem("userEmail");

  const {
    data: chat,
    isFetching,
    error,
  } = useQuery<Chat[], Error>({
    queryKey: ["chat"],
    queryFn: () => {
      if (!userEmail) {
        toast.error("User email not found");
        throw new Error("User email not found");
      }
      return getChatHistory(userEmail);
    },
    enabled: !!userEmail,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    chat,
    isFetching,
    error,
  };
};
