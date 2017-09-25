var getEditableLot = function(length, width, name){
    return {
        length: length,
        width: width,
        /**
         * Format: spots is a 2D array, spots are organized in an array of rows, which are arrays.
         */
        spots: generateInitialSpots(length, width),
        isFinalized: false,
        lotId: "",
        name: name,
        creatorUserId:'',
        associatedUsers: [],
        lastUpdated: '',
        registrationPeriod: 0,
        lockedPeriod: 0,
        
        
        addRow: function(){
            var x = 0;
            var row = [];
            this.width += 1;
            for(x; x < length; x++){
                row.push(getEditableSpot(x, width - 1));
            }
            this.spots.push(row);
        },

        removeRow: function(rowIndex){
            this.width -= 1;
            this.spots = this.spots.splice(rowIndex, 1);
        },
        
        getRow: function(rowIndex){
            return this.spots[rowIndex];
        },

        addColumn: function(width){
            this.length += 1;
            var row = 0;
            for(row; row < this.length; row++){
                this.spots[row].push(getEditableSpot(this.length - 1, row))
            }
        },

        removeColumn: function(width){
            var row = 0;
            for(row; row < this.length; row++){
                this.spots[row] = this.spots[row].splice(this.spots[row].length - 1, 1);
            }
            this.length -= 1;
        },
        
        getSpot: function(x ,y){
            return this.spots[x][y];
        },
        
        finalize: function(){
            this.isFinalized = true;
        },
        
        getSendableLot: function(){
            return{
                lotId: this.lotId,
                length: this.length,
                width: this.width,
                spots: getSendableSpotsArray(this.spots),
                isFinalized: this.isFinalized,
                name: this.name,
                creatorUserId: 'admin',
                associatedUsers: [],
                lastUpdated:  Date.now,
                registrationPeriod: 0,
                lockedPeriod: 0
            };
        }
    }
};

var generateInitialSpots = function(length, width){
    var spots = [];
    var iy = 0;
    for(iy; iy < width; iy++){
        var ix = 0;
        var row = [];
        for(ix; ix < length; ix++){
            row.push(getEditableSpot(ix, iy));
        }
        spots.push(row);
    }
    return spots;
};

var getEditableSpot = function(x, y){
    return {
        spotId:"",
        x: x,
        y: y,
        type: '',
        typeName: '',
        assignedTo: "",
        
        potentialAssignees: [],
        restriction: "",
        restrictionName: "",
        isBackground: true, //Not an actual spot, just for grid
        parentLotId: "",
        styleClasses: ["spot"],

        update: function(sc, t, r){
            this.styleClasses = sc;
            this.type = t;
            this.typeName = getSpotTypeName(t);
            this.restriction = r;
            this.restrictionName = getRestrictionName(r);
        },

        changeSpotId: function(id){
            this.spotId = id;
        },

        changeType: function(type){
            this.type = type;
        },

        changeRestriction: function(restriction){
            this.restriction = restriction;
        },

        addPotentialAssignee: function(userId){
            this.potentialAssignees.push(userId);
        },

        removePotentialAssignee: function(userId){
            var u = 0;
            for(u in this.potentialAssignees){
                if(this.potentialAssignees[u] === userId){
                    break;
                }
            }
            this.potentialAssignees = this.potentialAssignees.splice(u,1);
        },

        determineNewAssignee: function(){
            if(this.potentialAssignees.length > 0){
                this.assignedTo = this.potentialAssignees[0].parkerId;
            }
        },

        runLottery: function(){

        },

        finalize: function(){
            this.isEditable = false;
        },
        
        isTaken: function(){
            return this.assignedTo != "";
        },
        
        styleClassesToHTMLClass: function(){
            var str = this.styleClasses[0];
            for(var c in this.styleClasses){
                if(c != 0){
                    str += " " + this.styleClasses[c];
                }
            }
            return str;
        },
    }
};

var getSpotClasses = function(type, restriction){
    for(var st in SPOT_TYPES){
        var spotType = SPOT_TYPES[st];
        if(spotType.value === type){
            return spotType.className;
        }
    }
};

var getSpotClassesArray = function(type, restriction){
    for(var st in SPOT_TYPES){
        var spotType = SPOT_TYPES[st];
        if(spotType.value === type){
            return spotType.classNameArray;
        }
    }
};

var getSpotTypeName = function(type){
    for(var st in SPOT_TYPES){
        var spotType = SPOT_TYPES[st];
        if(spotType.value === type){
            return spotType.name;
        }
    }
};

var getRestrictionName = function(restriction){
    for(var sr in SPOT_RESTRICTIONS){
        var spotRest = SPOT_RESTRICTIONS[sr];
        if(spotRest.value === restriction){
            return spotRest.name;
        }
    }
};

var getSendableSpotsArray = function(spots){
    var sendable = [];
    for(var row in spots){
        sendable.push(getSendableRow(spots[row]));
    }
    return sendable;
};

var getSendableRow = function(row){
    var sendable = [];
    for(var s in row){
        var spot = row[s];
        sendable.push({
            spotId: spot.spotId,
            x: spot.x,
            y: spot.y,
            type: spot.type,
            typeName: spot.typeName,
            assignedTo: spot.assignedTo,
            potentialAssignees: spot.potentialAssignees,
            restriction: spot.restriction,
            restrictionName: spot.restrictionName,
            isBackground: spot.isBackground,
            parentLotId: spot.parentLotId,
            styleClasses: spot.styleClasses
        });
    }
    return sendable;
};

var knownSpotIds = [];

var generateUserId = function(){
    //format: AAA000
    var charArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var numArray = ['0','1','2','3','4','5','6','7','8','9'];

    var id = "";
    var validId = false;

    id = "";
    var i = 0;
    var indx = 0;

    for(i = 0; i < 3; i++){
        indx = getRandomInt(0,26);
        id += charArray[indx];
    }

    for(i = 0; i < 3; i++){
        indx = getRandomInt(0,10);
        id += numArray[indx];
    }

    knownSpotIds.push(id);
    return id;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}