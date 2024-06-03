const express = require("express");

let adminRouter = express.Router({}); // 

adminRouter.get("/", (req, res) => {
    res.send("Hello Folks from Admin App");
});
  
adminRouter.get("/info", (req, res) => {
    res.send("Hello Folks from Admin App");
});
  

module.exports = adminRouter;