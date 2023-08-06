import path from 'path';
import { URL } from 'url';
import tesseract from 'node-tesseract-ocr';

const ocrConfig = {
    psm: 3,
}

let __dirname = new URL('..', import.meta.url).pathname;
// __dirname = __dirname.substring(1) // for windows

let funciones = {};
const dirfiles = path.join(__dirname, "/uploaded-files/");


funciones.upload = (req, res) => {
    let fname = req.files.filename.name;
    req.files.filename.mv(dirfiles + fname, (err) => {
        //    if (err) res.status(400).send("Falla al cargar el archvio "+fname);
        if (err) {
            res.status(501).json({
                status: 'error',
                message: 'error uploading the image.'
            })        }
        console.log("Liberando Memoria..")
        req.files.filename = null;
        tesseract
            .recognize(path.join(dirfiles, fname), ocrConfig)
            .then((text) => {
                console.log("Result:", text)
                res.status(200).json(
                    {
                        status: 'ok',
                        message: text,
                    }
                )
            })
            .catch((error) => {
                console.log(error.message)
                res.status(500).json({
                    status: 'error',
                    message: 'error parsing the image, remember just works with images...'
                })
            })

    });
}
export default funciones;