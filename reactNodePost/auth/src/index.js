const express = require('express');
const { connectDb } = require('./helpers/db');
const {host, port, db} = require("./configuration");
const app = express();


const startServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Started auth service on port: ${port} at host: ${host}`);
        console.log(`Our DB: ${db}`);
    });

};

app.get("/test", (req, res)=>{
    res.send("Our auth server is working...");
});

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "123",
        email: "tester@mail.com"
    })
})

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);