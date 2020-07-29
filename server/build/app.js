"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongodb_1 = __importStar(require("mongodb"));
var uri = "mongodb://localhost:27017/";
var params = { useNewUrlParser: true, useUnifiedTopology: true };
var database = 'Directory';
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.get('/household', function (req, res) {
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        var join = [{
                $lookup: {
                    from: "Member",
                    localField: "_id",
                    foreignField: "HouseholdId",
                    as: "Members"
                }
            }];
        dbo.collection('Household').aggregate(join).toArray(function (err, result) {
            if (err)
                console.log(err);
            res.send(result);
            db.close();
        });
    });
});
app.get('/household/:id', function (req, res) {
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        var join = [
            {
                $match: { _id: new mongodb_1.ObjectID(req.params.id) }
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
        dbo.collection('Household').aggregate(join).next(function (err, result) {
            if (err)
                console.log(err);
            res.send(result);
            db.close();
        });
    });
});
app.put('/household', function (req, res) {
    var update = {
        LastName: req.body.LastName,
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
    };
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        dbo.collection('Household').updateOne({ _id: new mongodb_1.ObjectID(req.body._id) }, { $set: update }, function (err, result) {
            if (err)
                console.log(err);
            res.send(update);
            db.close();
        });
    });
});
app.post('/household', function (req, res) {
    var update = req.body;
    update._id = new mongodb_1.ObjectID();
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        dbo.collection('Household').insertOne(update, function (err, result) {
            if (err)
                console.log(err);
            res.send(update);
            db.close();
        });
    });
});
app.get('/member', function (req, res) {
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        dbo.collection('Member').find({}).toArray(function (err, result) {
            if (err)
                console.log(err);
            res.send(result);
            db.close();
        });
    });
});
app.get('/member/:id', function (req, res) {
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        var id = new mongodb_1.ObjectID(req.params.id);
        dbo.collection('Member').findOne({ _id: id }).then(function (result) {
            res.send(result);
            db.close();
        }).catch(function (reason) {
            console.log(reason);
            db.close();
        });
    });
});
app.put('/member', function (req, res) {
    var update = {
        HouseholdId: new mongodb_1.ObjectID(req.body.HouseholdId),
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
    };
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        dbo.collection('Member').updateOne({ _id: new mongodb_1.ObjectID(req.body._id) }, { $set: update }, function (err, result) {
            if (err)
                console.log(err);
            res.send(update);
            db.close();
        });
    });
});
app.post('/member', function (req, res) {
    var update = req.body;
    update._id = new mongodb_1.ObjectID();
    mongodb_1.default.connect(uri, params, function (err, db) {
        if (err)
            console.log(err);
        var dbo = db.db(database);
        dbo.collection('Member').insertOne(update, function (err, result) {
            if (err)
                console.log(err);
            res.send(update);
            db.close();
        });
    });
});
var server = app.listen(3000, function () {
    console.log('directory app listening on port 3000!');
});
