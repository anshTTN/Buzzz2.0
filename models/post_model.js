const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
      post_text:{type:String,default:null},
      userEmail:{type:String,default:null},
      image_url:{type:String,default:null},
      like:{type:Number,default:0},
      dislike:{type:Number,default:0},
      comments:[
          {
              userName:{type:String,default:null},
              comment:{type:String,default:null}
          }
      ],
      report:{type:Number,default:0},
      created_at:{type:Date,default:null}
});

module.exports = mongoose.model("post", PostSchema);
