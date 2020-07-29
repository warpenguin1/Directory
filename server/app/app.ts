import express from 'express';
import bodyParser from 'body-parser';
import MongoClient, { ObjectID } from 'mongodb';

import { Member } from './model/Member';
import { Household } from './model/Household';

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

app.get('/household',function(req,res)
{
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        dbo.collection('Household').find({}).toArray(function(err, result) {
            if (err) console.log(err);
            res.send(result);
            db.close();
        });
    });
});

app.get('/household/:id',function(req,res)
{
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        let id = new ObjectID(req.params.id);
        dbo.collection('Household').findOne({_id: id}).then(function(result) {
            res.send(result);
            db.close();
        }).catch(reason => {
            console.log(reason);
            db.close();
        });
    });
});

app.put('/household',function(req,res)
{
    let update: any = {
        name: req.body.name,
        type: req.body.type,
        author: req.body.author,
        containerId: new ObjectID(req.body.containerId)
    }
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        dbo.collection('Household').updateOne({_id: new ObjectID(req.body._id)}, { $set: update }, (err, result) => {
            if (err) console.log(err);
            res.send(update);
            db.close();
        });
    });
});

app.post('/household',function(req,res)
{
    let update = <Household>req.body;
    update._id = new ObjectID();
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        dbo.collection('Household').insertOne(update, function(err, result){
            if (err) console.log(err);
            res.send(update);
            db.close();
        });
    });
});

app.get('/member',function(req,res)
{
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        dbo.collection('Member').find({}).toArray(function(err, result) {
            if (err) console.log(err);
            res.send(result);
            db.close();
        });
    });
});

app.get('/member/:id',function(req,res)
{
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        let id = new ObjectID(req.params.id);
        dbo.collection('Member').findOne({_id: id}).then(function(result) {
            res.send(result);
            db.close();
        }).catch(reason => {
            console.log(reason);
            db.close();
        });
    });
});

app.put('/member',function(req,res)
{
    let update: any = {
        name: req.body.name,
        type: req.body.type,
        author: req.body.author,
        containerId: new ObjectID(req.body.containerId)
    }
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        dbo.collection('Member').updateOne({_id: new ObjectID(req.body._id)}, { $set: update }, (err, result) => {
            if (err) console.log(err);
            res.send(update);
            db.close();
        });
    });
});

app.post('/member',function(req,res)
{
    let update = <Member>req.body;
    update._id = new ObjectID();
    MongoClient.connect(uri, params, (err, db) => {
        if (err) console.log(err);
        let dbo = db.db(database);
        dbo.collection('Member').insertOne(update, function(err, result){
            if (err) console.log(err);
            res.send(update);
            db.close();
        });
    });
});

let server=app.listen(3000,function() {
    console.log('directory app listening on port 3000!');
});