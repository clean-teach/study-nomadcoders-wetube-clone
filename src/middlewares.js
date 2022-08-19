import multer from "multer";
import multerS3 from "multer-s3"
import awsSdk from "aws-sdk";

const s3 = new awsSdk.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const multerUploader = multerS3({
    s3: s3,
    bucket: 'nomad-wetube',
    acl: 'public-read',
});

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteName = 'Wetube';
    next();
};
export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next();
    }else{
        req.flash('error', 'Log in First');
        return res.redirect('/login');
    }
};
export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    }else{
        req.flash('error', 'Not Authorized');
        return res.redirect('/');
    }
};
export const avatarUpload = multer({
    dest: 'uploads/avatars/', 
    limits: {
        fileSize: 3000000,
    },
    storage: multerUploader,
});
export const videoUpload = multer({
    dest: 'uploads/videos/', 
    limits: {
        fileSize: 10000000,
    },
    storage: multerUploader,
});