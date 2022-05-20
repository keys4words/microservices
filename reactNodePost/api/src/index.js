const express = require('express');
const { connectDb } = require('./helpers/db');
const {host, port, db, authApiUrl} = require("./configuration");
const { default: mongoose } = require('mongoose');
const axios = require('axios');
const app = express();

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model("Post", postSchema);



const startServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Started API service on port: ${port} at host: ${host}`);
        console.log(`Our DB: ${db}`);
        const postOne = new Post({name:"Discovery"});
        postOne.save(function(err, savedPostOne){
            if (err) return console.error(err);
            console.log("savedPostOne with volumes!!", savedPostOne);
        });
        // Post.find(function(err, posts){
        //     if (err) return console.error(err);
        //     console.log('posts', posts);
        // });
    });

};

app.get("/test", (req, res)=>{
    res.send("Our API server is working...");
});

app.get('/api/testapidata', (req, res)=>{
    res.json({
        testwithapi: true
    });
});

app.get('/testwithcurrentuser', (req, res)=>{
    axios.get(authApiUrl+"/currentUser").then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        });
    });
    
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);