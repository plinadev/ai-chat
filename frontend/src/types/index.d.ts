export type File = {
  _id: string;
  userFilename: string;
  status: "pending" | "success" | "error";
  s3Filename: string;
  fileUrl: string | null;
};
