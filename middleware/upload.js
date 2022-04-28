const AWS = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");
const path = require("path");

const s3 = new AWS.S3({
    region : process.env.AWS_REGION,
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

let nowDate = new Date();
let directory = `${nowDate.getFullYear()}_${nowDate.getMonth()+1}_${nowDate.getDate()}`;
const allowFileExtension = [".jpg",".jpeg"];
const limitsize = 10 * 1024 * 1024;
const limitCount = 10;

let fileErr = new Error("file invalid type");
fileErr.code = "INVALID_TYPE";

/*
    one -> upload.single("key_name")
    many -> upload.array("key_name")
    catch error : INVALID_TYPE, Too many files(LIMIT_FILE_COUNT), File too large(LIMIT_FILE_SIZE)
    upload -> next middleware -> req.file or req.files
*/
const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multers3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {

            if(!allowFileExtension.includes(path.extname(file.originalname.toLocaleLowerCase()))) {                
                return cb(fileErr);
            }
            cb(null, `${directory}/${Date.now()}_${file.originalname}`);
        },
    }),
    limits: {
        fileSize: limitsize,
        files: limitCount
    },
});
const uploader = upload.array("images");

const uploadHandle = async (req, res, next) => {

    try {
        uploader(req, res, (err) => {
            if(err) {
                console.error(err);
                return res.status(400).json({message : err.code, status : 400});
            }            
            let filesLocation = [];

            req.files.map((file) => {
                filesLocation.push(file.location);
            });
            
            res.status(200).json({message : `upload success`, filesLocation : filesLocation, status : 201});
        });
        
    } catch (error) {
        next(error);
    }

}

module.exports = { uploadHandle }