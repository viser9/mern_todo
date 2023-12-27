const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGOOSE);

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    todos : [{
        id : Number,
        title : String,
        description : String
    }]
})

const User =  mongoose.model('User',userSchema);

module.exports = {User};
