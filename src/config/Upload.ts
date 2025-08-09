import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  directory: string;
  storage: StorageEngine;
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, uploadFolder);
  },
  filename: (request, file, callback) => {
    const fileHash = crypto.randomBytes(10).toString('hex');
    const filename = `${fileHash}-${file.originalname}`;
    callback(null, filename);
  },
});

const uploadConfig: IUploadConfig = {
  directory: uploadFolder,
  storage: storage,
};

export default uploadConfig;
