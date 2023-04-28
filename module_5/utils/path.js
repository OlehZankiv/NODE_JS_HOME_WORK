import { fileURLToPath } from "url";
import path from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const tempPath = path.join(__dirname, "../tmp");
export const avatarsPath = path.join(__dirname, "../public/avatars");
