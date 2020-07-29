import express from 'express';
import bodyParser from 'body-parser';
import MongoClient, { ObjectID } from 'mongodb';

const uri = "mongodb://localhost:27017/";
const params : MongoClient.MongoClientOptions = { useNewUrlParser: true ,useUnifiedTopology: true};
const database = 'Directory';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

let server=app.listen(3000,function() {
    console.log('directory app listening on port 3000!');
});