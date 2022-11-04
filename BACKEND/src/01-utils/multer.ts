
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {

        return {
            folder: 'online-store',
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'svg', 'pdf'],
            filename: `${Date.now()}-${file.originalname}`,
            transformation: [{ width: 500, height: 500, crop: 'limit' }]

            
            
        };

    },
});


const uploadOptions = multer({ storage: storage })


export default uploadOptions;