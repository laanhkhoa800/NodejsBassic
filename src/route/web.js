import  express  from "express";
import homeController from '../controller/homeController';

let router = express.Router();

// setup router url of UI
const initWebRoute = (app) => {
    // app.METHOD(PATH, HANDLER);

    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.get('/edit/', homeController.getHomepage);
    router.get('/about', (req, res) => {   
        res.send(`I'm la anh khoa`);
    })

    return app.use('/', router)
      
}

export default initWebRoute;