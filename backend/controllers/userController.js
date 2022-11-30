const User = require("../models/User")
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

module.exports.getUsersToFollow = async (req, res) => {
  const currentUser = await User.findById(req.user?.id).select("-password");
  const toExclude = [currentUser._id, ...currentUser.following]
  const users = await User.find({_id: {"$nin": toExclude}}).select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const result = await User.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        bio: req.body.bio
      }
    });
    return res.send(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


module.exports.follow = async (req, res) => {
  


  try {
    // add to following list
  await User.findByIdAndUpdate(
     {_id: req.params.id},
      {
        $addToSet:
        {
          following: req.body.idToFollow
        }
      })
     // add to the follower list
      await User.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true },
  
      )
      res.status(201).json({msg:"utilisateur suivi"})
      
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

module.exports.unfollow = async (req, res) => {
 


  try {
    // remove to following list
   await User.findByIdAndUpdate(
      {_id: req.params.id},
      { $pull: { following: req.body.idToUnfollow } },
     

    )
    // remove to the follower list
    await User.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
     

    )
    res.status(201).json({msg:"utilisateur non suivi"})
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


