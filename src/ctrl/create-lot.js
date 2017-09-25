angular.module('ParkingAce')
    .controller('CreateLotController', ['$scope', '$location', 'admin-service', 'lot-service', function($scope, $location, adminService, lotService){

        $scope.showPainting = true;
        $scope.showViewingInfo = false;
        $scope.editMode = false; //only in view;
        $scope.showProcessing = false;
        
        $scope.lot = lotService.getLot();
        $scope.spots = $scope.lot.spots;
        $scope.currentSpot = null;

        $scope.spotType = "";
        $scope.spotRestriction = "";
        $scope.spotTypes = SPOT_TYPES;
        $scope.spotRestrictions = SPOT_RESTRICTIONS;
        
        $scope.previewSpotClass = "spot preview-spot";
        $scope.previewRestriction = "";

        $scope.paint = ["spot"];
        $scope.spotCode = "";
        $scope.currentSpot = null;

        $scope.enableClickAndDragPaint = true;
        $scope.mouseIsDown = false;

        /******* Lot Functionality *******/

        $scope.transferSpotClick = function(spot){
            if($scope.showPainting){
                $scope.paintSpot(spot);
            } else {
                $scope.viewModeClick(spot);
            }
        };

        $scope.setDragFlag = function(){
            $scope.mouseIsDown = true;

        };

        $scope.removeDragFlag = function(){
            $scope.mouseIsDown = false;
        };

        $scope.dragPaint = function(spot){
            if($scope.enableClickAndDragPaint && $scope.mouseIsDown && spot != null && $scope.showPainting){
                $scope.paintSpot(spot);
            }
        };

        $scope.paintSpot = function(spot){
            spot.update($scope.paint, $scope.spotType, $scope.spotRestriction);
        };

        $scope.viewModeClick = function(spot){
            $scope.currentSpot = spot;
        };

        $scope.determineSpotClass = function(){
            if($scope.showPainting){
                $scope.paint = getSpotClassesArray($scope.spotType, $scope.spotRestriction);
                $scope.previewSpotClass =  getSpotClasses($scope.spotType, $scope.spotRestriction) + " preview-spot";
                if($scope.spotType === 'HN'){
                    $scope.previewRestriction = 'HN';
                } else {
                    $scope.previewRestriction = $scope.spotRestriction;
                }
            }
        };

        $scope.goToEditMode = function(){
            $scope.editMode = true;
        };

        $scope.saveSpot = function(){
            $scope.editMode = false;
        };

        /******* Other *******/

        $scope.getCurrentSpotType = function(){
            return $scope.currentSpot === null ? 'N/A':($scope.currentSpot.type === "" ? "NONE":$scope.currentSpot.typeName);
        };

        $scope.getCurrentRestriction = function(){
            return $scope.currentSpot === null ? 'N/A':($scope.currentSpot.restriction === "" ? "NONE":$scope.currentSpot.restrictionName);
        };

        $scope.getCurrentSpotX = function(){
            return $scope.currentSpot === null ? 'N/A':$scope.currentSpot.x;
        };

        $scope.getCurrentSpotY = function(){
            return $scope.currentSpot === null ? 'N/A':$scope.currentSpot.y;
        };

        $scope.getSpotText = function(spot){
            if(spot.type === 'HN'){
                return 'HN';
            } else {
                return spot.restriction;
            }
        };
        
        $scope.togglePaintingViewing = function(){
            var paintSide = document.getElementById('page-chooser-paint');
            var viewSide = document.getElementById('page-chooser-view');
            if($scope.showPainting){
                $scope.showPainting = false;
                $scope.showViewingInfo = true;
                paintSide.classList = "page-chooser-option-inactive";
                viewSide.classList = "page-chooser-option-active";
            } else {
                $scope.showPainting = true;
                $scope.showViewingInfo = false;
                paintSide.classList = "page-chooser-option-active";
                viewSide.classList = "page-chooser-option-inactive";
            }
        };

        $scope.exitCreate = function(){
            $location.path('/amenu');
        };
        
        $scope.save = function(){
            $scope.showProcessing = true;
            lotService.saveLot($scope.lot, function(){
                $scope.showProcessing = false;
            });
        }
    }])
    .directive('createlot', function(){
        return {
            templateUrl: './src/views/create-lot/create_lot.html',
            controller: 'CreateLotController'
        }
    });