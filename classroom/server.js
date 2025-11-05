const express = require("express");
const app = express();
const  session = require("express-session");

app.use(session({
    secret : "code",
    resave : false,
    saveUninitialized : true
}));

app.get("/register" , (req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    res.redirect("/hellow");
});

app.get("/hellow" , (req,res)=>{
    res.send(`Hello ${req.session.name}`);
});

// app.get("/reqCount" , (req,res)=>{
//     if(req.session.count){
//         req.session.count ++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`Request count is ${req.session.count} times`);
// });

app.listen (3000, ()=>{
    console.log("Server Started at Port 3000");
});


