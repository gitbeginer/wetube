export const localMiddleware = (req,res,next)=>{
    
    res.locals.session = req.session;
    res.locals.siteName ="WeTube"
    console.log(res.locals);
    next();
}