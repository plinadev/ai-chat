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

    return response.data as FileType;
  } catch (error: any) {
    console.error(
      "Error fetching file:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFileStatus = async ({ userEmail }: { userEmail: string }) => {
  try {
    const params = new URLSearchParams();
    params.append("userEmail", userEmail);
    const response = await apiClient.get(`/files/status?${params.toString()}`);
    return response.data as string;
  } catch (error: any) {
    console.error(
      "Error fetching status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteFile = async ({
  fileId,
  userEmail,
}: {
  fileId: string;
  userEmail: string;
}) => {
  try {
    const params = new URLSearchParams();
    params.append("fileId", fileId);
    params.append("userEmail", userEmail);

    const response = await apiClient.delete(`/files?${params.toString()}`);
    return response;
  } catch (error: any) {
    console.error(
      "Error deleting file ",
      error.response?.data || error.message
    );
    throw error;
  }
};
