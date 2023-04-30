import { multerUpload } from "../utils/imageUploader.js";

export const uploadAvatarMiddleware = multerUpload.single("avatar");
