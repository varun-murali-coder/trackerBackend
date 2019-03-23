const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const time = require('../libs/timeLib')
let issueSchema=new Schema(
    {
        title:{
  type:String,
  default:''
        },
        issueId:{
            type:String,
            unique:true
        },
        reporter:{
            type:String,
            default:''
        },
        assignee:{
            type:String,
            default:''
        },
        status:{
            type:String,
            default:''
        },
        description:{
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

    mongoose.model('Issue',issueSchema);