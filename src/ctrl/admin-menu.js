/**
 * Created by cokonkw2 on 2/2/17.
 */

angular.module('ParkingAce')
    .controller('AdminMenuController', ['$scope', '$location', 'admin-service', 'lot-service', 'user-service', function($scope, $location, adminService, lotService, userService){

        $scope.hasLot =  adminService.hasLot();

        $scope.closeModal = function(num){
            switch(num){
                case 1:
                    $scope.showCreateModal = false;
                    $scope.createLotLength = 5;
                    $scope.createLotWidth = 5;
                    break;
                case 2:
                    $scope.showManageLotModal = false;
                    $scope.lots = [];
                    $scope.selectedLot = null;
                    break;
            }
        };

        /*********************  Create Modal ******************************/
        $scope.showCreateModal = false;
        $scope.createModalError = false;
        
        $scope.createLotName = "";
        $scope.createLotLength = 5;
        $scope.createLotWidth = 5;

        $scope.createLot = function(){
            if($scope.createLotLength < 1 || $scope.createLotLength > 9999
                || $scope.createLotWidth < 1 || $scope.createLotWidth > 9999){
                $scope.createModalError = true;
            } else {
                lotService.createLot($scope.createLotLength, $scope.createLotWidth, $scope.createLotName);
                $location.path('/create');
            }
        };

        $scope.goToLotCreation = function(){
            $scope.showCreateModal = true;
        };
        /********************* End Create Modal ***************************/

        /********************* Manage Modal *******************************/
        $scope.showManageLotModal = false;
        $scope.lots = [];
        $scope.selectedLot = null;
        
        $scope.goToManageLots = function(){
            $scope.showManageLotModal = true;
        };
        
        $scope.getLotList = function(){
        
        };

        $scope.selectLot = function(lot){
            $scope.selectedLot = lot;
        };

        $scope.loadLot = function(){

        };
        
        /********************* End Manage Modal *******************************/
        
    }])
    .directive('adminmenu', function(){
        return {
            templateUrl: './src/views/admin_menu.html',
            controller: 'AdminMenuController'
        }
    });