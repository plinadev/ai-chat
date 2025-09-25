export type File = {
  _id: string;
  userFilename: string;
  status: "pending" | "success" | "error";
  s3Filename: string;
  fileUrl: string | null;
};
export type Chat = {
  _id: string;
  fileId: string;
  userEmail: string;
  question: string;
  answer: string;
  createdAt: string;
};
