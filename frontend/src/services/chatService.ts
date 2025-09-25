import type { Chat } from "../types";
import apiClient from "./apiClient";

export const askQuestion = async ({
  fileId,
  userEmail,
  question,
}: {
  fileId: string;
  userEmail: string;
  question: string;
}) => {
  try {
    const response = await apiClient.post("/chat/ask", {
      fileId,
      userEmail,
      question,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "An error occured while asking a question:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getChatHistory = async (userEmail: string) => {
  try {
    const params = new URLSearchParams();
    params.append("userEmail", userEmail);
    const response = await apiClient.get(`/chat/history?${params.toString()}`);

    return (response.data as Chat[]) || [];
  } catch (error: any) {
    console.error(
      "Error fetching chat history:",
      error.response?.data || error.message
    );
    throw error;
  }
};
