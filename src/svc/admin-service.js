/**
 * Created by cokonkw2 on 2/2/17.
 */

angular.module('ParkingAce').factory('admin-service', ['user-service', function(userService){

    var roles = null;
    var role = "";
    $.getJSON('../lib/temp-schema/constants.json', function(data){
        //console.log(data);
    });

    return {
        hasAdminAccess: function(){
            /* must be checked for every function call, contacts the server with the current user
            *  credentials and checks that the person actually has admin access*/
            return userService.hasAdminAccess();
        },

        hasLot: function(){
            return false;
        }
    }
}]);