import { v4 as uuidv4 } from 'uuid';
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  const uniqueSuffix = Date.now() + '-' + uuidv4();
  const cleanName = file.originalname.replace(/\s+/g, '').trim().toLowerCase();
  file.originalname = cleanName;
  cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
};
