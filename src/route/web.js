import  express  from "express";
import homeController from '../controller/homeController';
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot+"/src/public/image/");
  },
  filename: function (req, file, cb) {
    console.log('check filename ', file)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const imageFilter = function(req, file, cb) {
  // Accept images only
  console.log('check imageFilter ', req);
  console.log('check imageFilter ', file);
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
let upload = multer({storage: storage, fileFilter: imageFilter });

let upload_mutiple = multer({storage: storage, fileFilter: imageFilter }).array("profileMutiple", 3);
// setup router url of UI
const initWebRoute = (app) => {
    // app.METHOD(PATH, HANDLER);
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create', homeController.createNewUser);
    router.post('/update', homeController.updateUser);
    router.get('/delete/user/:id', homeController.deleteUser);
    router.get('/edit/user/:id', homeController.getDataUserToEdit);

    router.get('/uploadfile', homeController.getUploadFile);
    router.post('/handleUpLoadFile',upload.single("profile"), homeController.handleUpLoadFile);
    // router.post('/handleUploadMutipleFile',upload.array("profileMutiple", 3), homeController.handleUploadMutipleFile);
    router.post('/handleUploadMutipleFile', (req, res, next) => {
      upload_mutiple( req, res, (err) => {
        if( err instanceof multer.MulterError && err.code == "LIMIT_UNEXPECTED_FILE") {
          //hande multer filr limit error here
          res.send('LIMIT_UNEXPECTED_FILE')
        } else if (err) {
          res.send(err)
        } else {
          //make sure to call next() if all was well
          next();
        }
      })
    }, homeController.handleUploadMutipleFile);

    router.get('/about', (req, res) => {   
        res.send(`I'm la anh khoa`);
    })
    
    return app.use('/', router)
      
}

export default initWebRoute;