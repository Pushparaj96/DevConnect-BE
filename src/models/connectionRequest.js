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

// compound index for fields
connectionRequestSchema.index({senderId:1,receiverId:1});

// pre middeleware checks before every save in DB 
connectionRequestSchema.pre("save",function(next){
   const ConnectionRequest = this;
   if(ConnectionRequest.senderId.equals(this.receiverId)){
    throw new Error ("You can't Send Request to Yourself!");
   }
   next(); // move to route handler
})

const ConnectionRequestModel = model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;