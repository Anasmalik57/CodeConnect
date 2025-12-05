import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({ pdf: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("Resume uploaded:", file.url);
      return { url: file.url };
    }
  ),
};
