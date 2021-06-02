import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from 'path';
uuidv4();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-"+file.originalname+'-'+ Date.now() + path.extname(file.originalname)
        );
    },
});

export default multer({storage});
