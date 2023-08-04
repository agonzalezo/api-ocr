// Libs
import express from "express";
import router from './routes/backend.js';
import os from 'os'
import tesseract from 'node-tesseract-ocr';
import { URL } from 'url';
import fileupload from 'express-fileupload';
import path from 'path';
import { hostname } from 'os'

const app = express()

// vars
const __filename = new URL('', import.meta.url).pathname;
let __dirname = new URL('.', import.meta.url).pathname;
__dirname = __dirname.substring(1) // for windows
const imagePath = path.join(__dirname, 'uploaded-files', 'image.jpg')

const ocrConfig = {
    psm: 7,
}

const uploadOptions= {
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: __dirname+"/uploaded-files/"
}

app.set('api_name', process.env.API_NAME)
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname+ "/public"));
app.use(fileupload(uploadOptions));
app.use(router);

// code
app.listen(app.get("port"), () => {
    console.log(`api-${app.get('api_name')} started on http://${hostname}:${app.get('port')}`)
})

tesseract
    .recognize( imagePath, ocrConfig)
    .then((text) => {
        console.log("Result:", text)
    })
    .catch((error) => {
        console.log(error.message)
    })

