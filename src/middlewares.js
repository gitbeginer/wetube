import multer from "multer";

export const localMiddleware = (req, res, next) => {
    console.log("sessionID", req.sessionID)
    res.locals.session = req.session;
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
      fileSize: 10000000,
    },
  });
  
