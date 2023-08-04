import express from "express";
import path from 'path';
import { URL } from 'url';
import funciones from '../controller/funciones.js';
import os from 'os'
import dotenv from 'dotenv'

// region  Initialice functions
dotenv.config()

let __dirname = new URL('..', import.meta.url).pathname;
// __dirname = __dirname.substring(1) // for windows
const router = express.Router();
const API_NAME = process.env.API_NAME

router.get(`/api/${API_NAME}/ping`, (req, res) => {
    console.log(`${req.ip} do a ping!..`)
    res.status(200).json({ name: os.hostname(), message: 'Server is working.', arch: os.arch(), memory: os.totalmem(), uptime: os.uptime(), load: os.loadavg(), cpu: os.cpus() })
})

router.post(`/api/${API_NAME}/upload`, funciones.upload)

router.all('*', (req, res) => {
    console.log(req.url, req.method, req.ip)
    res.status(404).json({ message: 'I Dont have that.' })
})

export default router;