const express = require("express");
const fs = require("fs");

const studentRouter = express.Router();


studentRouter.get('/', function (req, res) {
    // console.log(req);
    res.send(`<h2>Hello Folks From Student Router</h2>`);
});


//4. Create API's in default setup - getStudentDetails - Pass Student info like - Name, Age, Address, Session as query string
//http://localhost:3000/getStudentDetails?name=carmen&age=25&address=somewhere&session=mernstack
studentRouter.get("/getStudentDetails", (req, res) => {
    res.json(req.query);

    try {
    // 5. Save this information received in #4  to a file named studentIfo using fs module async way
        fs.writeFile("studentInfo.txt", JSON.stringify(req.query), err => {
            console.log("Student Details Saved To File.");       
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = studentRouter;