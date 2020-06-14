import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const filenHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${filenHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
