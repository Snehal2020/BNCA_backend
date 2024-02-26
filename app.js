const express = require('express');
const mongoose=require("mongoose")
const app=express()
app.use("/files",express.static("files"))
require('dotenv').config() 
require('./db');
const Pdf=require('./models/pdf')
const pdfSchema=mongoose.model('Pdf_s')
const authRoute=(require('./routes/authRoute'))
const departmentRoutes =require('./routes/department')
const courseRoutes =require('./routes/course')
const facultyRoutes =require('./routes/faculty_stu')
const path =require('path')
const formidable = require("express-formidable");
// app.use(formidable());
app.use("/auth",authRoute)
app.use("/department",departmentRoutes)
app.use("/course",courseRoutes)
app.use("/faculty",facultyRoutes)
app.use(express.json())
const cors=require('cors')
app.use(cors());
const {objectIdcontroller} = require('./controllers/courseController')
const {objectIdcontroller_f} = require('./controllers/facultyController')
const multer  = require('multer')
// const upload=multer({ dest: './files' })

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

// Your route definitions here

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
  
    

    // app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); 
    // Serve static files from /uploads

// Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // Route to handle file upload
// app.post('/upload_pdf', upload.single('file'), async (req, res) => {
//   try {
//     const newPdf = new Pdf({
//       title: req.body.title,
//       pdfPath: req.file.path,
//     });
//     await newPdf.save();
//     res.status(201).send('PDF Uploaded');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// // Route to get list of PDFs
// app.get('/get_pdfs', async (req, res) => {
//   try {
//     const pdfs = await Pdf.find();
//     res.status(200).json(pdfs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
  
app.post('/rec',objectIdcontroller);
app.post('/dept-id',objectIdcontroller_f);
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });



