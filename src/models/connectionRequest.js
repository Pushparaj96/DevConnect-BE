const { Schema , model } = require("mongoose");

const connectionRequestSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","pending","accepted"],
            message:`{VALUE} is invalid!`
        }
    }
},{timestamps:true});

const ConnectionRequestModel = model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;