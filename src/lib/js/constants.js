var SPOT_TYPES = [
    {
        name: "NONE",
        value: "",
        className: "spot",
        classNameArray: ["spot"]
    },
    {
        name: "STANDARD",
        value: "FF",
        className: "spot fcfs-spot",
        classNameArray: ["spot", "fcfs-spot"]
    },
    {
        name: "LOTTERY",
        value: "LL",
        className: "spot lottery-spot",
        classNameArray: ["spot", "lottery-spot"]
    },
    {
        name: "FLEX",
        value: "FX",
        className: "spot flex-spot",
        classNameArray: ["spot", "flex-spot"]
    },
    {
        name: "VISITOR",
        value: "VS",
        className: "spot visitor-spot",
        classNameArray: ["spot", "visitor-spot"]
    },
    {
        name: "HANDICAP",
        value: "HN",
        className: "spot handicap-spot",
        classNameArray: ["spot", "handicap-spot"]
    },
    {
        name: "EXECUTIVE",
        value: "EX",
        className: "spot executive-spot",
        classNameArray: ["spot", "executive-spot"]
    },
    {
        name: "DELIVERY",
        value: "DL",
        className: "spot delivery-spot",
        classNameArray: ["spot", "delivery-spot"]
    },
    {
        name: "UNAVAILABLE",
        value: "UN",
        className: "spot unavailable-spot",
        classNameArray: ["spot", "unavailable-spot"]
    }
];

var SPOT_RESTRICTIONS = [
    {
        name: "NONE",
        value: ""
    },
    {
        name: "COMPACT ONLY",
        value: "CM"
    }
];

var hostName = location.host;

var API_SAVE_LOT_URL =  'http://'+hostName+'/api/lot/save';
var API_CREATE_LOT_URL = 'http://'+hostName+'/api/lot/create';

var DEFAULT_CONFIG_JSON = {
    headers : {'Content-Type' : 'application/json'}
};

