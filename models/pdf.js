const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken')

const pdfSchema=new mongoose.Schema({
    pdf:{
        type:String,
        require:true
    }
})


module.exports=mongoose.model('Pdf_s',pdfSchema)
