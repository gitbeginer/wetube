import multer from "multer";
import imageToBase64 from "image-to-base64";
import multerS3 from "multer-s3"
import aws from "aws-sdk";
const s3 = new aws.S3({
    credentials:{
        accessKeyId:process.env.AWS_ID,
        secretAccessKey:process.env.AWS_SECRET,
    }
});

const multerUploader = multerS3({
    s3 : s3,
    bucket : 'yeahtube',
    acl:'public-read',
})

export const localMiddleware = async (req, res, next) => {
    console.log("sessionID", req.sessionID)
    res.locals.session = req.session;
    // if(req.session.user){
    //     const addres = req.session.user.avatarUrl;
    //     if(addres && addres.startsWith("http")){
    //         const rs = await imageToBase64(addres)
    //         req.session.user.avatarUrl= "data:image/png;base64," + rs
    //     }
    // }
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteName = "WeTube"
    next();
}
export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Log in first.");
        return res.redirect("/");
    }
};


export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
      fileSize: 3000000,
    },
    storage: multerUploader,
  });
  

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
      fileSize: 100000000,
    },
    storage: multerUploader,
  });
  
