const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const searchSchema = new Schema({
  searchId:{
    type: String,
    unique:true
  },  
  issueId: {
    type: String
  },
  userName: {
    type: String
  }
})

module.exports = mongoose.model('Search', searchSchema)
