angular.module('ParkingAce').factory('lot-service', ['$http', function($http){
    
    var currentLot = null;
    
    return {
        getLot: function(){
            return currentLot;
        },

        getLotList: function(){

        },
        
        getTestLot: function(){
            return getEditableLot(30,5);
        },

        createLot: function(length, width, name){
            var lot = getEditableLot(length, width, name);
            currentLot = lot;
            var json = JSON.stringify({lot: lot.getSendableLot()});
            $http.post(API_CREATE_LOT_URL, json, DEFAULT_CONFIG_JSON).then(function(response){
                console.log('yaaay saved');
                callback();
            }, function(error){
                console.log('boooo not saved');
                callback();
            });
        },

        saveLot: function(lot, callback){
            console.log(lot.getSendableLot());
            var json = JSON.stringify({lot: lot.getSendableLot()});
            $http.post(API_SAVE_LOT_URL, json, DEFAULT_CONFIG_JSON).then(function(response){
                console.log('yaaay saved');
                callback();
            }, function(error){
                console.log('boooo not saved');
                callback();
            });
        }
    }

}]);
