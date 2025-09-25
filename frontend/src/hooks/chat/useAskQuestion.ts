import { useMutation, useQueryClient } from "@tanstack/react-query";
import { askQuestion as askQuestionApi } from "../../services/chatService";
import toast from "react-hot-toast";
import type { Chat } from "../../types";

export const useAskQuestion = () => {
  const queryClient = useQueryClient();

  const { mutate: askQuestion, isPending: isThinking } = useMutation({
    mutationFn: askQuestionApi,

    onMutate: async (variables: {
      userEmail: string;
      fileId: string;
      question: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["chat"] });

      const previousChat = queryClient.getQueryData<Chat[]>(["chat"]) ?? [];

      const tempId = `temp-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      const optimisticMessage: Chat = {
        _id: tempId,
        userEmail: variables.userEmail,
        fileId: variables.fileId,
        question: variables.question,
        answer: "", // no answer yet
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Chat[]>(
        ["chat"],
        [...previousChat, optimisticMessage]
      );

      return { previousChat, tempId };
    },

    onSuccess: (data, _variables, context) => {
      if (!context?.tempId) return;

      queryClient.setQueryData<Chat[]>(["chat"], (oldChat = []) =>
        oldChat.map((m) => (m._id === context.tempId ? data : m))
      );
    },

    onError: (_err, _variables, context) => {
      if (context?.previousChat) {
        queryClient.setQueryData(["chat"], context.previousChat);
      }
      toast.error("Failed to get an answer. Try again.");
    },
  });

  return { askQuestion, isThinking };
};
