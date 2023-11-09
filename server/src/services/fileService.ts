import { FileArray, UploadedFile } from "express-fileupload";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import { FileOptions } from '../constants';
import path from "path";
import fs from 'fs';
import { ApiError } from "../exceptions/apiError";

export const fileHandler = async (files: FileArray) => {
    try {

        const file: UploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;    
        const [type, ext] = file.mimetype?.split('/');
        
        if (type === 'text') {
            if (file.size > FileOptions.MAX_SIZE) {
                throw ApiError.badRequest('File is oversize'); 
            }
            return await saveFile(file.data, 'txt');
        }

        const resizedImageBuffer = await resizeImage(file, 320, 240);
        return await saveFile(resizedImageBuffer, ext);
    } catch (e: any) {
        throw ApiError.internal();
    }
}

const resizeImage = async (file: UploadedFile, width: number, height: number) => {
    return await sharp(file.data)
      .resize(width, height)
      .toBuffer();
}

const saveFile = async (buffer: Buffer, ext: string) => {
    return new Promise((resolve, reject) => {
        const fileName = uuidv4() + `.${ext}`;
        const filePath = path.resolve(__dirname, '../../static', fileName);
        fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(fileName);
                }
            );

    })
}