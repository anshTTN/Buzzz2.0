const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userName:{type: String, default: null },
  post_text: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  image_url: { type: String, default: null },
  like: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }],
  dislike: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }],
  comments: [
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId, ref: "user" 
        },
        userName:{type:String,default:null},
      comment: { type: String, default: null },
    },
  ],
  report: { type: Number, default: 0 },
  userImage:{
      type:String,
      default:null
  }
},{timestamps: true});

module.exports = mongoose.model("post", PostSchema);
