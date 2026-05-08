var multer=require('multer');
var path=require('path');
var fs=require('fs');



const uploadPath=path.join(__dirname,'../uploads');
console.log("Upload path:", uploadPath);

  if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Uploads folder created at:", uploadPath);
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath);
    },
    filename:(req,file,cb)=>{
      console.log(req.body);
      console.log(file);
      console.log("Upload path:", uploadPath);
        const uniqueSuffix=Date.now()+"-"+file.originalname;
        cb(null,uniqueSuffix);
    }
});

// file filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage:storage, fileFilter });

module.exports=upload;
