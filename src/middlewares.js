export const localMiddleware = (req,res,next)=>{
    res.locals.session = req.session;
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteName ="WeTube"
    next();
}