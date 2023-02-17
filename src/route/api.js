import  express  from "express";
import apiController from '../controller/apiController';

let router = express.Router();

// setup router url of UI
const initApiRoute = (app) => {
    // app.METHOD(PATH, HANDLER);
    router.get('/users', apiController.getAllUser); // method Get => read data
    router.post('/createuser', apiController.createNewUser); // method Post => add data
    router.put('/updateuser', apiController.updateUser); // method Get => read data\
    router.delete('/deleteuser/:id', apiController.deleteUser); // method Get => delete data
    return app.use('/api/v1', router);
}

export default initApiRoute;