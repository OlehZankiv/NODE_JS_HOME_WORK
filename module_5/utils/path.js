import path from "path";
import { getDirname } from "cross-dirname";

export const __dirname = getDirname();

export const tempPath = path.join(__dirname, "../tmp");
export const avatarsPath = path.join(__dirname, "../public/avatars");
