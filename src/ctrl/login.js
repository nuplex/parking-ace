/**
 * Created by cokonkw2 on 2/1/17.
 */

angular.module('ParkingAce')
    .controller('LoginController', ['$scope', '$location', function($scope, $location){
        
        $scope.username = "";
        $scope.password = "";
        $scope.failed = false;

        $scope.signIn = function(){
            $scope.failed = false;
            if($scope.username === "admin"){
                if($scope.password === "admin"){
                    //store in user service, route to parking app
                    $location.path('/amenu');
                } else {
                    $scope.failed = true;
                }
            } else if ($scope.username === "test"){
                if($scope.password === "test"){
                    //same as above
                }
            } else {
                if($scope.username != "" && $scope.password != ""){
                    $scope.failed = true;
                }
            }
        }
        
    }])
    .directive('login',function(){
        return {
            templateUrl: './src/views/login.html',
            controller: 'LoginController'
        }
    });