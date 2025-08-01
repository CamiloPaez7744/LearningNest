export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
