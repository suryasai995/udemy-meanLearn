const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRouter = require("./routes/posts");
const userRouters = require("./routes/user");

const app = express();
//mogodb userName surya paw:- CQ9UOcKpV0Fs4Gzh


mongoose.connect("mongodb+srv://surya:" +
process.env.MONGO_ATLAS_PW +
"@cluster0.bw5qe.mongodb.net/node-angular")
//?retryWrites=true&w=majority --end in url
        .then(()=> {console.log('Connected to database!')})
        .catch(() => {
            console.log('Connected failed!');
        });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT,  DELETE, OPTIONS"
    );
    next();

});
app.use("/posts", postsRouter);
app.use("/user", userRouters);

module.exports = app;