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

        let join: object[] = [{
            $lookup: {
                from: "Member",
                localField: "_id",
                foreignField: "HouseholdId",
                as: "Members"
            }
        }];

        dbo.collection('Household').aggregate(join).toArray(function(err, result) {
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
        let join: object[] = [
            {
                $match: { _id: new ObjectID(req.params.id) }
            },
            {
                $lookup: {
                    from: "Member",
                    localField: "_id",
                    foreignField: "HouseholdId",
                    as: "Members"
                }
            }
        ];

        dbo.collection('Household').aggregate(join).next(function(err, result) {
            if (err) console.log(err);
            res.send(result);
            db.close();
        });
    });
});

app.put('/household',function(req,res)
{
    let update: any = {
        LastName: req.body.LastName,
        Phone: req.body.Phone,
        Address1: req.body.Address1,
        Address2: req.body.Address2,
        City: req.body.City,
        State: req.body.State,
        Zip: req.body.Zip,
        Anniversary: req.body.Anniversary,
        Hobbies: req.body.Hobbies,
        FavFood: req.body.FavFood,
        FavScripture: req.body.FavScripture,
        FavHymn: req.body.FavHymn
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
        let join: object[] = [
            { $lookup: {
                from: "Household",
                localField: "HouseholdId",
                foreignField: "_id",
                as: "Household"
            } }, 
            { $unwind: { 
                path: "$Household",
                preserveNullAndEmptyArrays: true
            }}
        ];
        dbo.collection('Member').aggregate(join).toArray(function(err, result) {
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
        let join: object[] = [
            {
                $match: { _id: new ObjectID(req.params.id) }
            },
            {
                $lookup: {
                    from: "Household",
                    localField: "HouseholdId",
                    foreignField: "_id",
                    as: "Household"
                }
            }, 
            { 
                $unwind: { 
                    path: "$Household",
                    preserveNullAndEmptyArrays: true
                }
            }
        ];
        dbo.collection('Member').aggregate(join).next(function(err, result) {
            if (err) console.log(err);
            res.send(result);
            db.close();
        });
    });
});

app.put('/member',function(req,res)
{
    let update: any = {
        HouseholdId: new ObjectID(req.body.HouseholdId),
        FirstName: req.body.FirstName,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Ocupation: req.body.Ocupation,
        Birthplace: req.body.Birthplace,
        Birthdate: req.body.Birthdate,
        BaptismDate: req.body.BaptismDate,
        Hobbies: req.body.Hobbies,
        FavFood: req.body.FavFood,
        FavScripture: req.body.FavScripture,
        FavHymn: req.body.FavHymn
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
    update.HouseholdId = new ObjectID(update.HouseholdId);
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