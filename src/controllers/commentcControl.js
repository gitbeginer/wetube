import Comment from "../models/Comment";
export const addnew = async (req,res)=>{
    const { id } = req.params;
    console.log(req.body,id);
    try{
        const comment =  await Comment.create({
            text : req.body.txt,
            ownerID : req.session.user._id,
            videoID : id
        });
        res.status(201).send(comment._id);
    }catch(error){
        res.status(500).send(error.text);
    }
    
};

export const delold = async (req,res)=>{
    const { id } = req.params;
    console.log(req.body,id);
    try{
        const comment =  await Comment.findById(id);
        if(comment){
            if (String(comment.ownerID) == req.session.user._id){
                await Comment.findByIdAndDelete(id);
                return res.sendStatus(200)
            }
        }else{
            res.sendStatus(404)
        }
    }catch(error){
        res.status(500).send(error.text);
    }
    
};

