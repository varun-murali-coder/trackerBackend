const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const time = require('../libs/timeLib')
let commentSchema=new Schema(
    {
        
        commentId:{
            type:String,
            unique:true
        },
        issueId:{
            type:String,
            default:''
        },
        comment:{
            type:String,
            default:''
        },
        created:{
            type:Date,
            default:time.now
        },
        lastModified:{
            type:Date,
            default:time.now
        }


    });

    mongoose.model('CommentModel',commentSchema);