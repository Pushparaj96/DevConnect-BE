const { Schema , model } = require("mongoose");

const connectionRequestSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User" // reference to User collection
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","pending","accepted","rejected"],
            message:`{VALUE} is invalid!`
        }
    }
},{timestamps:true});

// compound index for fields
connectionRequestSchema.index({senderId:1,receiverId:1});

// pre middeleware checks before every save in DB 
connectionRequestSchema.pre("save",function(next){
   const ConnectionRequest = this; // Short hand { senderId , receiverId } = this;
   if(ConnectionRequest.senderId.equals(ConnectionRequest.receiverId)){
    throw new Error ("You can't Send Request to Yourself!");
   }
   next(); // move to route handler
})

const ConnectionRequestModel = model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;