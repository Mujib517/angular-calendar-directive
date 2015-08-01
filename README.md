<h2>Full Calendar Control for AngularJs (Calendar Directive for reuse).</h2>

<h3>How to consume:</h3>

step 1:
    &lt;my-calendar month="06" year="2014" on-select="selected(dt)"&gt;&lt;/my-calendar&gt;

step2: <b> In your controller add dependency as shown</b>

var myApp=angular.module('myApp',['calendarControl']);

myApp.controller('myController',function($scope){

  //catch the selected date using callback function<br>
  $scope.selected=function(dt){
    console.log(dt); //returns selected date.
  };

});


