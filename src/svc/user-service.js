/**
 * Created by cokonkw2 on 2/1/17.
 */

angular.module('ParkingAce').factory('user-service', [function(){

    var roles = null;
    var role = "";
    $.getJSON('../lib/temp-schema/constants.json', function(data){
        //console.log(data);
    });
    var username = "";

    var isLoggedIn = false;

    return {
        logIn: function(uname, pass){
            /*Send session data to server, includes username and userid*/
            username = uname;
            isLoggedIn = true;
        },

        getUsername: function(){
            //should be retrieved from session data, not angular scope, but doing dummy for now
            return username;
        },

        isLoggedIn: function(){
            return isLoggedIn;
        },

        assignRoleManual: function(username){
            if(username === 'admin'){

            }
        },
        hasAdminAccess: function(){
            if(username === 'admin'){
                return true;
            }
            return false;
        }
    }
}]);