/**
 * Created by cokonkw2 on 2/1/17.
 */

angular.module('ParkingAce', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        
        $routeProvider
            .when('/login',{
                templateUrl: './src/views/login.html',
                controller: 'LoginController'
            })
            .when('/amenu', {
                templateUrl: './src/views/admin_menu.html',
                controller: 'AdminMenuController'
            })
            .when('/create', {
                templateUrl: './src/views/create-lot/create_lot.html',
                controller: 'CreateLotController'
            })
}]);