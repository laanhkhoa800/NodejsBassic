import express  from "express";

const  configViewEngine = (app) => {
    app.use(express.static('./src/public')); //cấu hình express chia sẽ file public ra ngoài
                                             //có thể truy cập tới nhưng file static image, video,...
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}
export default configViewEngine;