const express = require('express');
const { connectDb } = require('./helpers/db');
const {host, port, db, apiurl} = require("./configuration");
const axios=require('axios');
const { response } = require('express');
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

app.get('/testwithapidata', (req, res) =>{
    axios.get(apiurl+'/testapidata').then(response=>{
        res.json({
            testapidata: response.data.testwithapi
        });
    });
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