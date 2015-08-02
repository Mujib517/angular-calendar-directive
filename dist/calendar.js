var app = angular.module('calendarControl', []);

app.directive('myCalendar', function () {
    return {
        restrict: "E",
        templateUrl: "/Calendar-Directive/directive/template.html",
        scope: {
            month: "=",
            year: "=",
            onSelect: "&",
            date: "=",
            config: "="
        },

        link: function (scope, elem, attr) {
            var year, month;
            var years = [];
            scope.monthObj = [
                {name: "Jan", no: 1},
                {name: "Feb", no: 2},
                {name: "Mar", no: 3},
                {name: "Apr", no: 4},
                {name: "May", no: 5},
                {name: "Jun", no: 6},
                {name: "Jul", no: 7},
                {name: "Aug", no: 8},
                {name: "Sep", no: 9},
                {name: "Oct", no: 10},
                {name: "Nov", no: 11},
                {name: "Dec", no: 12}
            ];
            var currentSelection = scope.date;

            var getLastSelection = function () {
                if (currentSelection) {
                    var dt = currentSelection.split('/');
                    var m = parseInt(dt[0]);
                    var d = parseInt(dt[1]);
                    var y = parseInt(dt[2]);

                    if (month == m && year == y) {
                        scope.$apply();
                        $('#' + d).removeClass('today');
                        $('#' + d).addClass('selected');
                    }
                }
            };

            var getMonthAndYear = function () {
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                scope.monthName = monthNames[parseInt(month) - 1];
                scope.year = year;
            };

            var configure = function () {
                var config = scope.config;
                if (config) {
                    scope.showMonthSelection = config.monthSelection === false ? false : true;
                    scope.showYearSelection = config.yearSelection === false ? false : true;
                    scope.navigation = config.navigation === false ? true : false;
                }
                else {
                    scope.showMonthSelection = true;
                    scope.showYearSelection = true;
                    scope.navigation = false;
                }
            };

            scope.selectDate = function (day) {
                if (day) {
                    var selectedDt = month + "/" + day + "/" + year;
                    elem.find('td').removeClass('selected');
                    elem.find('td').removeClass('today');
                    $('#' + day).addClass('selected');
                    currentSelection = selectedDt;
                    scope.onSelect({
                        dt: selectedDt
                    });
                }
            };

            var init = function () {
                var weeks = [];
                scope.month = month;
                scope.year = year;
                var first_day = new Date(year + "-" + month + "-01").getDay();
                var totDays = new Date(year, month, 0).getDate();
                var intermediate = [];

                for (var i = 0; i < first_day; i++) {
                    intermediate.push('');
                }

                for (var j = 1; j <= totDays; j++) {
                    intermediate.push(j);
                }
                if (intermediate.length > 35) {
                    for (var k = intermediate.length; k < 42; k++) {
                        intermediate.push("");
                    }
                }
                else if (intermediate.length > 28) {
                    for (var l = intermediate.length; l < 35; l++) {
                        intermediate.push("");
                    }
                }

                for (var m = 0; m < 5; m++) {
                    weeks.push(intermediate.slice(m * 7, m * 7 + 7));
                }
                if (intermediate.length > 35)
                    weeks.push(intermediate.slice(35, intermediate.length));


                scope.weeks = weeks;
                selectToday();
                getMonthAndYear();
            };

            var checkForDtAttr = function () {
                if (scope.date) {
                    var dt = scope.date.split('/');
                    month = parseInt(dt[0]);
                    year = dt[2];
                    init();
                }
                else {
                    month = scope.month;
                    year = scope.year;
                    init();
                }
                configure();
            };

            var selectToday = function () {
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

            var showSelection = function () {
                if (scope.date) {
                    scope.$apply();
                    var date = scope.date.split('/');
                    $('#' + parseInt(date[1])).removeClass('today');
                    $('#' + parseInt(date[1])).addClass('selected');
                }
            };

            var loadYears = function () {
                scope.years = [];
                for (var i = 0; i < 5; i++) {
                    scope.years.push(years.slice(i * 7, i * 7 + 7));
                }
            };

            scope.prev = function () {
                if (month > 1) {
                    month--;
                } else {
                    month = 12;
                    year--;
                }

                init();
                getLastSelection();
            };

            scope.next = function () {
                if (month < 12) {
                    month++;
                } else {
                    month = 01;
                    year++;
                }
                init();
                getLastSelection();
            };

            scope.showYears = function (year) {
                scope.yearMode = true;
                for (var i = year; i < year + 35; i++) {
                    years.push(i);
                }
                loadYears();
            };

            scope.changeYear = function (yr) {
                scope.year = yr;
                year = yr;
                scope.yearMode = false;
                init();
            };

            scope.prevYear = function () {
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

            scope.nextYear = function () {
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

            scope.changeMonth = function (mnth) {
                month = mnth;
                init();
            };

            checkForDtAttr();

            showSelection();
        }
    };
});;;(function (templates, undefined) {
  templates["directive/template.html"] = "<style>\n" +
    "    .selected {\n" +
    "        background-color: #696969;\n" +
    "        color:white;\n" +
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
    "    #tblMnth{\n" +
    "        table-layout: fixed;\n" +
    "    }\n" +
    "    #tblMnth tr{\n" +
    "        white-space: nowrap;\n" +
    "    }\n" +
    "</style>\n" +
    "<div ng-show=\"!yearMode\">\n" +
    "    <table id=\"tblMnth\" class=\"table table-bordered table-condensed\">\n" +
    "        <tr>\n" +
    "            <td colspan=\"2\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <select ng-show=\"showMonthSelection\" class=\"form-control input-xs\" ng-model=\"month\" ng-options=\"mth.no as mth.name for mth in monthObj\" ng-change=\"changeMonth(month)\"/>\n" +
    "                    <strong class=\"strong\" ng-show=\"!showMonthSelection\">{{monthName}}</strong>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td colspan=\"3\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <button ng-show=\"showYearSelection\" class=\"btn btn-xs btn-width btn-primary\" ng-click=\"showYears(year)\">\n" +
    "                        <span>{{year}}</span>\n" +
    "                    </button>\n" +
    "                    <strong class=\"strong\" ng-show=\"!showYearSelection\">{{year}}</strong>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td colspan=\"2\" >\n" +
    "                <div class=\"btn-group pull-right\">\n" +
    "                    <button ng-disabled=\"navigation\" class=\"btn btn-sm btn-default btn-xs\" type=\"button\" ng-click=\"prev()\">\n" +
    "                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "                    </button>\n" +
    "                    <button ng-disabled=\"navigation\" class=\"btn btn-sm btn-default btn-xs\" type=\"button\" ng-click=\"next()\">\n" +
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
    "            <td ng-class=\"text-right\" id='{{day}}' class=\"cursor-hand\" ng-repeat=\"day in week track by $index\" ng-click=\"selectDate(day)\">\n" +
    "               <span class=\"pull-right\">\n" +
    "                   {{day}}\n" +
    "               </span>\n" +
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