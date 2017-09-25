/**
 * Created by cokonkw2 on 1/31/17.
 */

var express =  require('express');
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');


var app = express();
var port = '7275';
app.set('port', port);

/* Set up mongoose */
mongoose.connect('mongodb://localhost:27017/parking_ace');
var db = mongoose.connection;

/* Set up server */
var server = http.createServer(app);
server.listen(port);
console.log("Running on: http://localhost:"+port);

//app.use(express.static(path.join(__dirname, '/src')));
//app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/lib')));
app.use(express.static(path.join(__dirname, '/src')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res){
    res.sendFile(path.resolve('./src/index.html'));
});

app.get('*', function(req, res){
    res.sendFile(path.resolve('./src/index.html'));
});

/********************* Lot ************************/
/*** Schema Definitions ***/
//CONSTANT
var ConstantSchema = new Schema({
    name: String,
    valueType: String,
    value: Object
});

ConstantSchema.query.nextLotId =  function(callback){

};

//SPOT
var SpotSchema = new Schema({
    spotId: String,
    x: Number,
    y: Number,
    type: String,
    typeName: String,
    restriction: String,
    restrictionName: String,
    assignedTo: String,
    potentialAssignees: [String],
    isBackground: Boolean,
    parentLotId: String,
    styleClasses: [String]
});

//VEHICLE
var VehicleSchema = new Schema({
    make: String,
    model: String,
    year: String,
    color: String,
    plate: String,
    isPrimary: Boolean
});

//PARKER
var ParkerSchema = new Schema({
    associatedLot: String,
    vehicles: [VehicleSchema],
    currentSpot: String,
    spotPicks: [String]
});

//USER
var UserSchema = new Schema({
    userId: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    isParker: Boolean,
    parkerInfo: ParkerSchema
});

//LOT
var LotSchema = new Schema({
    lotId: String,
    length: {type: Number, min: 1, max: 9999},
    width: {type: Number, min: 1, max: 9999},
    spots: [[SpotSchema]],
    isFinalized: Boolean,
    name: String,
    creatorUserId: String,
    associatedUsers: [String],
    lastUpdated: { type: Date, default: Date.now },
    registrationPeriod: Number,
    lockedPeriod: Number
});

LotSchema.methods.getBasicInfo = function(){
    return {
        name: this.name,
        lastUpdated: this.lastUpdated,
        numAssociatedUsers:this.associatedUsers.length,
        registrationPeriod: this.registrationPeriod,
        lockedPeriod: this.lockedPeriod,
        isFinalized: this.isFinalized
    };
};

//ADD SCHEMAS
var Lot = mongoose.model('Lot', LotSchema, 'lots');
var Spot = mongoose.model('Spot', SpotSchema);
var User = mongoose.model('User', UserSchema, 'users');
var Parker = mongoose.model('Parker', ParkerSchema);
var Vehicle = mongoose.model('Vehicle', VehicleSchema);
var Constants = mongoose.model('Constants', ConstantSchema, 'constants');
/*** End Schema Definitions ***/

/*** Mongo Connection ***/
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //connected
});
/*** End Mongo Connection ***/

app.post('/api/lot/create', function(request, response){
    var lotIn = request.body.lot;
    var lot = new Lot({
        lotId: lotIn.lotId,
        length: lotIn.length,
        width: lotIn.width,
        spots: mongofySpotsArray(lotIn.spots),
        isFinalized: lotIn.isFinalized,
        name: lotIn.name,
        creatorUserId: lotIn.creatorUserId,
        associatedUsers: lotIn.associatedUsers,
        lastUpdated:  lotIn.lastUpdated,
        registrationPeriod: lotIn.registrationPeriod,
        lockedPeriod: lotIn.lockedPeriod
    });
    lot.save(function(err, lot){
        if(err){
            console.log("ERROR: "+err);
            response.status(500).send({err: err});
        } else {
            console.log("YAY");
            response.status(200).send({status:'200'});
        }
    });
});

app.post('/api/lot/save', function(request, response){

});

app.get('/api/lot/getLotList', function(request, response){

});

app.post('/api/lot/getLot', function(request, response){

});

var mongofySpotsArray = function(spots){
    var spotsOut = [];
    for(var row in spots){
        spotsOut.push(monogofyRow(spots[row]));
    }
    console.log(spotsOut);
    console.log(spotsOut[0]);
    return spotsOut;
};

var monogofyRow = function(row){
    var rowOut = [];
    for(var s in row){
        var spotIn = row[s];
        var spot = new Spot({
            spotId: spotIn.spotId,
            x: spotIn.x,
            y: spotIn.y,
            type: spotIn.type,
            typeName: spotIn.typeName,
            assignedTo: spotIn.assignedTo,
            potentialAssignees: spotIn.potentialAssignees,
            restriction: spotIn.restriction,
            restrictionName: spotIn.restrictionName,
            isBackground: spotIn.isBackground,
            parentLotId: spotIn.parentLotId,
            styleClasses: spotIn.styleClasses
        });
        rowOut.push(spot);
    }
    return rowOut;
};

var getNextLotId = function(){
    
};

/********************* End Lot *********************/

app.locals.userRole = "";

app.post('/verif/role', function(req, res){

});