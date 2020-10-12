/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ValidationMessage } from '@lib/enums/messages';
import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req,file,/\.(jpg|jpeg|png|gif)$/, ValidationMessage.OnlyImagesFilesAllowed, callback);
};

export const jpgFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req,file,/\.(jpg|jpeg)$/, ValidationMessage.OnlyJpgFilesAllowed, callback);
};

export const pngFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req,file, /\.(png)$/, ValidationMessage.OnlyPngFilesAllowed, callback);
};

export const gifFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(gif)$/, ValidationMessage.OnlyGifFilesAllowed, callback);
};

export const csvFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(gif)$/, ValidationMessage.OnlyGifFilesAllowed, callback);
};

export const txtFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(txt)$/, ValidationMessage.OnlyTxtFilesAllowed, callback);
};

export const pdfFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(pdf)$/, ValidationMessage.OnlyPdfFilesAllowed, callback);
};

export const docxFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(txt)$/, ValidationMessage.OnlyDocxFilesAllowed, callback);
};

export const xlsxFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(xlsx)$/, ValidationMessage.OnlyXlsxFilesAllowed, callback);
};

export const xlsmFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(xlsm)$/, ValidationMessage.OnlyXlsmFilesAllowed, callback);
};

export const pptxFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(pptx)$/, ValidationMessage.OnlyPptxFilesAllowed, callback);
};

export const jsonFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(json)$/, ValidationMessage.OnlyJsonFilesAllowed, callback);
};

export const xmlFileFilter = (req, file, callback) => {
  // prettier-ignore
  return _fileFilter(req, file, /\.(xml)$/, ValidationMessage.OnlyXmlFilesAllowed, callback);
};

export const customFileName = (req, file, callback) => {
  // prettier-ignore
  const { id } = req.user;
  callback(null, `${id}-${new Date().getTime()}${extname(file.originalname)}`);
};

const _fileFilter = (req, file, regexp, message, callback) => {
  if (!file.originalname.match(new RegExp(regexp))) {
    return callback(new BadRequestException(message), false);
  }

  return callback(null, true);
};
