import axios from "axios";
import apiClient from "./apiClient";
import type { File as FileType } from "../types";

interface GenerateUploadUrlPaylod {
  userEmail: string;
  originalFilename: string;
}

interface GenerateUpladUrlResponse {
  uploadUrl: string;
  s3Filename: string;
  fileId: string;
}

export const generateUploadUrl = async (
  payload: GenerateUploadUrlPaylod
): Promise<GenerateUpladUrlResponse> => {
  const response = await apiClient.post<GenerateUpladUrlResponse>(
    "/files/upload-url",
    payload
  );
  return response.data;
};

export const uploadFileToS3 = async (
  file: File,
  uploadUrl: string
): Promise<void> => {
  await axios.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};

export const getFile = async ({ userEmail }: { userEmail: string }) => {
  try {
    const params = new URLSearchParams();
    params.append("userEmail", userEmail);
    const response = await apiClient.get(`/files?${params.toString()}`);
    console.log(response)
    return (response.data as FileType) ;
  } catch (error: any) {
    console.error(
      "Error fetching file:",
      error.response?.data || error.message
    );
    throw error;
  }
};
