const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRegistrationSchema = new Schema({
  first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  designation: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  dob: {
    type: Date,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  pin_code: {
    type: Number,
    default: null,
  },
  my_website: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  requests: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  ],
  friends:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  ],
  password: {
    type: String,
    default: null,
  },
  googleAuth: {
    type: Boolean,
    default: false,
  },
  coverImg: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  profileImg: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SPHGbT7zpUnQWxX6G23hhBVjxxAioJDoSNePax1i6FPVuO1bD2NweVg44RenkPB3vTI&usqp=CAU",
  },
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"post"
    }
  ]
});

module.exports = mongoose.model("user", UserRegistrationSchema);
