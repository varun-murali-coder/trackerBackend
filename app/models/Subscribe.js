'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let SubscribeSchema = new Schema({
  subscriptionId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  subscriptionObject: {
    type: Object,
    default: ''
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('Subscribe', SubscribeSchema);