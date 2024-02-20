const express = require('express');
const mongoose=require("mongoose")
const app=express()
app.use("/files",express.static("files"))
require('dotenv').config() 
require('./db');
require('./models/pdf')
const pdfSchema=mongoose.model('Pdf_s')
const authRoute=(require('./routes/authRoute'))
const departmentRoutes =require('./routes/department')
const path =require('path')
app.use("/auth",authRoute)
app.use("/department",departmentRoutes)
app.use(express.json())
const cors=require('cors')

app.use(cors());

const multer  = require('multer')
// const upload=multer({ dest: './files' })


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix+file.originalname)
  }
})

 const upload= multer({ storage: storage })
app.get('/get_pdf', async(req,res)=>{
  try {
    await pdfSchema.find({}).then((data)=>{
        res.send({status:"ok", data:data})
    })
  } catch (error) {
    res.send(error)
  }
  
})
app.post('/upload_pdf', upload.single("file"),async(req, res)=>{
      console.log(req.file)
      
      try {
        await pdfSchema.create({pdf:req.file.filename})
        res.send('Okkkkkkkkkkk')
      } catch (error) {
        res.send(error)
      }

      
    })
  
  
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });