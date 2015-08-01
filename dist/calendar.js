var app = angular.module('calendarControl', []);

app.directive('myCalendar', function() {
  return {
    restrict: "E",
    templateUrl: "directive/template.html",
    scope: {
      month: "=",
      year: "=",
      onSelect: "&"
    },
    
    link: function(scope, elem, attr) {
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      var year = attr.year;
      var month = attr.month;
      var years = [];
      scope.monthObj=[
        {name:"Jan",no:1},
        {name:"Feb",no:2},
        {name:"Mar",no:3},
        {name:"Apr",no:4},
        {name:"January",no:5},
        {name:"January",no:6},
        {name:"January",no:7},
        {name:"January",no:8},
        {name:"January",no:9},
        {name:"January",no:10},
        {name:"January",no:11},
        {name:"January",no:12}
      ];

      var selectToday = function() {
        var dt = new Date();
        var ctMonth = dt.getMonth() + 1;
        var ctYear = dt.getFullYear();
        var ctDt = dt.getDate();

        if (ctMonth < 10) {
          ctMonth = "0" + ctMonth.toString();
        }

        if (month == ctMonth && year == ctYear) {
          scope.$apply();
          $('#' + ctDt).addClass('today');
        }
      };

      var init = function() {
        var weeks = [];
        scope.month=month;
        
        //scope.date = monthNames[month - 1] + " - " + year;

        var first_day = new Date(year + "-" + month + "-01").getDay();
        var totDays = new Date(year, month, 0).getDate();
        var intermediate = [];

        for (var i = 0; i < first_day; i++) {
          intermediate.push('');
        }

        for (var j = 1; j <= totDays; j++) {
          intermediate.push(j);
        }

        weeks.push(intermediate.slice(0, 7));
        weeks.push(intermediate.slice(7, 14));
        weeks.push(intermediate.slice(14, 21));
        weeks.push(intermediate.slice(21, 28));
        weeks.push(intermediate.slice(28, 35));

        if (intermediate.length > 35)
          weeks.push(intermediate.slice(35, intermediate.length));

        scope.weeks = weeks;
        selectToday();
      };
      
      init();

      scope.selectDate = function(day) {
        var selectedDt = month + "/" + day + "/" + year;
        elem.find('td').removeClass('selected');
        elem.find('td').removeClass('today');
        $('#' + day).addClass('selected');
        scope.onSelect({
          dt: selectedDt
        });
      }

      scope.prev = function() {
        if (month > 1) {
          month--;
        } else {
          month = 12;
          year--;
        }
        
        init();
      }

      scope.next = function() {
        if (month < 12) {
          month++;
        } else {
          month = 01;
          year++;
        }
        init();
      }

      var loadYears = function() {
        scope.years = [];
        scope.years.push(years.slice(0, 7));
        scope.years.push(years.slice(7, 14));
        scope.years.push(years.slice(14, 21));
        scope.years.push(years.slice(21, 28));
        scope.years.push(years.slice(28, 35));
      }

      scope.showYears = function(year) {
        scope.yearMode = true;
        for (var i = year; i < year + 35; i++) {
          years.push(i);
        }
        loadYears();
      };

      scope.changeYear = function(yr) {
        scope.year = yr;
        year = yr;
        scope.yearMode = false;
        init();
      };

      scope.prevYear = function() {
        var min = years[0];
        var max = min - 35;
        if (min > 1500) {
          years = [];
          for (var i = min; i > max; i--) {
            years.push(i);
          }
          years.reverse();
          loadYears();
          scope.$apply();
        }
      };

      scope.nextYear = function() {
        var min = years[34];
        var max = min + 35;
        if (min < 3000) {
          years = [];
          for (var i = min; i < max; i++) {
            years.push(i);
          }
          loadYears();
          scope.$apply();
        }
      };

      scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      scope.changeMonth = function(mnth) {
        month = mnth;
        init();
      };

    }
  }
});;;(function (templates, undefined) {
  templates["directive/template.html"] = "<style>\n" +
    "    .selected {\n" +
    "        background-color: #EEEEEE;\n" +
    "    }\n" +
    "\n" +
    "    .cursor-hand {\n" +
    "        cursor: pointer;\n" +
    "        cursor: hand;\n" +
    "    }\n" +
    "\n" +
    "    .today {\n" +
    "        background-color: #F8F8F8;\n" +
    "    }\n" +
    "\n" +
    "    .btn-width {\n" +
    "        width: 80px;\n" +
    "    }\n" +
    "\n" +
    "    .input-xs {\n" +
    "        height: 22px;\n" +
    "        padding: 2px 5px;\n" +
    "        font-size: 12px;\n" +
    "        line-height: 1.5;\n" +
    "        border-radius: 3px;\n" +
    "    }\n" +
    "</style>\n" +
    "<div ng-show=\"!yearMode\">\n" +
    "    <!--<div class=\"pull-left\">-->\n" +
    "        <!--<h4> {{date}} </h4>-->\n" +
    "    <!--</div>-->\n" +
    "    <table class=\"table table-bordered table-condensed\">\n" +
    "        <tr>\n" +
    "            <td colspan=\"2\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <select class=\"form-control input-xs\" ng-model=\"month\" ng-options=\"month for month in months\"\n" +
    "                            ng-change=\"changeMonth(month)\">\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td colspan=\"2\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <button class=\"btn btn-xs btn-width btn-primary\" ng-click=\"showYears(year)\">\n" +
    "                        <span>{{year}}</span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td colspan=\"3\">\n" +
    "                <div class=\"btn-group pull-right\">\n" +
    "                    <button class=\"btn btn-sm btn-default btn-xs\" type=\"button\" ng-click=\"prev()\">\n" +
    "                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "                    </button>\n" +
    "                    <button class=\"btn btn-sm btn-default btn-xs\" type=\"button\" ng-click=\"next()\">\n" +
    "                        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <th>Sun</th>\n" +
    "            <th>Mon</th>\n" +
    "            <th>Tue</th>\n" +
    "            <th>Wed</th>\n" +
    "            <th>Thu</th>\n" +
    "            <th>Fri</th>\n" +
    "            <th>Sat</th>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"week in weeks\">\n" +
    "            <td id='{{day}}' class=\"cursor-hand\" ng-repeat=\"day in week track by $index\" ng-click=\"selectDate(day)\">\n" +
    "                {{day}}\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<div ng-show=\"yearMode\">\n" +
    "    <table class=\"table table-bordered table-condensed\">\n" +
    "        <tr>\n" +
    "            <th colspan=\"7\">\n" +
    "                Select Year\n" +
    "                <div class=\"btn-group pull-right\">\n" +
    "                    <button class=\"btn btn-sm btn-default btn-xs\" type=\"button\" ng-click=\"prevYear()\">\n" +
    "                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "                    </button>\n" +
    "                    <button class=\"btn btn-sm btn-default btn-xs\" type=\"button\" ng-click=\"nextYear()\">\n" +
    "                        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"year in years\">\n" +
    "            <td ng-repeat=\"yr in year\">\n" +
    "                <button class=\"btn btn-default btn-xs\" ng-click=\"changeYear(yr)\">\n" +
    "                    <span>{{yr}}</span>\n" +
    "                </button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>";
})(this.templates = this.templates || {});