angular.module('ParkingAce')
    .controller('HomeController', ['$scope', "$location", 'user-service', function($scope, $location, userService){

        $scope.needsToLogIn = false;
        
        if(!userService.isLoggedIn()){
            $scope.needsToLogIn = true;
            $location.path('/login');
        }

    }])
    .directive('home',function(){
        return {
            templateUrl: './src/views/home.html',
            controller: 'HomeController'
        }
    });