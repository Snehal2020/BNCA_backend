const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken')

const pdfSchema=new mongoose.Schema({
    title: String,
  pdfPath: String,
})


module.exports=mongoose.model('Pdf_s',pdfSchema)
