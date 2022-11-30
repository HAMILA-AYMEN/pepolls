const User = require("../models/User")
const ObjectID = require("mongoose").Types.ObjectId;
const Post=require("../models/Post")


module.exports.readPost = async(req, res) => {
    try {
        const docs=await Post.find().populate("posterId").populate("comments.commenterId").sort({ createdAt: -1 })
        res.send(docs)
    } catch (err) {
        console.log("Error to get data : " + err);
    }
};

module.exports.createPost = async (req, res) => {


    const newPost = new Post({
        posterId: req.body.posterId,
        message: req.body.message,
        
        picture:req.file?.filename,
        video: req.body.video,
        likers: [],
        comments: [],
    }
    );
    

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        message: req.body.message,
    };

    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
};

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Post.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
    });
};


module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.posterId },
            },
            { new: true }
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.postId },
            },
            { new: true }
        );
        res.send('user update with success')
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
            res.send('user update with success')
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.editCommentPost = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
        try {
            const result = await Post.findOneAndUpdate({
              _id: req.params.id
            }, {
              $set: {
                text: req.body.text
              }
            });
            return res.send(result);
          } catch (err) {
            return res.status(500).json({ message: err });
          }
};

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        commmenterId: req.body.commenterId,
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};