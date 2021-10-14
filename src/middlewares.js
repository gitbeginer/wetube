import multer from "multer";
import imageToBase64 from "image-to-base64";

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
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};


export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
      fileSize: 3000000,
    },
  });
  

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
      fileSize: 100000000,
    },
  });
  
