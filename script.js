var myApp=angular.module('myApp',['calendarControl']);

myApp.controller('myController',function($scope){
  $scope.selected=function(dt){
    console.log(dt);
  };
});
