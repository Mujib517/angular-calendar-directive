var myApp = angular.module('myApp', ['calendarControl']);

myApp.controller('myController', function ($scope) {
    $scope.selected = function (dt) {
        console.log(dt);
    };
    $scope.config1 = {
        monthSelection: true,
        yearSelection:true,
        navigation:true
    };
    $scope.month=08;
    $scope.year=2015;
    $scope.date='7/30/2015';
});
