import multer from "multer";
import Jimp from "jimp";
import { tempPath } from "./path.js";

export const convertImageToAvatar = async (file) =>
  Jimp.read(file)
    .then((img) => img.resize(256, 256))
    .catch((err) => console.error(err));

export const multerUpload = multer({ dest: tempPath });
